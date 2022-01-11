import axios from "axios";

import { TelegramSendMessage } from "../../common/types";
import { TELEGRAM_API_URL, TELEGRAM_BOT_URL, TELEGRAM_GET_FIL_URL, TELEGRAM_METHODS } from "../../constants";

export class TelegramAPI {
    TELEGRAM_BOT_TOKEN: string | undefined;

    constructor() {
        this.TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN;
    }

    sendMessage = async (body: TelegramSendMessage) => {
        console.log(body);
        const response = await axios.post(`${TELEGRAM_BOT_URL}${this.TELEGRAM_BOT_TOKEN}/${TELEGRAM_METHODS.SEND_MESSAGE}`, body);
        return response;
    }

    sendTextMessage = async (receiver: string | number, text: string) => {
        let body: TelegramSendMessage = {
            chat_id: receiver,
            text
        }
        const response = await this.sendMessage(body);
        return response;
    }

    getFile = async (fileId: string) => {
        const response = await axios.get(`${TELEGRAM_BOT_URL}${this.TELEGRAM_BOT_TOKEN}/${TELEGRAM_METHODS.GET_FILE}?file_id=${fileId}`);
        return response.data.result;
    }

    downloadFile = async (filePath: string) => {
        const response = await axios.get(`${TELEGRAM_API_URL}/${TELEGRAM_GET_FIL_URL}${this.TELEGRAM_BOT_TOKEN}/${filePath}`);
        return response.data;
    }


}
