import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';

@Injectable()
export class WorkScheduleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createWorkSchedule(dto: CreateWorkScheduleDto) {
    try {
      const user = await this.userService.getUser(dto.userId);

      if (!user) {
        throw new Error('User not found');
      }

      console.log({ dto });

      return await this.prismaService.workSchedule.create({
        data: {
          user: {
            connect: {
              id: dto.userId,
            },
          },
          date: dto.date,
          startTime: dto.startTime,
          endTime: dto.endTime,
        },
      });
    } catch (error) {
      throw new Error('An error occurred while creating work schedule');
    }
  }

  async getWorkScheduleThisMonth(userId: number) {
    const thisMonth = new Date().getUTCMonth();

    const allUserWorkSchedules = await this.prismaService.workSchedule.findMany(
      {
        where: {
          userId: userId,
        },
      },
    );

    return allUserWorkSchedules.filter((workSchedule) => {
      console.log(new Date(workSchedule.date).getUTCMonth(), thisMonth);
      return new Date(workSchedule.date).getUTCMonth() === thisMonth;
    });
  }

  async getAllWorkSchedules() {
    return await this.prismaService.workSchedule.findMany();
  }

  async getWorkScheduleByDate(date: string) {
    try {
      const allSchedules = await this.getAllWorkSchedules();

      const schedulesInSpecificDate = allSchedules.filter((schedule) => {
        const scheduleDate = new Date(date);
        const scheduleDay = scheduleDate.getDate();
        const scheduleMonth = scheduleDate.getMonth();
        const scheduleYear = scheduleDate.getFullYear();

        return (
          schedule.date.getDate() === scheduleDay &&
          schedule.date.getMonth() === scheduleMonth &&
          schedule.date.getFullYear() === scheduleYear
        );
      });

      const c = await Promise.all(
        schedulesInSpecificDate.map(async (schedule) => {
          const userDa = await this.userService.getUser(schedule.userId);
          return {
            ...schedule,
            user: userDa,
          };
        }),
      );

      console.log({ c });
      return c;
    } catch (error) {
      throw new Error('An error occurred while retrieving work schedules');
    }
  }
}
