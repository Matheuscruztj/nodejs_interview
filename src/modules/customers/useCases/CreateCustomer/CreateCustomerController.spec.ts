import { City } from "@modules/cities/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/express/app";
import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../shared/infra/typeorm";
import { currentDate, tomorrowDate } from "@shared/utils/DayJs";

let connection: Connection;

describe("Create a customer controller", () => {
  let cityResponse;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    cityResponse = await request(app).post("/cities").send({
      name: "Elnora Guerrero",
      state: "CE",
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able create a customer", async () => {
    const customerResponse = await request(app).post("/customers").send({
        name: "Mathilda Mitchell",
        gender: "male",
        birth_date: currentDate(),
        city: cityResponse.body.id
    });

    expect(customerResponse.status).toBe(201);
    expect(customerResponse.body).toHaveProperty("id");
  });

  it("should not be able to create a customer if the customer already exists", async () => {
        await request(app).post("/customers").send({
            name: "Mathilda Mitchell",
            gender: "male",
            birth_date: currentDate(),
            city: cityResponse.body.id
        });

        const customerResponse = await request(app).post("/customers").send({
            name: "Mathilda Mitchell",
            gender: "male",
            birth_date: currentDate(),
            city: cityResponse.body.id
        });

        expect(customerResponse.status).toBe(400);
        expect(customerResponse.body.message).toEqual("Customer already exists");
    });

  it("should not be able to create a customer if the gender is not allowed", async () => {
    const customerResponse = await request(app).post("/customers").send({
      name: "Mathilda Mitchell",
      gender: "test",
      birth_date: currentDate(),
      city: cityResponse.body.id
    });

    expect(customerResponse.status).toBe(400);
    expect(customerResponse.body.message).toEqual("Gender not allowed");
  });

  it("should not be able to create a customer if the date is in the future", async () => {
    const customerResponse = await request(app).post("/customers").send({
      name: "Mathilda Mitchell",
      gender: "male",
      birth_date: tomorrowDate(),
      city: cityResponse.body.id
    });

    expect(customerResponse.status).toBe(400);
    expect(customerResponse.body.message).toEqual("Date invalid");
  });

  it("should not be able to create a customer if there is not a city", async () => {
    const customerResponse = await request(app).post("/customers").send({
      name: "Mathilda Mitchell",
      gender: "male",
      birth_date: currentDate(),
      city: "9ecc7d26-7f6d-4495-8d2f-ddcb44de2081"
    });

    expect(customerResponse.status).toBe(400);
    expect(customerResponse.body.message).toEqual("City not exists");
  });
});