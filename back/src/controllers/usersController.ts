 import { Request, Response } from "express";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { createUserService, getUserByIdService, getUsersService } from "../services/userService";
import { validateCredentialService } from "../services/credentialService";
 
 export const getUsersController = (req: Request, res: Response) => {
     try{
        const response = getUsersService();
        res.status(200).json({
            message: "Users Controller",
            data: response
       });
     } catch (error) {
         res.status(400).json({
            message: "Error getting users",
            data: error
       });
     }
 }

 export const getUserByIdController = (req: Request<{ id: string }>, res: Response): void => {
   const { id } = req.params;

   try{
        const response = getUserByIdService(Number(id));
        res.status(200).json({
            message: "User By Id Controller" + id,
            data: response
        });
        } catch (error) {
            res.status(400).json({
                message: `Error getting user by id ${id}`,
                data: error
               });
        }
 }

 export const registerUserController = (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) => {
   const { name, email, birthdate, nDni, username, password } = req.body;
   try{
        const response = createUserService({name, email, birthdate, nDni, username, password});
        res.status(201).json({
            message: "Register User Controller",
            data: response
            });
         } catch (error) {
             res.status(400).json({
                message: "Error registering user",
                data: error
            });
         }
 }

 export const loginUserController = (req: Request<unknown, unknown, UserLoginDTO>, res: Response) => {
     const { username, password } = req.body;

     try{
        const response = validateCredentialService({username, password});
        res.status(200).json({
            message: "Login User Controller",
            data: response
            });
         } catch (error) {
             res.status(400).json({
                message: "Error logging in user",
                data: error
            });
         }
 }