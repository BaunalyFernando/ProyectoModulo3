import { Request, Response, Router } from "express";
import { getUserByIdController, getUsersController, loginUserController, registerUserController } from "../controllers/usersController";
import { UserLoginDTO, UserRegisterDTO } from '../dtos/UserDTO';

const usersRouter: Router = Router();

usersRouter.get("/", (req: Request, res: Response) => getUsersController(req, res));
usersRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => getUserByIdController(req, res));
usersRouter.post("/register", (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) => registerUserController(req, res));
usersRouter.post("/login", (req: Request<unknown, unknown, UserLoginDTO>, res: Response) => loginUserController(req, res));

export default usersRouter;