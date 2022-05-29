import { checkRequestParams } from "@shared/errors/RequestError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchCustomerByIdUseCase } from "./SearchCustomerByIdUseCase";

class SearchCustomerByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        checkRequestParams(request, response);

        const { value } = request.query;

        const searchCustomerByIdUseCase = container.resolve(SearchCustomerByIdUseCase);

        const customer = await searchCustomerByIdUseCase.execute(value as string);

        return response.json(customer).send();
    }
}

export { SearchCustomerByIdController };
