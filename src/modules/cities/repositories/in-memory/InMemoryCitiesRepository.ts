import { ICreateCityDTO } from "@modules/cities/dto/ICreateCityDTO";
import { ISearchByNameAndStateDTO } from "@modules/cities/dto/ISearchByNameAndStateDTO";
import { ISearchByNameDTO } from "@modules/cities/dto/ISearchByNameDTO";
import { ISearchByStateDTO } from "@modules/cities/dto/ISearchByStateDTO";
import { ISearchCitiesDTO } from "@modules/cities/dto/ISearchCitiesDTO";
import { City } from "@modules/cities/infra/typeorm/entities/City";
import { ICitiesRepository } from "../ICitiesRepository";

class InMemoryCitiesRepository implements ICitiesRepository {
    cities: City[] = [];

    async create({
        name,
        state
    }: ICreateCityDTO): Promise<City> {
        const city = new City();

        Object.assign(city, {
            name,
            state,
        });

        await this.cities.push(city);

        return city;        
    }

    async searchByNameAndState({
        name,
        state
    }: ISearchByNameAndStateDTO): Promise<City> {
        const citiesMatched = await this.cities.filter((city) => {
            if (city.name === name && city.state === state) {
                return city;
            }
        });

        if(citiesMatched.length)
            return citiesMatched[0];
    }

    searchAll(): Promise<City[]> {
        throw new Error("Method not implemented.");
    }

    searchByNameOrState(data: ISearchCitiesDTO): Promise<City[]> {
        throw new Error("Method not implemented.");
    }

    searchByName(data: ISearchByNameDTO): Promise<City[]> {
        throw new Error("Method not implemented.");
    }
    searchByState(data: ISearchByStateDTO): Promise<City[]> {
        throw new Error("Method not implemented.");
    }
}

export { InMemoryCitiesRepository };
