import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtStratagy } from './stratagy/jwt.stratagy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:
        '7ca75d77e5da99c62cf2ec9603cb9483e4afb394333a33f4881134a0eaaddc14f04bae88f3a8dfc593f770e1bdeed33ae197f1b496036a13793e43593431016',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtStratagy],
  exports: [jwtStratagy, PassportModule],
})
export class AuthModule {}
