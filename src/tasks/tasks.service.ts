import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateClassDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { filter } from 'rxjs/operators';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks
  }

  createTask(createTaskDto: CreateClassDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }

  updateTaskStatus (id: string, status: TaskStatus): Task  {
    const task = this.getTaskById(id)
    console.log(task, 'task')
    console.log('status', status)
    task.status = status;
    return task
  }

  getTaskWithFilter (filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks()
    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }
    if (search) {
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    }
    return tasks
  }
}
