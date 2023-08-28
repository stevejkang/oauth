import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './domain/JwtStrategy';

@Module({
  imports: [PassportModule],
  controllers: [],
  providers: [JwtStrategy],
})
export class AuthModule {}
