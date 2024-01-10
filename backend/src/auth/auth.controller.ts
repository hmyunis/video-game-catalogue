import { Body, Controller, Post, Session, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from 'src/auth/dto/auth-credentials.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/user.entity';

@Controller()
@Serialize(AuthDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: AuthCredentialDto) {
    const user = await this.authService.signUp(body.username, body.password);
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: AuthCredentialDto) {
    const user = await this.authService.signIn(body.username, body.password);
    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: AuthCredentialDto) {
    return this.authService.update(parseInt(id), body.username, body.password);
  }
}
