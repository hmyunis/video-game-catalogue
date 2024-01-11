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
import { AuthCredentialDto } from 'src/auth/dto/auth-credentials.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthDto } from './dto/auth.dto';

@Controller()
@Serialize(AuthDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async createUser(
    @Body() body: AuthCredentialDto,
    @Res({ passthrough: true }) res,
  ) {
    res.cookie(
      'user_token',
      await this.authService.signUp(body.username, body.password),
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
