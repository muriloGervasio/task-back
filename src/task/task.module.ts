import { Module } from '@nestjs/common';
import { TaskController } from './contoller/task.controller';
import { GetTasksUseCase } from './usecase/get-tasks.use-case';

@Module({
  controllers: [TaskController],
  providers: [GetTasksUseCase],
})
export class TaskModule {}
