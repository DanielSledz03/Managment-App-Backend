import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
