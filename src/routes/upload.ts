import express from 'express'
import { Message } from 'node-telegram-bot-api'

import { NoteDetails } from '../common/types'
import { validateRequest } from '../middlewares/validateRequest'
import { readUploadedJSON, uploadMultipleFiles } from '../services/uploadService'

const router = express.Router()


router.post('/api/upload', validateRequest, async (req, res) => {
  const { message }: { message: Message } = req.body;
  const jsonData = await readUploadedJSON(message.document!, req.messageApi!);
  const urls: Array<string> = jsonData.data.notesDetails.map(
    (val: NoteDetails) => val.docUrl,
  )
  console.log(urls);
  try {
    uploadMultipleFiles(req.messageApi!, message.chat.id, urls);
  } catch (err) {
    console.log("Error while uploading files - ", err);
    res.status(500).send("Error occurred");
  }
  res.status(200).send("upload successfull");
});

export { router as uploadRouter }
