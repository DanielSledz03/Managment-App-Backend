// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as admin from 'firebase-admin';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'PLACEHOLDER_SECRET', // TUTAJ: placeholder
    });
  }

  async validate(payload: any) {
    // Weryfikacja tokenu z Firebase
    const decodedToken = await admin.auth().verifyIdToken(payload.token);
    return { userId: decodedToken.uid };
  }
}
