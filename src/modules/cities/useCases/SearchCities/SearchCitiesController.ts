import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchCitiesUseCase } from "./SearchCitiesUseCase";

class SearchCitiesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, state, page, limit } = request.query;

        const searchCitiesUseCase = container.resolve(SearchCitiesUseCase);

        const cities = await searchCitiesUseCase.execute({
            name,
            state,
            page,
            limit
        });

        return response.json(cities);
    }
}

export { SearchCitiesController };
