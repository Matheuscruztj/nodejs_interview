import { checkRequestParams } from "@shared/errors/RequestError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangeCustomerNameUseCase } from "./ChangeCustomerNameUseCase";

class ChangeCustomerNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        checkRequestParams(request, response);

        const { id } = request.params;

        const { name } = request.body;

        const changeCustomerNameUseCase = container.resolve(ChangeCustomerNameUseCase);

        const costumer = await changeCustomerNameUseCase.execute({
            id,
            name,
        });

        return response.send(costumer);
    }
}

export { ChangeCustomerNameController };
