import { app } from "@shared/infra/http/express/app";
import { currentDate, tomorrowDate } from "@shared/utils/DayJs";
import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("Search customers by id controller", () => {
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

    it("should be able to search a customer by id", async () => {
        const customerResponse = await request(app).post("/customers").send({
            name: "Margaret Soto",
            gender: "male",
            birth_date: currentDate(),
            city: cityResponse.body.id
        });

        const customerSearchResponse = await request(app).get("/customers/searchUserById").query({
            value: customerResponse.body.id
        })
    
        expect(customerSearchResponse.status).toBe(200);
        expect(customerSearchResponse.body).toHaveProperty("id");
    });

    it("should not be able to search a customer by id if city is invalid", async () => {
        const customerSearchResponse = await request(app).get("/customers/searchUserById").query({
            value: 123
        });

        expect(customerSearchResponse.status).toBe(400);
        expect(customerSearchResponse.body.message).toEqual("Invalid id");
    });

    it("should not be able to search a customer by id if customer not exists", async () => {
        const customerSearchResponse = await request(app).get("/customers/searchUserById").query({
            value: "d7a4ffca-55b8-41cd-ba89-037d424dca46"
        });

        expect(customerSearchResponse.status).toBe(400);
        expect(customerSearchResponse.body.message).toEqual("Customer not exists");
    });

    it("should not be able to search a customer by id if query value is empty", async () => {
        const customerSearchResponse = await request(app).get("/customers/searchUserById");

        expect(customerSearchResponse.status).toBe(400);
        expect(customerSearchResponse.body.message).toEqual("Request data invalid");
        expect(customerSearchResponse.body.list[0]).toEqual("Reason: Value should not be empty. Parameter 'value' located on 'query'");
    });
});