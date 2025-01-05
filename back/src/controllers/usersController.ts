 import { Request, Response } from "express";
import { UserLoginDTO, UserLoginSucessDto, UserRegisterDTO } from "../dtos/UserDTO";
import { createUserService, getUserByIdService, getUsersService, loginUserService } from "../services/userService";
import { catchErrors } from "../utils/catchErrors";
 
 const getUsersController = async (req: Request, res: Response): Promise<void> => {
     
        const response = await getUsersService();
        res.status(200).json({
            message: "list of users",
            data: response
       });

 }

 const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
   const { id } = req.params;

  
        const response = await getUserByIdService(Number(id));
        res.status(200).json(
            response
        );
  
 }

 const registerUserController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
   const { name, email, birthdate, nDni, username, password } = req.body;
   
        const response = await createUserService({name, email, birthdate, nDni, username, password});
        res.status(201).json({
            message: "User registered successfully",
            });
         
 }

 const loginUserController = async (req: Request<unknown, unknown, UserLoginDTO>, res: Response): Promise<void> => {
     const { username, password } = req.body;

     
        const response: UserLoginSucessDto | null = await loginUserService(username, password);
        res.status(200).json({
            message: "User logged in successfully",
            data: response
            });
 }

 const userControllers = {
    getUsersController: catchErrors(getUsersController),
    getUserByIdController: catchErrors(getUserByIdController),
    registerUserController: catchErrors(registerUserController),
    loginUserController: catchErrors(loginUserController),
 }

 export default userControllers;