import { ISearchByStateDTO } from "@modules/cities/dto/ISearchByStateDTO";
import { ISearchCitiesDTO } from "@modules/cities/dto/ISearchCitiesDTO";
import { City } from "@modules/cities/infra/typeorm/entities/City";
import { statesList } from "@modules/cities/list/StatesList";
import { ICitiesRepository } from "@modules/cities/repositories/ICitiesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class SearchCitiesByStateUseCase {
    constructor(
        @inject("CitiesRepository")
        private citiesRepository: ICitiesRepository
    ) {}

    async execute({
        state,
        page = 1,
        limit = 10
    }: ISearchByStateDTO): Promise<City[]> {
        if (!state)
            throw new AppError("Value should not be empty");

        if (!statesList.includes(state.toLocaleUpperCase()))
            throw new AppError("State not allowed");

        const cities = await this.citiesRepository.searchByState({
            state,
            page,
            limit,
        });

        return cities;
    }
}

export { SearchCitiesByStateUseCase };