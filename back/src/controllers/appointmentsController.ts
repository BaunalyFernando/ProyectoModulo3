 import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { cancelAppointmentService, createAppointmentService, getAppointmentByIdService, getAppointmentsService } from "../services/appointmentService";

 export const getAppointmentsController = (req: Request, res: Response): void => {
     try{
        const response = getAppointmentsService();
           res.status(200).json({
            message: "Appointments Controller",
            data: response
            });
         } catch (error) {
             res.status(400).json({
                message: "Error getting appointments",
                data: error
                 });
   }
}

 export const getAppointmentByIdController = (req: Request<{ id: string }>, res: Response): void => {

    const { id } = req.params;

    try{
        const response = getAppointmentByIdService(Number(id));
        res.status(200).json({ 
         message: "Appointment By Id Controller" + id,
         data: response
         });
     } catch (error) {
        res.status(400).json({
            message: "Error getting appointment by id",
            data: error
     });
    
   }
     
 }

 export const scheduleAppointmentController = (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response) => {

    const { date, time, userId } = req.body;
     try{
        const response = createAppointmentService({date, time, userId});
        res.status(201).json({
            message: "Schedule Appointment Controller",
            data: response
            });
         } catch (error) {
             res.status(400).json({
                message: "Error scheduling appointment",
                data: error
            });
         }

 }

 export const cancelAppointmentController = (req: Request<{ id: string }>, res: Response): void => {

    const { id } = req.params;
    try{
        const response = cancelAppointmentService(Number(id));
        res.status(200).json({
            message: "Cancel Appointment Controller" + id,
            data: response
            });
     } catch (error) {
        res.status(400).json({
            message: `Error canceling appointment with id ${id}` ,
            data: error
        });
   }
 }