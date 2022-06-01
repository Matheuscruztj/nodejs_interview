import { app } from "@shared/infra/http/express/app";
import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("Create a city controller", () => {
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
    expect(response.body).toHaveProperty("id");
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

  it("should not be able to create a new city with name length less than minimal", async () => {
    const name = "L";

    const response = await request(app).post("/cities").send({
      name,
      state: "CA",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Request data invalid");
    expect(response.body.list[0]).toEqual(`Reason: City name only should have at least 2 characters. Parameter 'name' located on 'body'`);
  });

  it("should not be able to create a new city with name length greater than minimal", async () => {
    let text = "A";
    const name = text.repeat(256);

    const response = await request(app).post("/cities").send({
      name,
      state: "CA",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Request data invalid");
    expect(response.body.list[0]).toEqual("Reason: City name only should have at maximum 255 characters. Parameter 'name' located on 'body'");
  });

  it("should not be able to create a new city with state length less than minimal", async () => {
    const response = await request(app).post("/cities").send({
      name: "Abc",
      state: "C",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Request data invalid");
    expect(response.body.list[0]).toEqual(`Reason: City state only should have at least 2 characters. Parameter 'state' located on 'body'`);
  });

  it("should not be able to create a new city with state length greater than minimal", async () => {
    const response = await request(app).post("/cities").send({
      name: "Abc",
      state: "CCC",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Request data invalid");
    expect(response.body.list[0]).toEqual(`Reason: City state only should have at maximum 2 characters. Parameter 'state' located on 'body'`);
  });
});
