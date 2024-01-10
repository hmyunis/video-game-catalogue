import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class jwtStratagy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      secretOrKey: 'YouAreNotSupposedToHaveThis',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
}
