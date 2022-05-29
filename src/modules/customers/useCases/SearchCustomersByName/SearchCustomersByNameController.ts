import { checkRequestParams } from "@shared/errors/RequestError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchCustomersByNameUseCase } from "./SearchCustomersByNameUseCase";

class SearchCustomersByNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        checkRequestParams(request, response);

        const { value, page, limit } = request.query;

        const searchCustomersByNameUseCase = container.resolve(SearchCustomersByNameUseCase);

        const customers = await searchCustomersByNameUseCase.execute({
            name: value as string,
            page: page ? parseInt(page as string) : 1,
            limit: limit ? parseInt(limit as string) : 1,
        });

        return response.json(customers).send();
    }
}

export { SearchCustomersByNameController };
