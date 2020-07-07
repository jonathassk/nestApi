import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateClassDto } from './dto/create-task.dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks (): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById (@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask (@Body() createTaskDto: CreateClassDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }
}
