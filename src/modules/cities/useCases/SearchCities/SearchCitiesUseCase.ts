import { ISearchCitiesDTO } from "@modules/cities/dto/ISearchCitiesDTO";
import { City } from "@modules/cities/infra/typeorm/entities/City";
import { ICitiesRepository } from "@modules/cities/repositories/ICitiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class SearchCitiesUseCase {
    constructor(
        @inject("CitiesRepository")
        private citiesRepository: ICitiesRepository
    ) {}

    async execute({
        name,
        state,
        page = 1,
        limit = 10
    }: ISearchCitiesDTO): Promise<City[]> {
        const cities = await this.citiesRepository.searchByNameOrState({
            name,
            state,
            page,
            limit,
        });

        return cities;
    }
}

export { SearchCitiesUseCase };