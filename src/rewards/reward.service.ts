import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AddBonusToUserDto } from './dto/add-bonus-to-user.dto';

@Injectable()
export class RewardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UserService,
  ) {}

  async addBonusToUser(dto: AddBonusToUserDto) {
    try {
      const user = await this.user.getUser(dto.userId);

      if (!user) {
        throw new Error('User not found');
      }

      return this.prisma.bonus.create({
        data: {
          amount: dto.amount,
          date: dto.date,
          description: dto.description,
          user: {
            connect: {
              id: dto.userId,
            },
          },
        },
      });
    } catch (error) {
      throw new Error('An error occurred while adding bonus to user');
    }
  }

  async getUserMonthlyBonuses(id: number) {
    try {
      const user = await this.user.getUser(id);

      if (!user) {
        throw new Error('User not found');
      }

      const bonuses = await this.prisma.bonus.findMany({
        where: {
          userId: id,
        },
      });

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      return bonuses.filter((bonus) => {
        return (
          new Date(bonus.createdAt).getMonth() === currentMonth &&
          new Date(bonus.createdAt).getFullYear() === currentYear
        );
      });
    } catch (error) {
      throw new Error('An error occurred while retrieving user bonuses');
    }
  }

  async addPenaltyToUser(dto: AddBonusToUserDto) {
    try {
      const user = await this.user.getUser(dto.userId);

      if (!user) {
        throw new Error('User not found');
      }

      return this.prisma.penalty.create({
        data: {
          amount: dto.amount,
          date: dto.date,
          description: dto.description,
          user: {
            connect: {
              id: dto.userId,
            },
          },
        },
      });
    } catch (error) {
      throw new Error('An error occurred while adding penalty to user');
    }
  }

  async getUserMonthlyPenalties(id: number) {
    try {
      const user = await this.user.getUser(id);

      if (!user) {
        throw new Error('User not found');
      }

      const penalties = await this.prisma.penalty.findMany({
        where: {
          userId: id,
        },
      });

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      return penalties.filter((penalty) => {
        return (
          new Date(penalty.createdAt).getMonth() === currentMonth &&
          new Date(penalty.createdAt).getFullYear() === currentYear
        );
      });
    } catch (error) {
      throw new Error('An error occurred while retrieving user penalties');
    }
  }
}
