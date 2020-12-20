import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto, GetTasksFilterDto, UpdateTaskDto } from '@mono/api-interfaces';
import { TaskRepository } from './task.repository';
import { Task, User } from '@mono/entities'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}
    
  async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto);
  }

  async getUserTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getUserTasks(filterDto, user);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user }});
    if (!found) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
    return found;
  }
  
  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
  }
  
  async updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const found = await this.getTaskById(id, user);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }

    for (const key in updateTaskDto) {
      if (Object.prototype.hasOwnProperty.call(updateTaskDto, key)) {
        found[key] = updateTaskDto[key];        
      }
    }

    return await found.save();
  }
}
