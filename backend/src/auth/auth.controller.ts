import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
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
  createUser(@Body() body: AuthCredentialDto, @Res({ passthrough: true }) res) {
    res.cookie(
      {
        user_token: this.authService.signUp(body.username, body.password),
      },
      { expires: 60 * 60 * 24 },
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signIn(@Body() body: AuthCredentialDto, @Res({ passthrough: true }) res) {
    res.cookie(
      {
        user_token: this.authService.signIn(body.username, body.password),
      },
      { expires: 60 * 60 * 24 },
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signout')
  signOut(@Res({ passthrough: true }) res) {
    res.cookie('user_token', { expires: 0 });
  }
}
