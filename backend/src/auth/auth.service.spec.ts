import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({ id: 1, password: 'salt.hash' }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('test_token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should sign up a user', async () => {
    const username = 'test';
    const password = 'test';
    const result = await authService.signUp(username, password);
  
    expect(usersService.create).toHaveBeenCalledWith(username, expect.any(String));
    expect(result).toEqual('test_token'); // expect a token instead of a user object
  });

  it('should not sign up a user if username is in use', async () => {
    jest.spyOn(usersService, 'find').mockResolvedValueOnce([{
      id: 1, 
      password: 'salt.hash',
      username: 'test',
      admin: false,
      joinDate: new Date().toDateString().substring(4),
      setJoinDate: jest.fn(),
      logInsert: jest.fn(),
      logUpdate: jest.fn(),
      logRemove: jest.fn(),
    }]);

    await expect(authService.signUp('test', 'test')).rejects.toThrow(BadRequestException);
  });

  it('should sign in a user', async () => {
    const password = 'test';
    const salt = randomBytes(8).toString('hex');
    const hash = (await scryptAsync(password, salt, 32)) as Buffer;

    jest.spyOn(usersService, 'find').mockResolvedValueOnce([{
      id: 1, 
      password: `${salt}.${hash.toString('hex')}`,
      username: 'test',
      admin: false,
      joinDate: new Date().toDateString().substring(4),
      setJoinDate: jest.fn(),
      logInsert: jest.fn(),
      logUpdate: jest.fn(),
      logRemove: jest.fn(),
    }]);

    const result = await authService.signIn('test', password);

    expect(usersService.find).toHaveBeenCalledWith('test');
    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 1, username: 'test' });
    expect(result).toEqual('test_token');
  });

  it('should not sign in a user if password is wrong', async () => {
    jest.spyOn(usersService, 'find').mockResolvedValueOnce([{
      id: 1, 
      password: 'salt.hash',
      username: 'test',
      admin: false,
      joinDate: new Date().toDateString().substring(4),
      setJoinDate: jest.fn(),
      logInsert: jest.fn(),
      logUpdate: jest.fn(),
      logRemove: jest.fn(),
    }]);

    await expect(authService.signIn('test', 'test')).rejects.toThrow(BadRequestException);
  });
});