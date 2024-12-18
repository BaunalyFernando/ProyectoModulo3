import { Equal } from 'typeorm';
import { AppointmentModel } from '../config/data-source';
import { AppointmentDTO, AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { UserDTO } from "../dtos/UserDTO";
import { Appointment } from "../entities/Appointment.entity";
import { IAppointment, Status } from "../interfaces/IAppointments";
import { getUserByIdService } from "./userService";

const appointments: IAppointment[] = [
    {
        id: 1,
        date: new Date("2024-12-20"),
        time: "10:00:00",
        status: Status.Active,
        userId: 1,
    },
    {
        id: 2,
        date: new Date("2024-12-21"),
        time: "10:00:00",
        status: Status.Cancelled,
        userId: 2,
    },
    {
        id: 3,
        date: new Date("2024-12-22"),
        time: "10:00:00",
        status: Status.Cancelled,
        userId: 1,
    },
];

let id: number = 1;

export const getAppointmentsService =  async (): Promise<AppointmentDTO[]> =>  {
    const appointments: Appointment[] = await AppointmentModel.find();
    return appointments;
}

export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
    if(!id){
        throw new Error("Missing id");
        }
    
    const appointmentFound = await AppointmentModel.findOneBy({id});

    if(!appointmentFound){
         throw new Error("Appointment not found");
    }
    
    return appointmentFound;
}

export const createAppointmentService = async (appointment: AppointmentRegisterDTO): Promise<Appointment> => {
    if(!appointment.date || !appointment.time || !appointment.userId){
        throw new Error("Missing appointment data");
    }

    const duplicate = await AppointmentModel.findOne({
        where: {
            user: { id: appointment.userId }, 
            date: Equal(appointment.date),     
            time: appointment.time,           
        },
        relations: ["user"], 
    });
    
    if (duplicate) {
        throw new Error("Appointment already exists for this date and time");
    }

    const user: UserDTO | null= await getUserByIdService(appointment.userId);

    if(!user){
        throw new Error("User not found");
    }

    const newAppointment = AppointmentModel.create({
        date: appointment.date,
        time: appointment.time,
        status: Status.Active,
        user: {id: appointment.userId},
    });

    return await AppointmentModel.save(newAppointment);
}

export const cancelAppointmentService = async (id: number): Promise<void> => {
    if(!id){
        throw new Error("Missing id");
    }

    const appointmentFound = await getAppointmentByIdService(id);

    if(!appointmentFound){
        throw new Error("Appointment not found");
    }

    appointmentFound.status = Status.Cancelled;
    
    await AppointmentModel.save(appointmentFound);

}