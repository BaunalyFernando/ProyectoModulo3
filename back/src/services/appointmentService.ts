import { AppointmentRegisterDTO, Status } from "../dtos/AppointmentDTO";
import { IAppointment } from "../interfaces/IAppointments";

const appointments: IAppointment[] = [
    {
        id: 1,
        date: new Date("2024-12-20"),
        time: new Date("2024-12-20T10:00:00"),
        status: Status.Active,
        userId: "1",
    },
    {
        id: 2,
        date: new Date("2024-12-21"),
        time: new Date("2024-12-21T15:30:00"),
        status: Status.Canceled,
        userId: "2",
    },
    {
        id: 3,
        date: new Date("2024-12-22"),
        time: new Date("2024-12-22T09:00:00"),
        status: Status.Canceled,
        userId: "1",
    },
];

export const getAppointmentsService = (): IAppointment[] => {
     return appointments;
}

export const getAppointmentByIdService = (id: number): IAppointment | null => {
    if(!id){
        throw new Error("Missing id");
        }
    
    const appointmentFound = appointments.find((appointment: IAppointment) => appointment.id === id);

    if(!appointmentFound){
         throw new Error("Appointment not found");
    }
    
    return appointmentFound ? appointmentFound : null;
}

export const createAppointmentService = (appointment: AppointmentRegisterDTO): void => {
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

    const newAppointment: IAppointment = {
        id: appointments.length + 1,
        date: appointment.date,
        time: appointment.time,
        status: Status.Active,
        userId: appointment.userId,
    }

    appointments.push(newAppointment);
}

export const cancelAppointmentService = (id: number): void => {
    if(!id){
        throw new Error("Missing id");
    }

    const appointmentFound = appointments.find((appointment: IAppointment) => appointment.id === id);

    if(!appointmentFound){
        throw new Error("Appointment not found");
    }

    appointmentFound.status = Status.Canceled;

}