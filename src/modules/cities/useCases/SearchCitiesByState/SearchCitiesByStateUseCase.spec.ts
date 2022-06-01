import { InMemoryCitiesRepository } from "@modules/cities/repositories/in-memory/InMemoryCitiesRepository";
import { CreateCityUseCase } from "../CreateCity/CreateCityUseCase";
import { SearchCitiesByStateUseCase } from "./SearchCitiesByStateUseCase";

let createCityUseCase: CreateCityUseCase;
let searchCitiesByStateUseCase: SearchCitiesByStateUseCase;
let inMemoryCitiesRepository: InMemoryCitiesRepository;

describe("Search cities by name", () => {
    beforeEach(() => {
        inMemoryCitiesRepository = new InMemoryCitiesRepository();
        createCityUseCase = new CreateCityUseCase(inMemoryCitiesRepository);
        searchCitiesByStateUseCase = new SearchCitiesByStateUseCase(inMemoryCitiesRepository);
    });

    it("should be able to search a city by state after insert in memory repository", async () => {
        const state = "SP";

        await createCityUseCase.execute({
            name: "Cora Carpenter",
            state
        });

        const cities = await searchCitiesByStateUseCase.execute({
            state,
            page: 1,
            limit: 1,
        });

        expect(cities[0]).toHaveProperty("id");
    });

    it("should not to be able to search a city by name if there is no records", async () => {
        const state = "RJ";

        const cities = await searchCitiesByStateUseCase.execute({
            state,
            page: 1,
            limit: 1,
        });

        expect(cities.length).toBeLessThan(1);
    });
});