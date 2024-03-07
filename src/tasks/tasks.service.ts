import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prismaService';
import { TasksDTO } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<TasksDTO[]> {
    const tasks = await this.prisma.task.findMany();
    return tasks;
  }

  async getTaskById(id: string): Promise<TasksDTO> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    return task;
  }

  async getTasksByTagId(tagId: string): Promise<TasksDTO[]> {
    const tasks: TasksDTO[] = await this.prisma.task.findMany({
      where: {
        tagId: tagId,
      },
    });
    return tasks;
  }

  async getTasksByStatus(isDone: string): Promise<TasksDTO[]> {
    var isDoneBoolean: boolean;
    if (isDone == 'true') {
      isDoneBoolean = true;
    } else if (isDone == 'false') {
      isDoneBoolean = false;
    } else {
      throw new BadRequestException(
        "isdone query should be either 'true' or 'false'",
      );
    }
    const tasks: TasksDTO[] = await this.prisma.task.findMany({
      where: {
        isDone: isDoneBoolean,
      },
    });

    return tasks;
  }

  async createTask(data: TasksDTO): Promise<TasksDTO> {
    if (data.isDone == null) {
      data.isDone = false;
    }
    const task = await this.prisma.task.create({
      data,
    });
    return task;
  }

  async updateTask(id: string, data: TasksDTO): Promise<TasksDTO> {
    var taskToUpdate: TasksDTO = await this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    if (taskToUpdate == undefined) {
      throw new NotFoundException(
        `Task with id: ${id} was not found in the database!`,
      );
    }

    var updatedTask = await this.prisma.task.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        isDone: data.isDone,
      },
    });

    return updatedTask;
  }

  async deleteTask(id: string): Promise<TasksDTO> {
    const existentTask: TasksDTO = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (existentTask == undefined) {
      throw new NotFoundException(
        `Task with id: ${id} was not found in the database!`,
      );
    }

    const deletedTask: TasksDTO = await this.prisma.task.delete({
      where: {
        id: id,
      },
    });

    return deletedTask;
  }

  async deleteAllDoneTasks(): Promise<void> {
    await this.prisma.task.deleteMany({
      where: {
        isDone: true,
      },
    });
    return;
  }

  async deleteAllTasks(): Promise<void> {
    await this.prisma.task.deleteMany();
    return;
  }
}
