import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchCitiesByStateUseCase } from "./SearchCitiesByStateUseCase";

class SearchCitiesByStateController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { value, page, limit } = request.query;

        const searchCitiesByStateUseCase = container.resolve(SearchCitiesByStateUseCase);

        const cities = await searchCitiesByStateUseCase.execute({
            state: value,
            page,
            limit
        });

        return response.json(cities);
    }
}

export { SearchCitiesByStateController };
