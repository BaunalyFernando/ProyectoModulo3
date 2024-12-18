import { Request, Response, Router } from "express";
import { getUserByIdController, getUsersController, loginUserController, registerUserController } from "../controllers/usersController";
import { validateUserIdMiddleware, validateUserRegisterMiddleware, validateUserLoginMiddleware, checkUserExistsMiddleware } from "../middlewares/userMiddlewares";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO";

const usersRouter: Router = Router();


usersRouter.get("/", (req: Request, res: Response) => getUsersController(req, res));


usersRouter.get(
    "/:id",
    validateUserIdMiddleware,
    checkUserExistsMiddleware,
    (req: Request<{ id: string }>, res: Response) => getUserByIdController(req, res)
);


usersRouter.post(
    "/register",
    validateUserRegisterMiddleware,
    (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) => registerUserController(req, res)
);


usersRouter.post(
    "/login",
    validateUserLoginMiddleware,
    (req: Request<unknown, unknown, UserLoginDTO>, res: Response) => loginUserController(req, res)
);

export default usersRouter;
