import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateClassDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    console.log('filter', filterDto)
    if(Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilter(filterDto)
    } else {
      return this.tasksService.getAllTasks()
    }
  }

  @Get('/:id')
  getTaskById (@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask (@Body() createTaskDto: CreateClassDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask (@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus (@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksService.updateTaskStatus(id, status)
  }



}
