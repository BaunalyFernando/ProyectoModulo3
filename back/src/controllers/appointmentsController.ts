 import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { cancelAppointmentService, createAppointmentService, getAppointmentByIdService, getAppointmentsService } from "../services/appointmentService";

 export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
     try{
        const response = await getAppointmentsService();
           res.status(200).json({
            message: "All appointments",
            data: response
            });
         } catch (error) {
             res.status(400).json({
                message: "Error getting appointments",
                data: error instanceof Error ? error.message : "unknown error"
                 });
   }
}

 export const getAppointmentByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {

    const { id } = req.params;

    try{
        const response = await getAppointmentByIdService(Number(id));
        res.status(200).json({ 
         message: `Appointment by id ${id}`,
         data: response
         });
     } catch (error) {
        res.status(400).json({
            message: `Error getting appointment with id ${id}`,
            data: error instanceof Error ? error.message : "unknown error"
     });
    
   }
     
 }

 export const scheduleAppointmentController = async (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {

    const { date, time, userId } = req.body;
     try{
        const response = await createAppointmentService({date, time, userId});
        res.status(201).json({
            message: "Schedule Appointment",
            data: response
            });
         } catch (error) {
             res.status(400).json({
                message: "Error scheduling appointment",
                data: error instanceof Error ? error.message : "unknown error"
            });
         }

 }

 export const cancelAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {

    const { id } = req.params;
    try{
        const response = await cancelAppointmentService(Number(id));
        res.status(200).json({
            message: `Cancel appointment with id ${id}`,
            data: response
            });
     } catch (error) {
        res.status(400).json({
            message: `Error canceling appointment with id ${id}` ,
            data: error instanceof Error ? error.message : "unknownn error"
        });
   }
 }