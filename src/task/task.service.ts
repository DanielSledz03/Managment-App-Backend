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

  async getAllTasks() {
    try {
      return await this.prisma.task.findMany();
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
      const user = await this.user.getUser(dto.userId);
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!user) throw new NotFoundException('User not found');

      if (!task) throw new NotFoundException('Task not found');

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
