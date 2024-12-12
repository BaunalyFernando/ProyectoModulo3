import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/indexRouter";

const server: Application = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(router);

export default server;