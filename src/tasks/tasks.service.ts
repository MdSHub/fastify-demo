import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Task from './entities/task.entity';
import { And, Repository } from 'typeorm';
import User from 'src/users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { IdDto } from './dto/id-dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>,) { }
    private readonly task = [
        {
            taskName: 'task1',
            taskDescription: 'fastify-demo',
            userUserId: 3
        }
    ]
    async findAll(inputs: any) {
        const tasks = await this.tasksRepository.find({ where: { user: { id: inputs.sub } } });
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, inputs: any): Promise<Task> {
        const task_data = {
            taskName: createTaskDto.taskName,
            taskDescription: createTaskDto.taskDescription,
            user: inputs.sub
        }
        const task = this.tasksRepository.create(task_data);
        await this.tasksRepository.save(task);
        return task;
    }

    async findOneTask(id: number, inputs: any): Promise<Task> {
        console.log(inputs.sub);
        const task = await this.tasksRepository.findOne({ where: { id: id, user: { id: inputs.sub } } });

        if (!task) throw new NotFoundException(`Task with Id #${id} not found`);

        return task;
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto,inputs:any
    ) {
        
        const task = await this.tasksRepository.findOne({ where: { id: id, user: { id: inputs.sub } } });
        
        
        if (!task) throw new NotFoundException(`Task with Id #${id} not found`);
        
        Object.assign(task, updateTaskDto);
        await this.tasksRepository.save(task);

        return task;
    }

    async removeTask(id: number,inputs:any) {
        
        const deleted = await this.tasksRepository.delete({ id: id, user: { id: inputs.sub } });

        if (deleted.affected > 0) {
            return { message: 'Task deleted successfully' };
        
        }else{
            throw new NotFoundException(`Task with ID ${id}  not found`);
        }
       
      }

}
