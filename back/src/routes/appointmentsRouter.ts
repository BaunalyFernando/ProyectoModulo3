import { Router } from "express";
import { cancelAppointmentController, getAppointmentByIdController, getAppointmentsController, scheduleAppointmentController } from "../controllers/appointmentsController";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAppointmentsController);
appointmentsRouter.get("/:id", getAppointmentByIdController);
appointmentsRouter.post("/schedule", scheduleAppointmentController);
appointmentsRouter.post("/cancel", cancelAppointmentController);

export default appointmentsRouter;