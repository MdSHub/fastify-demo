import Task from "src/tasks/entities/task.entity";
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";



@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    userPass: string;

    @Column()
     email:string;

     @Column({ default: true })
     isActive: boolean; 
     
     @Column()
     role:number;

     @OneToMany(() => Task, (task) => task.user)
      tasks: Task[]
}