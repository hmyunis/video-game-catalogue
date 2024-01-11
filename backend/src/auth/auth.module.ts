import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AtStratagy } from './stratagy/at.stratagy';
import { RtStrategy } from './stratagy/rt.stratagy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStratagy, RtStrategy],
  exports: [AtStratagy, RtStrategy, PassportModule],
})
export class AuthModule {}
