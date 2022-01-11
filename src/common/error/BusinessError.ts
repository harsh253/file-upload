import { AbstractError } from "./AbstractError";

export class BusinessError extends AbstractError {
    statusCode = 400;

    constructor(public message: string) {
        super();
        Object.setPrototypeOf(this, BusinessError.prototype);
    }

    serializeErrors() {
        return [
            {
                message: this.message,
            },
        ];
    }
}
