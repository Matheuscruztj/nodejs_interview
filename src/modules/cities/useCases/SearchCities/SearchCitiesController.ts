import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchCitiesUseCase } from "./SearchCitiesUseCase";

class SearchCitiesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, state, page, limit } = request.query;

        const searchCitiesUseCase = container.resolve(SearchCitiesUseCase);

        const cities = await searchCitiesUseCase.execute({
            name: name ? name as string : null,
            state: state ? state as string : null,
            page: page ? parseInt(page as string) : null,
            limit: page ? parseInt(limit as string) : null,
        });

        return response.json(cities).send();
    }
}

export { SearchCitiesController };
