import { InMemoryCitiesRepository } from "@modules/cities/repositories/in-memory/InMemoryCitiesRepository";
import { CreateCityUseCase } from "../CreateCity/CreateCityUseCase";
import { SearchCitiesByNameUseCase } from "./SearchCitiesByNameUseCase";

let createCityUseCase: CreateCityUseCase;
let searchCitiesByNameUseCase: SearchCitiesByNameUseCase;
let inMemoryCitiesRepository: InMemoryCitiesRepository;

describe("Search cities by name", () => {
    beforeEach(() => {
        inMemoryCitiesRepository = new InMemoryCitiesRepository();
        createCityUseCase = new CreateCityUseCase(inMemoryCitiesRepository);
        searchCitiesByNameUseCase = new SearchCitiesByNameUseCase(inMemoryCitiesRepository);
    });

    it("should be able to search a city by name after insert in memory repository", async () => {
        const name = "Franklin Aguilar";

        await createCityUseCase.execute({
            name,
            state: "CE"
        });

        const cities = await searchCitiesByNameUseCase.execute({
            name,
            page: 1,
            limit: 1,
        });

        expect(cities[0]).toHaveProperty("id");
    });

    it("should not to be able to search a city by name if there is no records", async () => {
        const name = "Inez Hubbard";

        const cities = await searchCitiesByNameUseCase.execute({
            name,
            page: 1,
            limit: 1,
        });

        expect(cities.length).toBeLessThan(1);
    });
});