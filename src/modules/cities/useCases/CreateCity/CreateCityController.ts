import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCityUseCase } from "./CreateCityUseCase";

import { checkRequestParams } from "../../../../shared/errors/RequestError";

class CreateCityController {
    async handle(request: Request, response: Response): Promise<Response> {
        checkRequestParams(request, response);

        const { name, state } = request.body;

        const createCityUseCase = container.resolve(CreateCityUseCase);

        await createCityUseCase.execute({
            name,
            state,
        })

        return response.status(201).json();
    }
}

export { CreateCityController };
