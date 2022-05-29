import { checkRequestParams } from "@shared/errors/RequestError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchCitiesByNameUseCase } from "./SearchCitiesByNameUseCase";

class SearchCitiesByNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        checkRequestParams(request, response);

        const { value, page, limit } = request.query;

        const searchCitiesByNameUseCase = container.resolve(SearchCitiesByNameUseCase);

        const cities = await searchCitiesByNameUseCase.execute({
            name: value as string,
            page: page ? parseInt(page as string) : 1,
            limit: limit ? parseInt(limit as string) : 1,
        });

        return response.json(cities).send();
    }
}

export { SearchCitiesByNameController };
