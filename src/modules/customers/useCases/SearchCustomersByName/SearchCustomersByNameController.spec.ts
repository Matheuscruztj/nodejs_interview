import { City } from "@modules/cities/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/express/app";
import { currentDate, tomorrowDate } from "@shared/utils/DayJs";
import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("Search customers by name controller", () => {
    let cityResponse;
  
    beforeAll(async () => {
      connection = await createConnection();
      await connection.runMigrations();
  
      cityResponse = await request(app).post("/cities").send({
        name: "Lilly Rice",
        state: "CE",
      });
    });
  
    afterAll(async () => {
      await connection.dropDatabase();
      await connection.close();
    });

    it("should be able to search a customer by name", async () => {
        const name = "Glenn Terry";

        const customerResponse = await request(app).post("/customers").send({
            name,
            gender: "male",
            birth_date: currentDate(),
            city: cityResponse.body.id
        });

        const customerSearchResponse = await request(app).get("/customers/searchUserByName").query({
            value: name
        })

        expect(customerSearchResponse.status).toBe(200);
        expect(customerSearchResponse.body.length).toBeGreaterThan(0);
    });

    it("should be able to search a customer by name if there is not a customer", async () => {
        const customerSearchResponse = await request(app).get("/customers/searchUserByName").query({
            value: "test"
        })

        expect(customerSearchResponse.status).toBe(200);
        expect(customerSearchResponse.body.length).toEqual(0);
    });
});