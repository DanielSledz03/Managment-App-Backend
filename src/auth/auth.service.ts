import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterUserDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(dto: RegisterUserDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          name: dto.name,
          ...(dto.companyId && { company: { connect: { id: dto.companyId } } }),
        },
      });

      return this.signToken(user.id, user.email, user.isAdmin);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Email already in use');
      }
      throw new Error('Registration failed');
    }
  }

  async signin(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await argon.verify(user.hash, dto.password))) {
      throw new ForbiddenException('Invalid email or password');
    }

    return this.signToken(user.id, user.email, user.isAdmin);
  }

  private async signToken(userId: number, email: string, isAdmin: boolean) {
    const payload = { sub: userId, email, isAdmin };
    const secret = this.config.get<string>('JWT_SECRET');

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '5m',
      secret,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret,
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async getUserData(refreshToken: string) {
    const secret = this.config.get<string>('JWT_SECRET');

    try {
      const decoded = this.jwt.verify(refreshToken, { secret });
      const user = await this.prisma.user.findUnique({
        where: { email: decoded.email },
      });

      if (!user) throw new UnauthorizedException('User not found');

      delete user.hash;
      return { user };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async verifyToken(refreshToken: string) {
    const secret = this.config.get<string>('JWT_SECRET');

    try {
      this.jwt.verify(refreshToken, { secret });
      return { isValid: true };
    } catch {
      return { isValid: false };
    }
  }

  async refreshToken(token: string) {
    const secret = this.config.get<string>('JWT_SECRET');

    try {
      const decoded = this.jwt.verify(token, { secret });
      const user = await this.prisma.user.findUnique({
        where: { email: decoded.email },
      });

      if (!user) throw new UnauthorizedException('User not found');

      const payload = { username: user.name, sub: user.id };
      const newAccessToken = await this.jwt.signAsync(payload, {
        expiresIn: '5m',
        secret,
      });

      return { access_token: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async changePassword(dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('User not found');
    if (!(await argon.verify(user.hash, dto.oldPassword))) {
      throw new ForbiddenException('Invalid old password');
    }

    const hash = await argon.hash(dto.newPassword);
    await this.prisma.user.update({
      where: { email: dto.email },
      data: { hash },
    });

    return { message: 'Password changed successfully' };
  }
}
