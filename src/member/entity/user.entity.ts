import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    // @Column()
    // lastLogin: Date;
}