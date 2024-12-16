import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { UserDTO } from "../dtos/UserDTO";
import { IAppointment, Status } from "../interfaces/IAppointments";
import { IUser } from "../interfaces/IUsers";
import { getUserByIdService } from "./userService";

const appointments: IAppointment[] = [
    {
        id: 1,
        date: new Date("2024-12-20"),
        time: new Date("2024-12-20T10:00:00"),
        status: Status.Active,
        userId: 1,
    },
    {
        id: 2,
        date: new Date("2024-12-21"),
        time: new Date("2024-12-21T15:30:00"),
        status: Status.Canceled,
        userId: 2,
    },
    {
        id: 3,
        date: new Date("2024-12-22"),
        time: new Date("2024-12-22T09:00:00"),
        status: Status.Canceled,
        userId: 1,
    },
];

let id: number = 1;

export const getAppointmentsService =  (): IAppointment[] =>  {
     return appointments.map((appointment: IAppointment) => ({
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        userId: appointment.userId
     }));
}

export const getAppointmentByIdService = (id: number): IAppointment | null => {
    if(!id){
        throw new Error("Missing id");
        }
    
    const appointmentFound = appointments.find((appointment: IAppointment) => appointment.id === id);

    if(!appointmentFound){
         throw new Error("Appointment not found");
    }
    
    return {
        id: appointmentFound.id,
        date: appointmentFound.date,
        time: appointmentFound.time,
        status: appointmentFound.status,
        userId: appointmentFound.userId
        };
}

export const createAppointmentService = async (appointment: AppointmentRegisterDTO): Promise<void> => {
    if(!appointment.date || !appointment.time || !appointment.userId){
        throw new Error("Missing appointment data");
    }

    const duplicate = appointments.find(
        (a) =>
            a.userId === appointment.userId &&
            a.date.getTime() === appointment.date.getTime() &&
            a.time.getTime() === appointment.time.getTime()
    );

    if (duplicate) {
        throw new Error("Appointment already exists for this date and time");
    }

    const user: UserDTO | null= await getUserByIdService(appointment.userId);

    if(!user){
        throw new Error("User not found");
    }

    const newAppointment: IAppointment = {
        id: id++,
        date: appointment.date,
        time: appointment.time,
        status: Status.Active,
        userId: user.id,
    }

    await appointments.push(newAppointment);
}

export const cancelAppointmentService = async (id: number): Promise<void> => {
    if(!id){
        throw new Error("Missing id");
    }

    const appointmentFound = await appointments.find((appointment: IAppointment) => appointment.id === id);

    if(!appointmentFound){
        throw new Error("Appointment not found");
    }

    appointmentFound.status = Status.Canceled;

}