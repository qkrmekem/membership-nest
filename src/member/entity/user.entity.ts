import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "./role.entity";

@Entity()
@Unique(['id'])
export class User{
    @PrimaryGeneratedColumn()
    userSeq: number;

    @Column()
    id: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @ManyToMany(() => Role,(role) => role.roleId, {eager: true})
    @JoinTable()
    role: Role[];

    // @Column()
    // lastLogin: Date;
}