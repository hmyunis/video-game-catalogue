import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, password: string) {
    const users = await this.usersService.find(username);
    if (users.length) {
      throw new BadRequestException('username in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.usersService.create(username, result);
    return await this.getTokens({ username });
  }

  async signIn(username: string, password: string) {
    const [user] = await this.usersService.find(username);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }

    const payload = { username: username };
    return await this.getTokens(payload);
  }

  async getTokens(payload: { username: string }) {
    const [accessToken, RefreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret:
          '7ca75d77e5da99c62cf2ec9603cb9483e4afb394333a33f4881134a0eaaddc14f04bae88f3a8dfc593f770e1bdeed33ae197f1b496036a13793e43593431016',
        expiresIn: 60 * 15,
      }),
      this.jwtService.signAsync(payload, {
        secret:
          'ab40abd282e3544a59c517c690e96df74956e3124095142174fd1118a921c94a7815a408d6351d7eb9a7625b318b7a5160fc93441208b1c88ee9aa3ad9bef56',
        expiresIn: 60 * 60 * 24,
      }),
    ]);
    return { accessToken: accessToken, RefreshToken: RefreshToken };
  }
}
