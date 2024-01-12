import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from '../auth/dto/auth-credentials.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller()
@Serialize(AuthDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async createUser(@Body() body: AuthCredentialDto, @Res() res: Response) {
    res.cookie(
      'user_token',
      await this.authService.createUser(body.username, body.password),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(
    @Body() body: AuthCredentialDto,
    @Res({ passthrough: true }) res,
  ) {
    res.cookie(
      'user_token',
      await this.authService.signIn(body.username, body.password),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signout')
  signOut(@Res({ passthrough: true }) res) {
    res.clearCookie('user_token');
  }
}
