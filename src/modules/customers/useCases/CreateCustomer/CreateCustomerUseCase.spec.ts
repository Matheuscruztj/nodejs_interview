import { InMemoryCitiesRepository } from "@modules/cities/repositories/in-memory/InMemoryCitiesRepository";
import { CreateCityUseCase } from "@modules/cities/useCases/CreateCity/CreateCityUseCase";
import { AppError } from "@shared/errors/AppError";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

let createCityUseCase: CreateCityUseCase;
let createCustomerUseCase: CreateCustomerUseCase;
let inMemoryCitiesRepository: InMemoryCitiesRepository;
let inMemoryCitiesRepository: InMemoryCitiesRepository;

describe("Create city", () => {
    beforeEach(() => {
        inMemoryCitiesRepository = new InMemoryCitiesRepository();
        createCityUseCase = new CreateCityUseCase(inMemoryCitiesRepository);
        createCustomerUseCase = new CreateCustomerUseCase(inMemoryCitiesRepository);
    });

    it("shoud be able to create a customer", async () => {
        const user = await createCityUseCase.execute({
            name: "Franklin Aguilar",
            state: "CE"
        });

        expect(user).toHaveProperty("id");
    });
});