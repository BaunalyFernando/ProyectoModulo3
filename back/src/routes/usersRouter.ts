import { NextFunction, Request, Response, Router } from "express";
import  usersControllers  from "../controllers/usersController";
import { validateUserIdMiddleware, validateUserRegisterMiddleware, validateUserLoginMiddleware, checkUserExistsMiddleware } from "../middlewares/userMiddlewares";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO";

const usersRouter: Router = Router();


usersRouter.get("/", (req: Request, res: Response, next: NextFunction) => usersControllers.getUsersController(req, res, next));


usersRouter.get(
    "/:id",
    validateUserIdMiddleware,
    checkUserExistsMiddleware,
    (req: Request<{ id: string }>, res: Response, next: NextFunction) => usersControllers.getUserByIdController(req, res, next)
);


usersRouter.post(
    "/register",
    validateUserRegisterMiddleware,
    (req: Request<unknown, unknown, UserRegisterDTO>, res: Response, next: NextFunction) => usersControllers.registerUserController(req, res, next)
);


usersRouter.post(
    "/login",
    validateUserLoginMiddleware,
    (req: Request<unknown, unknown, UserLoginDTO>, res: Response, next: NextFunction) => usersControllers.loginUserController(req, res, next)
);

export default usersRouter;
