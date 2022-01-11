import { ValidationError } from "../types";
import { AbstractError } from "./AbstractError";

export class RequestValidationError extends AbstractError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super();
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors;
    }
}
