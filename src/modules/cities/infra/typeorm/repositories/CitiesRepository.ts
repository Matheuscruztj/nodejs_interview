import { ICreateCityDTO } from "@modules/cities/dto/ICreateCityDTO";
import { ISearchByNameAndStateDTO } from "@modules/cities/dto/ISearchByNameAndStateDTO";
import { ISearchByNameDTO } from "@modules/cities/dto/ISearchByNameDTO";
import { ISearchByStateDTO } from "@modules/cities/dto/ISearchByStateDTO";
import { ISearchCitiesDTO } from "@modules/cities/dto/ISearchCitiesDTO";
import { ICitiesRepository } from "@modules/cities/repositories/ICitiesRepository";
import { getRepository, Like, Repository } from "typeorm";
import { City } from "../entities/City";

class CitiesRepository implements ICitiesRepository {
    private repository: Repository<City>;

    constructor() {
        this.repository = getRepository(City);
    }

    async create({
        name,
        state,
    }: ICreateCityDTO): Promise<City> {
        const city = this.repository.create({
            name,
            state,
        });

        await this.repository.save(city);

        return city;
    }

    async searchByNameOrState({
        name,
        state,
        page,
        limit,
    }: ISearchCitiesDTO): Promise<City[]> {
        const nameSanitized = name ? `%${name.toString().toLowerCase()}%` : null;
        const stateSanitized = state ? `%${state.toString().toLowerCase()}%` : null;

        const cities = await this.repository.createQueryBuilder('cities')
            .select([
                "cities.name",
                "cities.state"
            ])
            .where("LOWER(cities.name) like :name", {
                name: `%${nameSanitized}%`,
            })
            .orWhere("LOWER(cities.state) like :state", {
                state: `%${stateSanitized}%`,
            })
            .orderBy("cities.state", "ASC")
            .orderBy("cities.name", "ASC")
            .limit(limit)
            .offset((page - 1) * limit)
            .getMany();

        return cities;
    }

    async searchByNameAndState({
        name,
        state
    }: ISearchByNameAndStateDTO): Promise<City> {
        const cities = await this.repository.find({
            where: { 
                name,
                state,
            }
        });

        if(cities.length)
            return cities[0];
    }

    async searchByName({
        name,
        page,
        limit,
    }: ISearchByNameDTO): Promise<City[]> {
        const nameSanitized = name ? `%${name.toString().toLowerCase()}%` : null;

        const cities = await this.repository.createQueryBuilder('cities')
            .innerJoinAndSelect("cities.customers", "customers")
            .where("LOWER(cities.name) like :name", {
                name: `%${nameSanitized}%`,
            })
            .orderBy("cities.state", "ASC")
            .orderBy("cities.name", "ASC")
            .limit(limit)
            .offset((page - 1) * limit)
            .getMany();

        return cities;
    }

    async searchByState({
        state,
        page,
        limit,
    }: ISearchByStateDTO): Promise<City[]> {
        const stateSanitized = state ? `%${state.toString().toLowerCase()}%` : null;

        const cities = await this.repository.createQueryBuilder('cities')
            .innerJoinAndSelect("cities.customers", "customers")
            .where("LOWER(cities.state) like :state", {
                state: `%${stateSanitized}%`,
            })
            .orderBy("cities.state", "ASC")
            .orderBy("cities.name", "ASC")
            .limit(limit)
            .offset((page - 1) * limit)
            .getMany();

        return cities;
    }

    async searchAll(): Promise<City[]> {
        return await this.repository.find({
            order: {
                state: "ASC",
                name: "ASC",
            }
        });
    }

    async searchById(id: string): Promise<City> {
        return this.repository.findOne(id);
    }
}

export { CitiesRepository };
