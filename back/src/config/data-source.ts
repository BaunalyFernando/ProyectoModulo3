import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import { Appointment } from "../entities/Appointment.entity";
import { Credential } from "../entities/Credential.entity";
import { PASSWORD } from "../config/env";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: PASSWORD,
    database: "demo_typeorm2",
    synchronize: true,
    logging: false,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
})