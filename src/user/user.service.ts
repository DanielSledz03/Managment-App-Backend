import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
          isAdmin: false,
        },
      });

      delete user.hash;
      delete user.isAdmin;

      return user;
    } catch (error) {
      throw new Error('An error occurred while retrieving the user');
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        where: { isAdmin: false },
      });

      const newUsers = users.map((user) => {
        delete user.hash;
        delete user.isAdmin;
        return user;
      });

      return newUsers;
    } catch (error) {
      throw new Error('An error occurred while retrieving the users');
    }
  }

  async editUser(id: number, body: EditUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.isAdmin) {
        throw new ForbiddenException('You cannot edit an admin');
      }

      const admins = await this.prisma.user.findMany({
        where: { isAdmin: true },
      });

      if (
        admins.filter((admin) => admin.id === body.adminUserId).length === 0
      ) {
        throw new ForbiddenException('Bad admin id');
      }

      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: body,
      });

      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }
}
