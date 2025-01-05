
import { AppointmentModel } from '../config/data-source';
import { AppointmentDTO, AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { Appointment } from "../entities/Appointment.entity";
import { getUserByIdService } from "./userService";
import AppointmentsRepository from '../repositories/Appointment.Repository';
import { Status } from '../interfaces/IAppointments';
import { CustomError } from '../utils/customError';

export const getAppointmentsService =  async (): Promise<Appointment[]> =>  {
    const appointments =  await AppointmentModel.find();
    
    if(appointments.length > 0) return appointments;
    else throw new CustomError(404,"No appointments found");
}

export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {   
    const appointmentFound = await AppointmentsRepository.findOne({
        where: { id }
    });

    if(!appointmentFound){
        throw new CustomError(404,"Appointment not found");
    }
    else return appointmentFound;
}

export const createAppointmentService = async (appointment: AppointmentRegisterDTO): Promise<Appointment> => {

    await getUserByIdService(appointment.userId);

    AppointmentsRepository.validateAllowAppointment(appointment.date, appointment.time);
    AppointmentsRepository.validateExistingAppointment(appointment.userId, appointment.date, appointment.time);

    const newAppointment = AppointmentsRepository.create({
        date: appointment.date,
        time: appointment.time,
        user: { id: appointment.userId },
    })


    return await AppointmentsRepository.save(newAppointment);
    
}

export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
    if(!id){
        throw new CustomError(404,"Missing id");
    }

    const appointmentFound = await getAppointmentByIdService(id);

    if(!appointmentFound){
        throw new CustomError(404,`Appointment with id ${id} was not found`);
    }

    appointmentFound.status = Status.Cancelled;
    
    return await AppointmentModel.save(appointmentFound);
}