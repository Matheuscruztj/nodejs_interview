import { ICreateCityDTO } from "../dto/ICreateCityDTO";
import { ISearchByNameAndStateDTO } from "../dto/ISearchByNameAndStateDTO";
import { ISearchByNameDTO } from "../dto/ISearchByNameDTO";
import { ISearchByStateDTO } from "../dto/ISearchByStateDTO";
import { ISearchCitiesDTO } from "../dto/ISearchCitiesDTO";
import { City } from "../infra/typeorm/entities/City";

interface ICitiesRepository {
    create(data: ICreateCityDTO): Promise<City>;
    searchByNameAndState(data: ISearchByNameAndStateDTO): Promise<City>;
    searchAll(): Promise<City[]>;
    searchByNameOrState(data: ISearchCitiesDTO): Promise<City[]>;
    searchByName(data: ISearchByNameDTO): Promise<City[]>;
    searchByState(data: ISearchByStateDTO): Promise<City[]>;
}

export { ICitiesRepository };
