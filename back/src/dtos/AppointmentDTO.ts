export interface AppointmentRegisterDTO {
    date: Date;
    time: Date;
    userId: string;
}

export enum Status {
    Active= "active",
    Canceled= "canceled"
}