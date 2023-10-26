import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEarningDto } from './dto';

@Injectable()
export class EarningsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllEarnings() {
    try {
      return await this.prisma.earning.findMany();
    } catch (error) {
      throw new Error('An error occurred while retrieving the earnings');
    }
  }

  async getEarning(id: number) {
    try {
      return await this.prisma.earning.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Earning not found');
    }
  }

  async createEarning(dto: CreateEarningDto) {
    try {
      return await this.prisma.earning.create({
        data: {
          month: dto.month,
          year: dto.year,
          hoursWorked: dto.hoursWorked,
          earned: dto.earned,
          user: {
            connect: {
              id: dto.userId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateEarning(id: number, dto: CreateEarningDto) {
    console.log(id);
    try {
      const earning = await this.getEarning(id);

      if (!earning) throw new NotFoundException('Earning not found');

      return await this.prisma.earning.update({
        where: { id },
        data: {
          month: dto.month ?? earning.month,
          year: dto.year ?? earning.year,
          hoursWorked: dto.hoursWorked ?? earning.hoursWorked,
          earned: dto.earned ?? earning.earned,
          user: {
            connect: {
              id: dto.userId ?? earning.userId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
