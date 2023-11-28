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

  async getAllTasks(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (user.isAdmin) {
        return await this.prisma.task.findMany();
      } else {
        return await this.prisma.task.findMany({
          where: { userId: id },
        });
      }
    } catch (error) {
      throw new Error('An error occurred while retrieving the tasks');
    }
  }

  async getTask(id: number) {
    try {
      return await this.prisma.task.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  async getTasksByUserId(id: number) {
    console.log({ id });
    try {
      const user = await this.user.getUser(id);
      if (!user) throw new NotFoundException('User not found');
    } catch (error) {
      throw error;
    }

    try {
      const tasks = await this.prisma.task.findMany({
        where: { userId: id },
      });

      if (tasks.length === 0) throw new NotFoundException('Tasks not found');
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  async createTask(dto: CreateTaskDto) {
    try {
      const user = await this.user.getUser(dto.userId);

      if (!user.isAdmin) {
        return await this.prisma.task.create({
          data: {
            title: dto.title,
            description: dto.description,
            isCompleted: dto.isCompleted ?? false, // Provide a default value if dto.isCompleted is undefined
            user: {
              connect: {
                id: dto.userId,
              },
            },
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id: number, dto: EditTaskDto) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) throw new NotFoundException('Task not found');
      const user = await this.user.getUser(task.userId);

      if (!user.isAdmin) {
        return await this.prisma.task.update({
          where: { id },
          data: {
            title: dto.title ?? task.title,
            description: dto.description ?? task.description,
            isCompleted: dto.isCompleted ?? task.isCompleted,
            user: {
              connect: {
                id: dto.userId ?? task.userId,
              },
            },
          },
        });
      } else {
        throw new ForbiddenException('Admin cannot have tasks');
      }
    } catch (error) {
      throw error;
    }
  }
}
