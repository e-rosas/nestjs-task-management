import { TasksRepository } from './tasks.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneOrFail(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
  }

  /* private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = this.tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }
    return tasks;
  }

  updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto, id: string): Task {
    const { status } = updateTaskStatusDto;
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

   */
}
