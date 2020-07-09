import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor (@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

  async getTaskById(id: number) : Promise<Task>{
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`não exista a task com o id ${id}`)
    }
    return task;
  }
}

  /*getAllTasks(): Task[] {
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
    const task = this.tasks.find(task => task.id === id);
    if(!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  deleteTask(id: string): void {
    const task = this.getTaskById(id)
    this.tasks = this.tasks.filter(task => task.id !== id)
  }

  updateTaskStatus (id: string, status: TaskStatus): Task  {
    const task = this.getTaskById(id)
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
  } */

