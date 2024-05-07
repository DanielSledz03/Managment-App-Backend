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
    if (shifts.length === 0) {
      throw new Error(`No shifts found for user ID ${id}`);
    }
    return shifts;
  }

  private async ensureUserExists(userId: number) {
    const user = await this.user.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
  }
}
