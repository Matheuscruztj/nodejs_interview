import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export class RequestError {
    public readonly list: string[];

    constructor(list: string[]) {
        this.list = list;
    }
}

export function checkRequestParams (request: Request, response: Response) {
    const errors = validationResult(request);
    
    if (!errors.isEmpty()) {
        let errorsArray = errors.array();
        let messages: string[] = [];
        
        errorsArray.forEach((error) => {
            let message: string = '';

            if(error.msg)
                message += `Reason: ${error.msg}.`;

            if(error.param)
                message += ` Parameter '${error.param}'`;
            
            if(error.value)
                message += ` with current value '${error.value}'`;

            if(error.location)
                message += ` located on '${error.location}'`;

            messages.push(message);
        });

        throw new RequestError(messages);
    }
}