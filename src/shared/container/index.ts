import { CitiesRepository } from "@modules/cities/infra/typeorm/repositories/CitiesRepository";
import { ICitiesRepository } from "@modules/cities/repositories/ICitiesRepository";
import { container } from "tsyringe";

container.registerSingleton<ICitiesRepository>(
    "CitiesRepository",
    CitiesRepository
);
