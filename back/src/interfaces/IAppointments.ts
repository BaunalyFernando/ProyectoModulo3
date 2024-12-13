import { Status } from "../dtos/AppointmentDTO";

export interface IAppointment {
    id: number;
    date: Date;
    time: Date;
    status: Status;
    userId: string;
}