import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from 'src/auth/dto/auth-credentials.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthDto } from './dto/auth.dto';

@Controller()
@Serialize(AuthDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() body: AuthCredentialDto) {
    return this.authService.signIn(body.username, body.password);
  }

  @Post('/signin')
  signIn(@Body() body: AuthCredentialDto) {
    return this.authService.signIn(body.username, body.password);
  }
}
