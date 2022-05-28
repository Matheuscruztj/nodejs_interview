import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchCitiesByNameUseCase } from "./SearchCitiesByNameUseCase";

class SearchCitiesByNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { value, page, limit } = request.query;

        const searchCitiesByNameUseCase = container.resolve(SearchCitiesByNameUseCase);

        const cities = await searchCitiesByNameUseCase.execute({
            name: value,
            page,
            limit
        });

        return response.json(cities);
    }
}

export { SearchCitiesByNameController };
