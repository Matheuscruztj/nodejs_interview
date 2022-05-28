import { ICreateCityDTO } from "../dto/ICreateCityDTO";
import { ISearchCitiesDTO } from "../dto/ISearchCitiesDTO";
import { City } from "../infra/typeorm/entities/City";

interface ICitiesRepository {
    create(data: ICreateCityDTO): Promise<City>;
    searchByNameAndState(name: string, state: string): Promise<City>;
    searchAll(): Promise<City[]>;
    searchByNameOrState(data: ISearchCitiesDTO): Promise<City[]>;
}

export { ICitiesRepository };
