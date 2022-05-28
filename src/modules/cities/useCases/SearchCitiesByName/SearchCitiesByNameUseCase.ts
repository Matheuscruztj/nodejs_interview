import { ISearchByNameDTO } from "@modules/cities/dto/ISearchByNameDTO";
import { City } from "@modules/cities/infra/typeorm/entities/City";
import { ICitiesRepository } from "@modules/cities/repositories/ICitiesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class SearchCitiesByNameUseCase {
    constructor(
        @inject("CitiesRepository")
        private citiesRepository: ICitiesRepository
    ) {}

    async execute({
        name,
        page = 1,
        limit = 10
    }: ISearchByNameDTO): Promise<City[]> {
        if (!name)
            throw new AppError("Name invalid");

        const cities = await this.citiesRepository.searchByName({
            name,
            page,
            limit,
        });

        return cities;
    }
}

export { SearchCitiesByNameUseCase };