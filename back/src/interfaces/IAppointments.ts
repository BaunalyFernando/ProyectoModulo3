
export interface IAppointment {
    id: number;
    date: Date;
    time: String;
    status: Status;
    userId: number;
}

export enum Status {
    Active= "active",
    Cancelled= "cancelled"
}