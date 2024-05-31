import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
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
        const user = await this.userService.getUser(dto.userId);

        if (user === null || user === undefined) {
            throw new NotFoundException('User not found');
        }

        try {
            return await this.prismaService.workSchedule.create({
                data: {
                    user: { connect: { id: dto.userId } },
                    date: dto.date,
                    startTime: dto.startTime,
                    endTime: dto.endTime,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while creating work schedule',
            );
        }
    }

    async getWorkScheduleThisMonth(userId: number) {
        const thisMonth = new Date().getUTCMonth();

        try {
            const allUserWorkSchedules =
                await this.prismaService.workSchedule.findMany({
                    where: { userId },
                });

            return allUserWorkSchedules.filter(
                (workSchedule) =>
                    new Date(workSchedule.date).getUTCMonth() === thisMonth,
            );
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while retrieving work schedules for this month',
            );
        }
    }

    async getAllWorkSchedules() {
        try {
            return await this.prismaService.workSchedule.findMany();
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while retrieving all work schedules',
            );
        }
    }

    async getWorkScheduleByDate(date: string) {
        try {
            const scheduleDate = new Date(date);
            const scheduleDay = scheduleDate.getDate();
            const scheduleMonth = scheduleDate.getMonth();
            const scheduleYear = scheduleDate.getFullYear();

            const allSchedules = await this.getAllWorkSchedules();

            const schedulesInSpecificDate = allSchedules.filter(
                (schedule) =>
                    schedule.date.getDate() === scheduleDay &&
                    schedule.date.getMonth() === scheduleMonth &&
                    schedule.date.getFullYear() === scheduleYear,
            );

            const schedulesWithUser = await Promise.all(
                schedulesInSpecificDate.map(async (schedule) => {
                    const user = await this.userService.getUser(
                        schedule.userId,
                    );
                    return { ...schedule, user };
                }),
            );

            return schedulesWithUser;
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while retrieving work schedules for the specified date',
            );
        }
    }
}
