import { getStorage, ref } from "firebase/storage";
import { Document, File } from "node-telegram-bot-api";

import { BusinessError } from "../common/error/BusinessError";
import { firebaseApp } from "../firebase";
import { TelegramAPI } from "../modules/telegram";
import { uploadFile } from "../utils/firebaseUtils";
import { fetchAsBuffer, waitNSec } from "../utils/util";

const storage = getStorage(firebaseApp)
const folderRef = ref(storage, 'pdfs')

const readUploadedJSON = async (document: Document, messageApi: TelegramAPI) => {
    let jsonData: any = {};
    try {
        const fileId = document.file_id;
        const fileInfo = await messageApi!.getFile(fileId) as File;
        if (fileInfo.file_path) {
            const file = await messageApi!.downloadFile(fileInfo.file_path);
            jsonData = file;
        } else {
            const errorMessage = "Can't download file since file path is missing";
            console.log(errorMessage);
            throw new BusinessError(errorMessage);
        }
    } catch (err: any) {
        const errorMessage = "Error occurred while downloading or parsing the file";
        console.log(errorMessage, err);
    }
    return jsonData;
}

const uploadMultipleFiles = async (messageApi: TelegramAPI, chatId: string | number, urls: string[]) => {
    for (let url of urls) {
        const encodedUri = encodeURI(url)
        const downloadLink = await uploadFileViaUrl(encodedUri)
        sendUploadedFileLink(downloadLink, chatId, messageApi);
        await waitNSec(2);
    }
}

const sendUploadedFileLink = (downloadLink: string, chatId: string | number, messageApi: TelegramAPI) => {
    try {
        messageApi.sendTextMessage(chatId, downloadLink);
    } catch (err) {
        console.log(err);
    }
}


const uploadFileViaUrl = async (url: string) => {
    try {
        const response = await fetchAsBuffer().get(url, {
            headers: {
                Accept: 'application/pdf',
            },
        })
        const decodedUrl = decodeURI(url)
        const fileRef = ref(
            folderRef,
            decodedUrl.substr(decodedUrl.lastIndexOf('/') + 1),
        )
        const downloadLink = await uploadFile(fileRef, response.data)
        return downloadLink
    } catch (err) {
        console.log(url, err)
        return url;
    }
}

export {
    readUploadedJSON,
    uploadMultipleFiles
}