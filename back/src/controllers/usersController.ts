 import { Request, Response } from "express";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { createUserService, getUserByIdService, getUsersService } from "../services/userService";
import { validateCredentialService } from "../services/credentialService";
 
 export const getUsersController = async (req: Request, res: Response): Promise<void> => {
     try{
        const response = await getUsersService();
        res.status(200).json({
            message: "Users Controller",
            data: response
       });
     } catch (error) {
         res.status(400).json({
            message: "Error getting users",
            data: error instanceof Error ? error.message : "unknow error"
       });
     }
 }

 export const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
   const { id } = req.params;

   try{
        const response = await getUserByIdService(Number(id));
        res.status(200).json({
            message: "User By Id Controller" + id,
            data: response
        });
        } catch (error) {
            res.status(400).json({
                message: `Error getting user by id ${id}`,
                data: error instanceof Error ? error.message : "unknow error"
               });
        }
 }

 export const registerUserController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
   const { name, email, birthdate, nDni, username, password } = req.body;
   try{
        const response = await createUserService({name, email, birthdate, nDni, username, password});
        res.status(201).json({
            message: "Register User Controller",
            data: response
            });
         } catch (error) {
             res.status(400).json({
                message: "Error registering user",
                data: error instanceof Error ? error.message : "unknow error"
            });
         }
 }

 export const loginUserController = async (req: Request<unknown, unknown, UserLoginDTO>, res: Response): Promise<void> => {
     const { username, password } = req.body;

     try{
        const response = await validateCredentialService(username, password);
        res.status(200).json({
            message: "Login User Controller",
            data: response
            });
         } catch (error) {
             res.status(400).json({
                message: "Error logging in user",
                data: error instanceof Error ? error.message : "unknow error"
            });
         }
 }