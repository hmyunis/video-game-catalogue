import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
    const result = await authService.signUp('test', 'test');

    expect(usersService.find).toHaveBeenCalledWith('test');
    expect(usersService.create).toHaveBeenCalledWith('test', expect.any(String));
    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 1, username: 'test' });
    expect(result).toEqual('test_token');
  });

  it('should not sign up a user if username is in use', async () => {
    jest.spyOn(usersService, 'find').mockResolvedValueOnce([{ id: 1, password: 'salt.hash' }]);

    await expect(authService.signUp('test', 'test')).rejects.toThrow(BadRequestException);
  });

  it('should sign in a user', async () => {
    jest.spyOn(usersService, 'find').mockResolvedValueOnce([{ id: 1, password: 'salt.hash' }]);

    const result = await authService.signIn('test', 'test');

    expect(usersService.find).toHaveBeenCalledWith('test');
    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 1, username: 'test' });
    expect(result).toEqual('test_token');
  });

  it('should not sign in a user if user not found', async () => {
    jest.spyOn(usersService, 'find').mockResolvedValueOnce([]);

    await expect(authService.signIn('test', 'test')).rejects.toThrow(NotFoundException);
  });

  it('should not sign in a user if password is wrong', async () => {
    jest.spyOn(usersService, 'find').mockResolvedValueOnce([{ id: 1, password: 'salt.wronghash' }]);

    await expect(authService.signIn('test', 'test')).rejects.toThrow(BadRequestException);
  });
});