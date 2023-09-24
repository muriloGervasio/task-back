import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GetTasksUseCase } from '../usecase/get-tasks.use-case';
import { Task } from '@prisma/client';
import { CreateTaskDto } from '../port/in/create-task.dto';
import { PrismaService } from 'src/core/prisma.service';
import { UpdateTaskDto } from '../port/in/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(
    private readonly getTasksUseCase: GetTasksUseCase,
    private prismaService: PrismaService,
  ) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.getTasksUseCase.execute();
  }

  @Get(':id')
  async getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    const task = await this.prismaService.task.findFirst({ where: { id } });
    if (!task) throw new NotFoundException();
    return task;
  }

  @Post()
  createTask(@Body() body: CreateTaskDto): Promise<Task> {
    return this.prismaService.task.create({
      data: {
        name: body.name,
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.prismaService.task.delete({
      where: {
        id: id,
      },
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    await this.prismaService.task.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });
  }
}
