import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { Request } from 'express';

@Injectable()
export class AtStratagy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    super({
      secretOrKey:
        '7ca75d77e5da99c62cf2ec9603cb9483e4afb394333a33f4881134a0eaaddc14f04bae88f3a8dfc593f770e1bdeed33ae197f1b496036a13793e43593431016',
      jwtFromRequest: ExtractJwt.fromExtractors([
        AtStratagy.extractJwt,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user = this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private static extractJwt(req: Request) {
    if (
      req.cookies &&
      'user_token' in req.cookies &&
      req.cookies.user_token.length > 0
    ) {
      return req.cookies.user_token;
    }
    return null;
  }
}
