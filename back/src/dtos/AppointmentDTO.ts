export interface AppointmentRegisterDTO {
    date: Date;
    time: Date;
    status: Status.Active;
    userId: string;
}

export enum Status {
    Active= "active",
    Canceled= "canceled"
}