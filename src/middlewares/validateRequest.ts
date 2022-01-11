import { NextFunction, Request, Response } from "express";

import { RequestValidationError } from "../common/error/RequestValidationError";
import { requestValidator } from "../validators/requestValidator";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = requestValidator(req);

    if (errors.length > 0) {
        throw new RequestValidationError(errors);
    }

    next();
}