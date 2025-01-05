 import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { cancelAppointmentService, createAppointmentService, getAppointmentByIdService, getAppointmentsService } from "../services/appointmentService";
import { catchErrors } from "../utils/catchErrors";

 const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
     
        const response = await getAppointmentsService();
           res.status(200).json({
            message: "All appointments",
            data: response
            });
 
}

 const getAppointmentByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {

    const { id } = req.params;

        const response = await getAppointmentByIdService(Number(id));
        res.status(200).json({ 
         message: `Appointment by id ${id}`,
         data: response
         });
     
 }

 const scheduleAppointmentController = async (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {

    const { date, time, userId } = req.body;
     
        const response = await createAppointmentService({date, time, userId});
        res.status(201).json({
            message: "Appointment scheduled successfully",
            data: response
            });

 }

 const cancelAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {

    const { id } = req.params;
    
        const response = await cancelAppointmentService(Number(id));
        res.status(200).json({
            message: `Appointment canceled successfully`,
            data: response
            });
 }

 const appointmentsControllers = {
      getAppointmentsController: catchErrors(getAppointmentsController),
      getAppointmentByIdController: catchErrors(getAppointmentByIdController),
      scheduleAppointmentController: catchErrors(scheduleAppointmentController),
      cancelAppointmentController: catchErrors(cancelAppointmentController)
 }

 export default appointmentsControllers;
      