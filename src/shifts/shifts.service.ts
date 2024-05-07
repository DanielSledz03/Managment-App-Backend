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

  async getShifts() {
    return await this.prisma.shift.findMany();
  }

  async createShift(dto: CreateShiftDto) {
    const user = await this.user.getUser(dto.userId);

    if (!user) {
      throw new Error('User not found');
    }

    return await this.prisma.shift.create({
      data: {
        startTime: dto.startTime,
        endTime: dto.endTime ?? new Date().toISOString(),
        date: dto.date,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async updateShift({ id, endTime }: EditShiftDto) {
    try {
      const shift = await this.prisma.shift.update({
        where: {
          id,
        },
        data: {
          endTime: endTime,
        },
      });

      if (!shift) {
        throw new Error('Shift not found');
      }

      return shift;
    } catch (error) {
      throw new Error('Shift not found');
    }
  }
}
