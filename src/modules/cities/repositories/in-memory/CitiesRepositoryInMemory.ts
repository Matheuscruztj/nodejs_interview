import { ICreateCityDTO } from "@modules/cities/dto/ICreateCityDTO";
import { City } from "@modules/cities/infra/typeorm/entities/City";
import { ICitiesRepository } from "../ICitiesRepository";

class CitiesRepositoryInMemory implements ICitiesRepository {
    cities: City[] = [];

    create(data: ICreateCityDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<City> {
        throw new Error("Method not implemented.");
    }
    findByState(state: string): Promise<City> {
        throw new Error("Method not implemented.");
    }
}

export { CitiesRepositoryInMemory };
