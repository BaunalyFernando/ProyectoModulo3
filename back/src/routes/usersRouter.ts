import { Router } from "express";
import { getUserByIdController, getUsersController, loginUserController, registerUserController } from "../controllers/usersController";

const usersRouter: Router = Router();

usersRouter.get("/", getUsersController);
usersRouter.get("/:id", getUserByIdController);
usersRouter.post("/register", registerUserController);
usersRouter.post("/login", loginUserController);

export default usersRouter;