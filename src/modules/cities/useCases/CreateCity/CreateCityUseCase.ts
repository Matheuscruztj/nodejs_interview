import "reflect-metadata";

import { ICitiesRepository } from "@modules/cities/repositories/ICitiesRepository";
import { statesList } from "../../../../modules/cities/list/StatesList";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { City } from "@modules/cities/infra/typeorm/entities/City";

interface IRequest {
    name: string;
    state: string;
}

@injectable()
class CreateCityUseCase {
    constructor(
        @inject("CitiesRepository")
        private citiesRepository: ICitiesRepository
    ) {}

    async execute({
        name,
        state
    }: IRequest): Promise<City> {
        const stateSanitized = state.toUpperCase();

        if (!statesList.includes(stateSanitized))
            throw new AppError("State not allowed");

        let cityAlreadyExists = await this.citiesRepository.searchByNameAndState({
            name,
            state: stateSanitized,
        });

        if (cityAlreadyExists) 
            throw new AppError("Register already exists");
 
        const city = await this.citiesRepository.create({
            name,
            state: stateSanitized,
        });

        return city;
    }
}

export { CreateCityUseCase };