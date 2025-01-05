import { NextFunction, Request, Response, Router } from "express";
import appointmentsControllers from "../controllers/appointmentsController";
import { validateIdMiddleware, validateAppointmentDataMiddleware, checkAppointmentExistsMiddleware } from "../middlewares/appointmentMiddlewares";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";

const appointmentsRouter: Router = Router();


appointmentsRouter.get("/", (req: Request, res: Response, next: NextFunction) => appointmentsControllers.getAppointmentsController(req, res, next));


appointmentsRouter.get(
    "/:id",
    validateIdMiddleware,
    (req: Request<{ id: string }>, res: Response, next: NextFunction) => appointmentsControllers.getAppointmentByIdController(req, res, next)
);


appointmentsRouter.post(
    "/schedule",
    validateAppointmentDataMiddleware,
    (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response, next: NextFunction) => appointmentsControllers.scheduleAppointmentController(req, res, next)
);


appointmentsRouter.put(
    "/cancel/:id",
    validateIdMiddleware,
    checkAppointmentExistsMiddleware,
    (req: Request<{ id: string }>, res: Response, next: NextFunction) => appointmentsControllers.cancelAppointmentController(req, res, next)
);

export default appointmentsRouter;
