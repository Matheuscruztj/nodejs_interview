import { checkRequestParams } from "@shared/errors/RequestError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateCustomerController {
    async handle(request: Request, response: Response): Promise<Response> {
        checkRequestParams(request, response);

        const { 
            name,
            gender,
            birth_date,
            city 
        } = request.body;

        const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

        const customer = await createCustomerUseCase.execute({
            name,
            gender,
            birth_date,
            city,
        });

        return response.status(201).send(customer);
    }
}

export { CreateCustomerController };
