import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { config } from '../../config';

export const AUTH_HEADER = 'X-Inevitable-Auth-Key';
const JWT_SECRET = config.JWT_SECRET;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super();
  }

  async validate(request: Request) {
    const token = (request.headers[AUTH_HEADER.toLowerCase()] ?? '') as string;
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      jwt.verify(token, JWT_SECRET);
      const payload = jwt.decode(token) as JwtPayload;

      if (!payload.sub) {
        throw new BadRequestException('InvalidPayload');
      }

      return payload.sub;
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new BadRequestException('InvalidJSONObject');
      } else if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('ExpiredToken');
      } else if (e instanceof JsonWebTokenError) {
        throw new BadRequestException(e.message); // invalid signature | invalid token
      }

      throw e;
    }
  }
}
