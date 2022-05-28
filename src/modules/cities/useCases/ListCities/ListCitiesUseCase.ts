import { City } from "@modules/cities/infra/typeorm/entities/City";
import { ICitiesRepository } from "@modules/cities/repositories/ICitiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCitiesUseCase {
    constructor(
        @inject("CitiesRepository")
        private citiesRepository: ICitiesRepository
    ) {}

    async execute(): Promise<City[]> {
        return await this.citiesRepository.searchAll();
    }
}

export { ListCitiesUseCase };
