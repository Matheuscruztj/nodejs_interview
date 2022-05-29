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
});