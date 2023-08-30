import User from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";


@Entity()
export default class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    taskName: string;

    @Column()
    taskDescription: string;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User
    
}