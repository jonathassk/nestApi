import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor (@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  async getTaskById(id: number) : Promise<Task>{
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`não exista a task com o id ${id}`)
    }
    return task;
  }

  async deleteTask(id: number) : Promise<void> {
    const task = await this.taskRepository.delete(id);
    if (task.affected == 0) {
      throw new NotFoundException(`task com o id: ${id} é inexistente`)
    }
  }
}

  /*getAllTasks(): Task[] {
    return this.tasks
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

