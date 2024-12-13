import { Request, Response, Router } from "express";
import { cancelAppointmentController, getAppointmentByIdController, getAppointmentsController, scheduleAppointmentController } from "../controllers/appointmentsController";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", (req: Request, res: Response) => getAppointmentsController(req, res));
appointmentsRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => getAppointmentByIdController(req, res));
appointmentsRouter.post("/schedule", (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response) => scheduleAppointmentController(req, res));
appointmentsRouter.put("/cancel/:id", (req: Request<{ id: string }>, res: Response) => cancelAppointmentController(req, res));

export default appointmentsRouter;