import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksDTO } from './dto/tasks.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateTask', () => {
    it('Should throw HttpException, bad request, task not found in the database', async () => {
      let mockData: TasksDTO = { "name": "Hello" };
      
      // Expect the mock to throw an HttpException
      expect(async () => await controller.updateTask("1", mockData))
        .rejects
        .toThrow(HttpException);

      // Alternatively, if you want to assert on the status code as well
      await expect(controller.updateTask("1", mockData))
        .rejects
        .toEqual(expect.objectContaining({
          status: HttpStatus.BAD_REQUEST,
          message: 'Task not found',
        }));
    });
  });
});
