import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class GetTasksUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<Task[]> {
    return await this.prismaService.task.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }
}
