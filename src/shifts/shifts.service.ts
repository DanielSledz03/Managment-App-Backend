import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { EditShiftDto } from './dto/edit-shift.dto';

@Injectable()
export class ShiftsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly user: UserService,
    ) {}

    async getShifts() {
        try {
            return await this.prisma.shift.findMany();
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while fetching shifts',
            );
        }
    }

    async createShift(dto: CreateShiftDto) {
        await this.ensureUserExists(dto.userId);
        try {
            return await this.prisma.shift.create({
                data: {
                    startTime: dto.startTime,
                    endTime: dto.endTime ?? new Date().toISOString(),
                    date: dto.date,
                    userId: dto.userId,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while creating shift',
            );
        }
    }

    async updateShift(dto: EditShiftDto) {
        try {
            return await this.prisma.shift.update({
                where: { id: dto.id },
                data: { endTime: dto.endTime },
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while updating shift',
            );
        }
    }

    async getUserAllShifts(id: number) {
        await this.ensureUserExists(id);
        try {
            return await this.prisma.shift.findMany({
                where: { userId: id },
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while fetching user shifts',
            );
        }
    }

    private async ensureUserExists(userId: number) {
        const user = await this.user.getUser(userId);
        if (user === null || user === undefined) {
            throw new NotFoundException(
                `User with ID ${userId.toString()} not found`,
            );
        }
    }

    async getUserMonthlyShifts(id: number, year: number, month: number) {
        await this.ensureUserExists(id);
        try {
            const shifts = await this.prisma.shift.findMany({
                where: {
                    userId: id,
                    date: {
                        gte: new Date(year, month, 1),
                        lt: new Date(year, month + 1, 1),
                    },
                },
            });

            return shifts;
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while fetching user monthly shifts',
            );
        }
    }

    async getUserTodayShifts(id: number) {
        await this.ensureUserExists(id);
        try {
            const today = new Date();
            const startOfDay = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
            );
            const endOfDay = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 1,
            );

            const shifts = await this.prisma.shift.findMany({
                where: {
                    userId: id,
                    date: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                },
            });

            return shifts;
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while fetching user today shifts',
            );
        }
    }
}
