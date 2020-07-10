import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStausValidationPipe } from './pipes/task-status-validation.pipes';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById (@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask (@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

/* @Get()
getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  console.log('filter', filterDto)
  if(Object.keys(filterDto).length) {
    return this.tasksService.getTaskWithFilter(filterDto)
  } else {
    return this.tasksService.getAllTasks()
  }
}





@Delete('/:id')
deleteTask (@Param('id') id: string) {
  this.tasksService.deleteTask(id);
}

@Patch('/:id/status')
updateTaskStatus (@Param('id') id: string, @Body('status', TaskStausValidationPipe) status: TaskStatus) {
  return this.tasksService.updateTaskStatus(id, status)
} */
}
