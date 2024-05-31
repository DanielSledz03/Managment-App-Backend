import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UserService,
  ) {}

  async getAllTasks(userId: number) {
    const user = await this.user.getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isAdmin) {
      return this.prisma.task.findMany();
    } else {
      return this.prisma.task.findMany({
        where: { userId },
      });
    }
  }

  async getTask(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async getTasksByUserId(userId: number) {
    const user = await this.user.getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tasks = await this.prisma.task.findMany({
      where: { userId },
    });

    if (tasks.length === 0) {
      throw new NotFoundException('Tasks not found');
    }

    return tasks;
  }

  async createTask(dto: CreateTaskDto) {
    const user = await this.user.getUser(dto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isAdmin) {
      return this.prisma.task.create({
        data: {
          title: dto.title,
          description: dto.description,
          status: dto.status ?? 'inprogress',
          user: {
            connect: {
              id: dto.userId,
            },
          },
        },
      });
    } else {
      throw new ForbiddenException('Admin cannot create tasks');
    }
  }

  async updateTask(id: number, dto: EditTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const user = await this.user.getUser(task.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isAdmin) {
      return this.prisma.task.update({
        where: { id },
        data: {
          title: dto.title ?? task.title,
          description: dto.description ?? task.description,
          status: dto.status ?? task.status,
          user: {
            connect: {
              id: dto.userId ?? task.userId,
            },
          },
        },
      });
    } else {
      throw new ForbiddenException('Admin cannot update tasks');
    }
  }
}
