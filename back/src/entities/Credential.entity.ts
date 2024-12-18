import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./User.entity";

@Entity({ name: 'credentials' })
export class Credential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", length: 255, unique: true, nullable: false})
    username: string;

    @Column({type:"varchar", length: 255, nullable: false})
    password: string;

    
    @OneToOne(() => User)
    @JoinColumn()
    user: User;
};