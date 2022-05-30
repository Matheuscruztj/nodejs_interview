import { app } from "@shared/infra/http/express/app";
import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

jest.setTimeout(15000);

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new city", async () => {
    const response = await request(app).post("/cities").send({
      name: "Isabelle Pearson",
      state: "CE",
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new city with invalid state", async () => {
    const response = await request(app).post("/cities").send({
      name: "Lora Gibbs",
      state: "CA",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("State not allowed");
  });

  it("should not be able to create a new city if there is a already existing city", async () => {
    await request(app).post("/cities").send({
      name: "Shawn Wallace",
      state: "CE",
    });

    const response = await request(app).post("/cities").send({
      name: "Shawn Wallace",
      state: "CE",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Register already exists");
  });
});
