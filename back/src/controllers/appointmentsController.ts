 import { Request, Response } from "express";

 export const getAppointmentsController = (req: Request, res: Response) => {
     res.send("Appointments Controller");
 }

 export const getAppointmentByIdController = (req: Request, res: Response) => {
     res.send("Appointment By Id Controller");
 }

 export const scheduleAppointmentController = (req: Request, res: Response) => {
     res.send("Schedule Appointment Controller");
 }

 export const cancelAppointmentController = (req: Request, res: Response) => {
     res.send("Cancel Appointment Controller");
 }