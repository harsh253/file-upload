import { NextFunction, Request, Response } from "express";

import { messagingAPIOptions, messagingClients } from "../common/types";
import { TelegramAPI } from "../modules/telegram";

declare global {
    namespace Express {
        interface Request {
            messageApi?: TelegramAPI;
        }
    }
}

export const messagingAPI = (options: messagingAPIOptions) => (req: Request, res: Response, next: NextFunction) => {
    const client = options.client
    switch (client) {
        case messagingClients.TELEGRAM:
            req.messageApi = new TelegramAPI();
            break;

        default:
            console.log(`No such messageing client configured - ${client}`)
            req.messageApi = undefined;
            break;
    }
    next();
}
