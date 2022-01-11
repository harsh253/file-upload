import { MessageEntity, SendMessageOptions } from "node-telegram-bot-api";

export interface NoteDetails {
    docUrl: string,
}

export enum messagingClients {
    TELEGRAM
}

export interface messagingAPIOptions {
    client: messagingClients
}

export interface TelegramSendMessage extends SendMessageOptions {
    chat_id: number | string,
    text: string,
    entities?: MessageEntity[]
}

export interface SerializedError {
    message: string;
    field?: string;
}

export interface ValidationError extends SerializedError {
    nestedErrors?: unknown[]
}