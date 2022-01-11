import busboy from "connect-busboy";
import dotenv from 'dotenv';
import express from "express";

import { messagingClients } from "./common/types";
import { errorHandler } from "./middlewares/errorHandler";
import { messagingAPI } from "./middlewares/messagingAPI";
import { uploadRouter } from "./routes/upload";

const app = express();

app.use(express.json());
dotenv.config();
app.use(busboy());

app.use(messagingAPI({ client: messagingClients.TELEGRAM }))

const routes = [uploadRouter];
routes.forEach((route) => {
  app.use(route);
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Running on 3000");
});
