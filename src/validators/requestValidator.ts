import { Request } from "express";
import { Message } from "node-telegram-bot-api";

import { ValidationError } from "../common/types";

export const requestValidator = (req: Request) => {
    const { message }: { message: Message } = req.body;
    let errors: ValidationError[] = [];

    if (!message.document) {
        errors.push({
            message: "Type of message should be a file",
            field: "message.document",
        })
    }

    return errors;
}