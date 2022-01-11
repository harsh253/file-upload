import { SerializedError } from "../types";

export abstract class AbstractError extends Error {
    abstract statusCode: number;
    abstract serializeErrors(): SerializedError[];

    constructor() {
        super();
        Object.setPrototypeOf(this, AbstractError.prototype);
    }
}
