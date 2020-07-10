import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor (@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  getTasks (filterDto: GetTasksFilterDto) {

  }

  async getTaskById(id: number) : Promise<Task>{
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`não exista a task com o id ${id}`)
    }
    return task;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`não existe a task com o id ${id}`)
    }
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: number) : Promise<void> {
    const task = await this.taskRepository.delete(id);
    if (task.affected == 0) {
      throw new NotFoundException(`task com o id: ${id} é inexistente`)
    }
  }
}
