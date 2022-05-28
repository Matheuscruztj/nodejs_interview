import { InMemoryCitiesRepository } from "@modules/cities/repositories/in-memory/InMemoryCitiesRepository";
import { CreateCityUseCase } from "./CreateCityUseCase";

let createCityUseCase: CreateCityUseCase;
let inMemoryCitiesRepository: InMemoryCitiesRepository;

describe("Create city", () => {
    beforeEach(() => {
        inMemoryCitiesRepository = new InMemoryCitiesRepository();
        createCityUseCase = new CreateCityUseCase(inMemoryCitiesRepository);
    });

    it("shoud be able to create a city", async () => {
        const user = await createCityUseCase.execute({
            name: "Teste",
            state: "CE"
        });

        console.log(user);

        expect(user).toHaveProperty("id");
    });
})