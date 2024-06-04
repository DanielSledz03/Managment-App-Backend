import {
    ForbiddenException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ChangePasswordDto, EditUserDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SanitizedUser } from './types/sanitized-user.type';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getUser(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        this.sanitizeUser(user);
        return user;
    }

    async getAllUsers(): Promise<SanitizedUser[]> {
        const users = await this.prisma.user.findMany();

        if (users.length === 0) {
            throw new NotFoundException('Users not found');
        }

        return users.map((user) => this.sanitizeUser(user));
    }

    async editUser(id: number, body: EditUserDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.isAdmin) {
            throw new ForbiddenException('You cannot edit an admin');
        }

        const admin = await this.prisma.user.findUnique({
            where: { id: body.adminUserId, isAdmin: true },
        });

        if (!admin) {
            throw new ForbiddenException('Bad admin id');
        }

        await this.prisma.user.update({ where: { id }, data: body });
        return HttpStatus.OK;
    }

    async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isoldPasswordValid = await argon.verify(
            user.hash,
            changePasswordDto.oldPassword,
        );

        if (!isoldPasswordValid) {
            throw new ForbiddenException('Old password is incorrect');
        }

        if (
            changePasswordDto.newPassword !== changePasswordDto.confirmPassword
        ) {
            throw new ForbiddenException('New passwords do not match');
        }

        const hashedNewPassword = await argon.hash(
            changePasswordDto.newPassword,
        );

        await this.prisma.user.update({
            where: { id },
            data: { hash: hashedNewPassword },
        });

        return HttpStatus.OK;
    }

    async getUserAllEarningThisMonth(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        try {
            const [allUserShifts, allBonuses, allPenalties] = await Promise.all(
                [
                    this.prisma.shift.findMany({ where: { userId: id } }),
                    this.prisma.bonus.findMany({ where: { userId: id } }),
                    this.prisma.penalty.findMany({ where: { userId: id } }),
                ],
            );

            const isCurrentMonth = (date: Date) =>
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear;

            const userShiftsThisMonth = allUserShifts.filter((shift) =>
                isCurrentMonth(new Date(shift.startTime)),
            );

            const totalHours = userShiftsThisMonth.reduce((total, shift) => {
                const shiftDuration =
                    (new Date(shift.endTime).getTime() -
                        new Date(shift.startTime).getTime()) /
                    (1000 * 60 * 60);
                return total + shiftDuration;
            }, 0);

            const userBonusesThisMonth = allBonuses.filter((bonus) =>
                isCurrentMonth(new Date(bonus.createdAt)),
            );

            const userPenaltiesThisMonth = allPenalties.filter((penalty) =>
                isCurrentMonth(new Date(penalty.createdAt)),
            );

            const totalBonuses = userBonusesThisMonth.reduce(
                (total, bonus) => total + bonus.amount,
                0,
            );
            const totalPenalties = userPenaltiesThisMonth.reduce(
                (total, penalty) => total + penalty.amount,
                0,
            );

            const totalEarnings =
                totalHours * user.earningPerHour +
                totalBonuses -
                totalPenalties;

            return totalEarnings.toFixed(0);
        } catch (error) {
            throw new NotFoundException('Earning not found');
        }
    }

    async getUserAllShiftsThisMonth(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        try {
            const allUserShifts = await this.prisma.shift.findMany({
                where: { userId: id },
            });

            const isCurrentMonth = (date: Date) =>
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear;

            const userShiftsThisMonth = allUserShifts.filter((shift) =>
                isCurrentMonth(new Date(shift.startTime)),
            );

            const totalDurationInSeconds = userShiftsThisMonth
                .map((shift) => {
                    const shiftDuration =
                        (new Date(shift.endTime).getTime() -
                            new Date(shift.startTime).getTime()) /
                        1000;
                    return shiftDuration;
                })
                .reduce((total, duration) => total + duration, 0);

            const hours = Math.floor(totalDurationInSeconds / 3600);
            const minutes = Math.floor((totalDurationInSeconds % 3600) / 60);
            const seconds = Math.floor(totalDurationInSeconds % 60);

            return {
                hours: hours < 10 ? `0${hours}` : hours,
                minutes: minutes < 10 ? `0${minutes}` : minutes,
                seconds: seconds < 10 ? `0${seconds}` : seconds,
            };
        } catch (error) {
            throw new NotFoundException('Shifts not found');
        }
    }

    private sanitizeUser(user: User): SanitizedUser {
        const sanitizedUser = { ...user };
        delete sanitizedUser.hash;
        delete sanitizedUser.isAdmin;
        return sanitizedUser;
    }
}
