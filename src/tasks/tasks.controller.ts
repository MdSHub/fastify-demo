import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post ,Req,Request,
    Res,
    Response,ValidationPipe,
    UseGuards, 
    NotFoundException,
    Put,
    Delete} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../users/user.guard';
import { request } from 'http';
import { CreateTaskDto } from './dto/create-task.dto';
import { IdDto } from './dto/id-dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService:TasksService) {}

    @UseGuards(AuthGuard)
    @Get()
    getAllTask(
        @Request() req,
    ) {
        console.log(req.user);
        return this.tasksService.findAll(req.user);
    }


    @UseGuards(AuthGuard)
    @Post()
    addTask(@Body() CreateTaskDto: CreateTaskDto,@Request() req) {
        const task =  this.tasksService.createTask(CreateTaskDto,req.user);
        return task;
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getOneTask(@Param('id')  id: number,@Request() req) {
        console.log(id);
        
        if(id <=0 || Number.isNaN(id) ){
            throw new NotFoundException(`Invalid task id`);
        }
      return this.tasksService.findOneTask(id,req.user);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    updateTask(
      @Param('id') id: number,
      @Body() updateTaskDto: UpdateTaskDto,
      @Request() req
    ) {
        if(id <=0 || Number.isNaN(id) ){
            throw new NotFoundException(`Invalid task id`);
        }
      return this.tasksService.updateTask(id, updateTaskDto,req.user);
    }


    @UseGuards(AuthGuard)
    @Delete(':id')
    removeTask(@Param('id') id: number, @Request() req): any {
      return this.tasksService.removeTask(id,req.user);
    }

}
