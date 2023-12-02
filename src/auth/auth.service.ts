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

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // This method is used to register a new user.
  async signup(dto: RegisterUserDto) {
    try {
      // Hash the password using argon2.
      const hash = await argon.hash(dto.password);
      console.log(dto);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          name: dto.name,
          ...(dto.companyId !== undefined
            ? { company: { connect: { id: dto.companyId } } }
            : {}),
        },
      });

      return this.signToken(user.id, user.email, user.isAdmin);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      }
      throw new Error('Registration failed');
    }
  }

  // This method is used to login a user or admin.
  async signin(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Invalid email or password');

    return this.signToken(user.id, user.email, user.isAdmin);
  }

  async signToken(
    userId: number,
    email: string,
    isAdmin: boolean,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      sub: userId,
      email,
      isAdmin,
    };
    const secret = this.config.get('JWT_SECRET');

    try {
      const accessToken = await this.jwt.signAsync(payload, {
        expiresIn: '5m',
        secret: secret,
      });

      const refreshToken = await this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: secret,
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new Error('Could not sign refresh token');
    }
  }

  async getUserData(refreshToken: string) {
    const secret = this.config.get('JWT_SECRET');

    console.log(refreshToken);

    try {
      const decoded = this.jwt.verify(refreshToken, { secret: secret });
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      delete user.hash;

      return {
        user: user,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async verifyToken(refreshToken: string) {
    try {
      const secret = this.config.get('JWT_SECRET');

      this.jwt.verify(refreshToken, { secret: secret });

      return { isValid: true };
    } catch (error) {
      return { isValid: false };
    }
  }

  async refreshToken(token: string) {
    const secret = this.config.get('JWT_SECRET');

    try {
      const decoded = this.jwt.verify(token, { secret: secret });
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const payload = { username: user.name, sub: user.id };
      const newAccessToken = await this.jwt.signAsync(payload, {
        expiresIn: '5m',
        secret: secret,
      });

      return {
        access_token: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
