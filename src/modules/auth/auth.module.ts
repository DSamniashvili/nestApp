import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpBearerStrategy } from './http-bearer.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpBearerStrategy],
})
export class AuthModule {}
