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
  async createUser(@Body() body: AuthCredentialDto, @Session() session: any) {
    const user = await this.authService.signUp(body.username, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: AuthCredentialDto, @Session() session: any) {
    const user = await this.authService.signIn(body.username, body.password);
    session.userId = user.id;
    return user;
  }
}
