import { InMemoryCitiesRepository } from "@modules/cities/repositories/in-memory/InMemoryCitiesRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateCityUseCase } from "./CreateCityUseCase";

let createCityUseCase: CreateCityUseCase;
let inMemoryCitiesRepository: InMemoryCitiesRepository;

describe("Create city", () => {
    beforeEach(() => {
        inMemoryCitiesRepository = new InMemoryCitiesRepository();
        createCityUseCase = new CreateCityUseCase(inMemoryCitiesRepository);
    });

    it("should be able to create a city", async () => {
        const user = await createCityUseCase.execute({
            name: "Franklin Aguilar",
            state: "CE"
        });

        expect(user).toHaveProperty("id");
    });

    it("should not be able to create a city if there is a not allowed state", async () => {
        await expect(
            createCityUseCase.execute({
                name: "Rose Jimenez",
                state: "AB"
            }),
        ).rejects.toEqual(
            new AppError("State not allowed"),
        );
    });

    it("should not be able to create a city if there is a register already", async () => {
        await createCityUseCase.execute({
            name: "Carlos Dawson",
            state: "CE"
        });

        await expect(
            createCityUseCase.execute({
                name: "Carlos Dawson",
                state: "CE"
            }),
        ).rejects.toEqual(
            new AppError("Register already exists"),
        );
    });
})