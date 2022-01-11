import { NextFunction, Request, Response } from "express";

import { AbstractError } from "../common/error/AbstractError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AbstractError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors(),
        });
    }

    console.log(err);
    return res.status(500).send({
        message: "Something went wrong",
    });
}