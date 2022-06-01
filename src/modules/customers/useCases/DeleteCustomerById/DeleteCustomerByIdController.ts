import { checkRequestParams } from "@shared/errors/RequestError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCustomerByIdUseCase } from "./DeleteCustomerByIdUseCase";

class DeleteCustomerByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        checkRequestParams(request, response);
        
        const { id } = request.params;

        const deleteCustomerByIdUseCase = container.resolve(DeleteCustomerByIdUseCase);

        await deleteCustomerByIdUseCase.execute(id);

        return response.status(204).send();
    }
}

export { DeleteCustomerByIdController };
