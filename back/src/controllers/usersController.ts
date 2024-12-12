 import { Request, Response } from "express";
 
 export const getUsersController = (req: Request, res: Response) => {
     res.send("Users Controller");
 }

 export const getUserByIdController = (req: Request, res: Response) => {
     res.send("User By Id Controller");
 }

 export const registerUserController = (req: Request, res: Response) => {
     res.send("Register User Controller");
 }

 export const loginUserController = (req: Request, res: Response) => {
     res.send("Login User Controller");
 }