import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto, EditUserDto } from './dto';
import * as argon from 'argon2';

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

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!this.verifyHashedPassword(changePasswordDto.oldPassword, user.hash)) {
      throw new ForbiddenException('Old password is incorrect');
    }

    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new ForbiddenException('New passwords do not match');
    }

    const hashedNewPassword = await this.hashPassword(
      changePasswordDto.newPassword,
    );
    await this.prisma.user.update({
      where: { id: id },
      data: { hash: hashedNewPassword },
    });

    return HttpStatus.OK;
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = await argon.hash(password);
    return hash;
  }

  private async verifyHashedPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await argon.verify(hashedPassword, password);
  }
}
