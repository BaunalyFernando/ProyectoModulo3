 import { Request, Response } from "express";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO";
 
 export const getUsersController = (req: Request, res: Response) => {
     res.status(200).json({
        message: "Users Controller",
        data: []
        });
 }

 export const getUserByIdController = (req: Request<{ id: string }>, res: Response): void => {
    const { id } = req.params;
     res.status(200).json({ 
        message: "User By Id Controller" + id,
        data: []
    });
 }

 export const registerUserController = (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) => {
     res.status(201).json({
        message: "Register User Controller",
        data: req.body
        });
 }

 export const loginUserController = (req: Request<unknown, unknown, UserLoginDTO>, res: Response) => {
     res.status(200).json({
        message: "Login User Controller",
        data: req.body
        });
 }