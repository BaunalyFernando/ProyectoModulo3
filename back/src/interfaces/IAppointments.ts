
export interface IAppointment {
    id: number;
    date: Date;
    time: Date;
    status: Status;
    userId: number;
}

export enum Status {
    Active= "active",
    Canceled= "canceled"
}