import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'ab40abd282e3544a59c517c690e96df74956e3124095142174fd1118a921c94a7815a408d6351d7eb9a7625b318b7a5160fc93441208b1c88ee9aa3ad9bef56',
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: any) {
    const { username } = payload;
    const user = this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }
    const refreshToken = req.get('Authorization').replace('Bearer ', '').trim();
    return {
      user,
      refreshToken,
    };
  }
}
