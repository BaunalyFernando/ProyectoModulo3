import { Column, Entity, PrimaryGeneratedColumn, JoinColumn,  ManyToOne } from "typeorm";
import { User } from "./User.entity";
import { Status } from "../interfaces/IAppointments";

@Entity({ name: 'appointments' })
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { type: "date", nullable: false})
    date: Date;
    @Column( { type: "varchar", length: 5, nullable: false})
    time: string;
    @Column( { type: "varchar", length: 10, nullable: false, default: Status.Active})
    status: Status;
    
   @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn()
    user: User;

};