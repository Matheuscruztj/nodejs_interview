import dayjs from "dayjs";

import { City } from "@modules/cities/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/express/app";
import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../shared/infra/typeorm";
import { currentDate, tomorrowDate } from "@shared/utils/DayJs";

let connection: Connection;

describe("Delete customer by id controller", () => {
  let cityResponse;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    cityResponse = await request(app).post("/cities").send({
      name: "Emma Washington",
      state: "CE",
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to delete a customer by id", async() => {
    const customerResponse = await request(app).post("/customers").send({
        name: "Carl Becker",
        gender: "male",
        birth_date: currentDate(),
        city: cityResponse.body.id
    });

    const deleteResponse = await request(app).delete(`/customers/${customerResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);
  });

  it("should not be able to delete a customer if the id is invalid", async () => {
    const deleteResponse = await request(app).delete("/customers/123");

    expect(deleteResponse.status).toBe(400);
    expect(deleteResponse.body.message).toEqual("Invalid id");
  });

  it("should not be able to delete a customer if the id not exists", async () => {
    const deleteResponse = await request(app).delete("/customers/49c69c66-e4e7-4e8f-8664-92e5c6bdd18d");

    expect(deleteResponse.status).toBe(400);
    expect(deleteResponse.body.message).toEqual("Customer not exists");
  });
});