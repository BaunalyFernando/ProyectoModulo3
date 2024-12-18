import { Request, Response, Router } from "express";
import { 
    cancelAppointmentController, 
    getAppointmentByIdController, 
    getAppointmentsController, 
    scheduleAppointmentController 
} from "../controllers/appointmentsController";
import { validateIdMiddleware, validateAppointmentDataMiddleware, checkAppointmentExistsMiddleware } from "../middlewares/appointmentMiddlewares";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";

const appointmentsRouter: Router = Router();


appointmentsRouter.get("/", (req: Request, res: Response) => getAppointmentsController(req, res));


appointmentsRouter.get(
    "/:id",
    validateIdMiddleware,
    (req: Request<{ id: string }>, res: Response) => getAppointmentByIdController(req, res)
);


appointmentsRouter.post(
    "/schedule",
    validateAppointmentDataMiddleware,
    (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response) => scheduleAppointmentController(req, res)
);


appointmentsRouter.put(
    "/cancel/:id",
    validateIdMiddleware,
    checkAppointmentExistsMiddleware,
    (req: Request<{ id: string }>, res: Response) => cancelAppointmentController(req, res)
);

export default appointmentsRouter;
