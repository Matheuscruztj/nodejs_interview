import { ICreateCityDTO } from "@modules/cities/dto/ICreateCityDTO";
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

    async searchByNameAndState(name: string, state: string): Promise<City> {
        const cities = await this.repository.find({
            where: { 
                name,
                state,
            }
        });

        if(cities.length)
            return cities[0];
    }

    async searchAll(): Promise<City[]> {
        return await this.repository.find({
            order: {
                state: "ASC",
                name: "ASC",
            }
        });
    }
}

export { CitiesRepository };