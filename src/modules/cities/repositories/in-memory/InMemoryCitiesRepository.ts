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

    async searchAll(): Promise<City[]> {
        return this.cities;
    }

    async searchByNameOrState({
        name,
        state,
    }: ISearchCitiesDTO): Promise<City[]> {
        return this.cities.filter(city => {
            if (city.name === name || city.state === state)
                return city;
        });
    }

    async searchByName({
        name
    }: ISearchByNameDTO): Promise<City[]> {
        return this.cities.filter(city => {
            if (city.name === name)
                return city;
        });
    }

    async searchByState({
        state
    }: ISearchByStateDTO): Promise<City[]> {
        return this.cities.filter(city => {
            if (city.state === state)
                return city;
        });
    }

    async searchById(id: string): Promise<City> {
        return this.cities.find(city => {
            if (city.id === id)
                return city.customers;
        })
    }
}

export { InMemoryCitiesRepository };
