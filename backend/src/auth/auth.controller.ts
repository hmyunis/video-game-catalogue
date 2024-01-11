import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from '../auth/dto/auth-credentials.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthDto } from '../auth/dto/auth.dto';
import { SkipAuth } from '../users/decorators/SkipAuth.decorator';

@Controller()
@Serialize(AuthDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  createUser(@Body() body: AuthCredentialDto) {
    return this.authService.signIn(body.username, body.password);
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signIn(@Body() body: AuthCredentialDto) {
    return this.authService.signIn(body.username, body.password);
  }
}
