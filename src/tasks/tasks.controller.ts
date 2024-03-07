import { Controller, Get, Post, Patch, Body, HttpException, HttpStatus, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDTO } from './dto/tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(@Query('isdone') isDone: string) : Promise<TasksDTO[]> {
    if (isDone == undefined) {
      return await this.tasksService.getAllTasks();
    }

    return await this.tasksService.getTasksByStatus(isDone);
    
  }

  @Get('tag/:tagId')
  async getTasksByTagId(@Param('tagId') tagId: string) : Promise<TasksDTO[]> {
    return await this.tasksService.getTasksByTagId(tagId);
  }

  @Get(':id')
  async getTaskById(@Param('id') id : string) : Promise<TasksDTO> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() data: TasksDTO) : Promise<TasksDTO> {
    try {
      return await this.tasksService.createTask(data);
    } catch (error) {
      throw new HttpException(`Failed to create task: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() data: TasksDTO) : Promise<TasksDTO> {
    try {
      return await this.tasksService.updateTask(id, data);
    } catch (error) {
      throw new HttpException(`Failed to update task: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllTasks() {
    return await this.tasksService.deleteAllTasks();
  }

  @Delete('clear-done')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllDoneTasks() {
    return await this.tasksService.deleteAllDoneTasks();
  }

  @Delete(':id') 
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.tasksService.deleteTask(id);
    } catch (error) {
      throw new HttpException(`Failed to delete task: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


}
