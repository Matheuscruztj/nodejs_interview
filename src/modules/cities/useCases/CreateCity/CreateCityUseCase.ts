import { ICitiesRepository } from "@modules/cities/repositories/ICitiesRepository";
import { statesList } from "../../../../modules/cities/list/StatesList";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

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
    }: IRequest): Promise<void> {
        if (!statesList.includes(state))
            throw new AppError("Sigla do estado não permitido");
        
        let cityAlreadyExists = await this.citiesRepository.findByNameAndState(
            name,
            state,
        );

        if (cityAlreadyExists) 
            throw new AppError("Register already exists");
 
        await this.citiesRepository.create({
            name,
            state,
        });
    }
}

export { CreateCityUseCase };