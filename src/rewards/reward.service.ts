import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AddBonusToUserDto } from './dto/add-bonus-to-user.dto';

@Injectable()
export class RewardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly user: UserService,
    ) {}

    async addBonusToUser(dto: AddBonusToUserDto) {
        const user = await this.user.getUser(dto.userId);

        if (user === null || user === undefined) {
            throw new NotFoundException('User not found');
        }

        try {
            return await this.prisma.bonus.create({
                data: {
                    amount: dto.amount,
                    description: dto.description,
                    user: {
                        connect: {
                            id: dto.userId,
                        },
                    },
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while adding bonus to user',
            );
        }
    }

    async getUserMonthlyBonuses(id: number) {
        const user = await this.user.getUser(id);

        if (user === null || user === undefined) {
            throw new NotFoundException('User not found');
        }

        try {
            const bonuses = await this.prisma.bonus.findMany({
                where: {
                    userId: id,
                    createdAt: {
                        gte: new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            1,
                        ),
                        lt: new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() + 1,
                            1,
                        ),
                    },
                },
            });

            return bonuses;
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while retrieving user bonuses',
            );
        }
    }

    async addPenaltyToUser(dto: AddBonusToUserDto) {
        const user = await this.user.getUser(dto.userId);

        if (user === null || user === undefined) {
            throw new NotFoundException('User not found');
        }

        try {
            return await this.prisma.penalty.create({
                data: {
                    amount: dto.amount,
                    description: dto.description,
                    user: {
                        connect: {
                            id: dto.userId,
                        },
                    },
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while adding penalty to user',
            );
        }
    }

    async getUserMonthlyPenalties(id: number) {
        const user = await this.user.getUser(id);

        if (user === null || user === undefined) {
            throw new NotFoundException('User not found');
        }

        try {
            const penalties = await this.prisma.penalty.findMany({
                where: {
                    userId: id,
                    createdAt: {
                        gte: new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            1,
                        ),
                        lt: new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() + 1,
                            1,
                        ),
                    },
                },
            });

            return penalties;
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while retrieving user penalties',
            );
        }
    }
}
