import { Injectable } from '@nestjs/common';
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

  getShifts() {
    return this.prisma.shift.findMany();
  }

  async createShift(dto: CreateShiftDto) {
    await this.ensureUserExists(dto.userId);
    return this.prisma.shift.create({
      data: {
        startTime: dto.startTime,
        endTime: dto.endTime ?? new Date().toISOString(),
        date: dto.date,
        userId: dto.userId,
      },
    });
  }

  updateShift(dto: EditShiftDto) {
    return this.prisma.shift.update({
      where: { id: dto.id },
      data: { endTime: dto.endTime },
    });
  }

  async getUserAllShifts(id: number) {
    await this.ensureUserExists(id);
    const shifts = await this.prisma.shift.findMany({
      where: { userId: id },
    });

    return shifts;
  }

  private async ensureUserExists(userId: number) {
    const user = await this.user.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
  }

  async getUserMonthlyShifts(id: number, year: number, month: number) {
    await this.ensureUserExists(id);
    const shifts = await this.prisma.shift.findMany({
      where: {
        userId: id,
      },
    });

    const monthlyShifts = shifts.filter((shift) => {
      const shiftDate = new Date(shift.date);
      return (
        shiftDate.getFullYear() === year && shiftDate.getUTCMonth() === month
      );
    });

    return monthlyShifts;
  }

  async getUserTodayShifts(id: number) {
    await this.ensureUserExists(id);
    const shifts = await this.prisma.shift.findMany({
      where: {
        userId: id,
      },
    });

    const currentDate = new Date();

    const todayDay =
      currentDate.getDate().toString() +
      currentDate.getMonth().toString() +
      currentDate.getFullYear().toString();

    const todayShifts = shifts.filter((shift) => {
      const shiftDate = new Date(shift.date);
      const shiftDay =
        shiftDate.getDate().toString() +
        shiftDate.getMonth().toString() +
        shiftDate.getFullYear().toString();
      console.log(todayDay, shiftDay);
      return todayDay === shiftDay;
    });

    return todayShifts;
  }
}
