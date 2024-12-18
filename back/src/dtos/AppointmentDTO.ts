import { User } from "../entities/User.entity";
import { Status } from "../interfaces/IAppointments";

export interface AppointmentRegisterDTO {
    date: Date;
    time: string;
    userId: number;
}

export interface AppointmentDTO {
    id: number;
    date: Date;
    time: String;
    status: Status;
    user: User;
}
