 import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";

 export const getAppointmentsController = (req: Request, res: Response): void => {
     res.status(200).json({
        message: "Appointments Controller",
        data: []
        });
 }

 export const getAppointmentByIdController = (req: Request<{ id: string }>, res: Response): void => {

    const { id } = req.params;

     res.status(200).json({ 
        message: "Appointment By Id Controller" + id,
        data: {}
    });
 }

 export const scheduleAppointmentController = (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response) => {
     res.status(201).json({
        message: "Schedule Appointment Controller",
        data: []
        });
 }

 export const cancelAppointmentController = (req: Request<{ id: string }>, res: Response): void => {

    const { id } = req.params;
     res.status(200).json({
        message: "Cancel Appointment Controller" + id,
        data: {}
        });
 }