import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AtStratagy } from './stratagy/at.stratagy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      global: true,
      secret:
        '7ca75d77e5da99c62cf2ec9603cb9483e4afb394333a33f4881134a0eaaddc14f04bae88f3a8dfc593f770e1bdeed33ae197f1b496036a13793e43593431016',
      signOptions: {
        expiresIn: 60 * 60 * 24,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStratagy],
  exports: [AtStratagy, PassportModule],
})
export class AuthModule {}
