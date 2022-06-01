import { app } from "@shared/infra/http/express/app";
import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("Search cities by name controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to search a city by name after insert in database", async () => {
    const city = {
        name: "Isabelle Pearson",
        state: "CE",
    };

    await request(app).post("/cities").send({
      name: city.name,
      state: city.state,
    });

    const response = await request(app).get("/cities/searchByName").query({
        value: city.name,
        page: 1,
        limit: 1
    });

    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
  });

  it("should not be able to search a city by name if there is not any city", async () => {
    const response = await request(app).get("/cities/searchByName").query({
        value: "Johanna Bennett",
        page: 1,
        limit: 1
    });

    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(0);
  });

  it("should not be able to search a city by name if there is not a valid value on query", async () => {
    const response = await request(app).get("/cities/searchByName").query({
        value: "",
        page: 1,
        limit: 1
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Request data invalid");
    expect(response.body.list[0]).toEqual("Reason: Value should not be empty. Parameter 'value' located on 'query'");
  });

  it("should not be able to search a city by name if there is not a valid page on query", async () => {
    const response = await request(app).get("/cities/searchByName").query({
        value: "Aa",
        page: "a",
        limit: 1
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Request data invalid");
    expect(response.body.list[0]).toEqual("Reason: Page only should have to be numeric. Parameter 'page' located on 'query'");
  });

  it("should not be able to search a city by name if there is not a valid limit on query", async () => {
    const response = await request(app).get("/cities/searchByName").query({
        value: "Aa",
        page: 1,
        limit: "a"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Request data invalid");
    expect(response.body.list[0]).toEqual("Reason: Limit only should have to be numeric. Parameter 'limit' located on 'query'");
  });
});