import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchCitiesByStateUseCase } from "./SearchCitiesByStateUseCase";

class SearchCitiesByStateController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { value, page, limit } = request.query;

        const searchCitiesByStateUseCase = container.resolve(SearchCitiesByStateUseCase);

        const cities = await searchCitiesByStateUseCase.execute({
            state: value as string,
            page: page ? parseInt(page as string) : 1,
            limit: limit ? parseInt(limit as string) : 1,
        });

        return response.json(cities).send();
    }
}

export { SearchCitiesByStateController };
