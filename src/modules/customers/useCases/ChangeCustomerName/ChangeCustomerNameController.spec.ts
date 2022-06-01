import dayjs from "dayjs";

import { City } from "@modules/cities/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/express/app";
import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../shared/infra/typeorm";
import { currentDate, tomorrowDate } from "@shared/utils/DayJs";

let connection: Connection;

describe("Change customer's name controller", () => {
  let cityResponse;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    cityResponse = await request(app).post("/cities").send({
      name: "Lewis Vega",
      state: "CE",
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to change the customer name after create", async () => {
        const customerResponse = await request(app).post("/customers").send({
            name: "Carl Becker",
            gender: "male",
            birth_date: currentDate(),
            city: cityResponse.body.id
        });

        const customerNewNameResponse = await request(app).patch(`/customers/${customerResponse.body.id}`).send({
            name: "Christopher Guzman"
        });

        expect(customerNewNameResponse.status).toBe(200);
        expect(customerNewNameResponse.body).toHaveProperty("id");
    });

    it("should not be able to change the customers name if the id is invalid", async () => {
        const customerNewNameResponse = await request(app).patch("/customers/123").send({
            name: "Frank Holland"
        });

        expect(customerNewNameResponse.status).toBe(400);
        expect(customerNewNameResponse.body.message).toEqual("Invalid id");
    });

    it("should not be able to change the customers name if the id not exists", async () => {
        const customerNewNameResponse = await request(app).patch("/customers/49c69c66-e4e7-4e8f-8664-92e5c6bdd18d").send({
            name: "Jorge Alexander"
        });

        expect(customerNewNameResponse.status).toBe(400);
        expect(customerNewNameResponse.body.message).toEqual("Customer not exists");
    });

    it("should not be able to change the customers name if the name is the same", async () => {
        const name = "Chris Cohen";

        const customerResponse = await request(app).post("/customers").send({
            name,
            gender: "male",
            birth_date: currentDate(),
            city: cityResponse.body.id
        });

        const customerNewNameResponse = await request(app).patch(`/customers/${customerResponse.body.id}`).send({
            name
        });

        expect(customerNewNameResponse.status).toBe(400);
        expect(customerNewNameResponse.body.message).toEqual("Name is already the same");
    });

    it("should not be able to change the customers name if the name is already in use for another customer", async () => {
        const name1 = "Alfred Ramirez";
        const name2 = "Rosetta Jacobs";

        const customerResponse = await request(app).post("/customers").send({
            name: name1,
            gender: "male",
            birth_date: currentDate(),
            city: cityResponse.body.id
        });

        await request(app).post("/customers").send({
            name: name2,
            gender: "male",
            birth_date: currentDate(),
            city: cityResponse.body.id
        });

        const customerNewNameResponse = await request(app).patch(`/customers/${customerResponse.body.id}`).send({
            name: name2
        });

        expect(customerNewNameResponse.status).toBe(400);
        expect(customerNewNameResponse.body.message).toEqual("Name is not available");
    });
});