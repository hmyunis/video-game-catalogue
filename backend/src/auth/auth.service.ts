import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from '../users/users.service';
import { promisify } from 'util';
import { Response } from 'express';

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

    const payload = { sub: user.id, username: username };

    return await this.jwtService.signAsync(payload);
  }

  async createUser(username: string, password: string) {
    // Check if the username is already in use
    const users = await this.usersService.find(username);
    if (users.length) {
      throw new BadRequestException('username in use');
    }
  
    // Create a salt and hash the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
  
    // Combine the salt and the hash to store in the database
    const result = salt + '.' + hash.toString('hex');
  
    // Create the user and return the result
    return await this.usersService.create(username, result);
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

    const payload = { sub: user.id, username: username };

    return await this.jwtService.signAsync(payload);
  }
}
