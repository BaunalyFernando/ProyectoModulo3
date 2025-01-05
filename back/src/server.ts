import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/indexRouter";
import { PostgresError } from "./interfaces/ErrorInterface";

const server: Application = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(router);
server.use((err:unknown, req:Request, res:Response, next: NextFunction) => {

    const error = err as PostgresError;

    if(error.code === 404) res.status(404).json({
        message: error.message,
        details: error.detail
    }) 
    else {
    res.status(400).json({
        message: error.message,
        details: error.detail
    })
}
});

export default server;