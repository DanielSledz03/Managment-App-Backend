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
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.sanitizeUser(user);
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();

    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users.map(this.sanitizeUser);
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

    const isOldPasswordValid = await argon.verify(
      user.hash,
      changePasswordDto.oldPassword,
    );

    if (!isOldPasswordValid) {
      throw new ForbiddenException('Old password is incorrect');
    }

    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new ForbiddenException('New passwords do not match');
    }

    const hashedNewPassword = await argon.hash(changePasswordDto.newPassword);

    await this.prisma.user.update({
      where: { id },
      data: { hash: hashedNewPassword },
    });

    return HttpStatus.OK;
  }

  private sanitizeUser(user: any) {
    delete user.hash;
    delete user.isAdmin;
    return user;
  }
}
