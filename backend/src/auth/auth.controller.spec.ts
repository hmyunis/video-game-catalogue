import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from '../auth/dto/auth-credentials.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            createUser: jest.fn().mockResolvedValue({}),
            signIn: jest.fn().mockResolvedValue('user_token'),
            signOut: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should create a user', async () => {
    const authCredentialsDto: AuthCredentialDto = { username: 'test', password: 'test' };
    const res = { cookie: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

    await controller.createUser(authCredentialsDto, res as any);

    expect(authService.createUser).toHaveBeenCalledWith(authCredentialsDto.username, authCredentialsDto.password);
  });

  it('should sign in a user', async () => {
    const authCredentialsDto: AuthCredentialDto = { username: 'test', password: 'test' };
    const res = { cookie: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

    await controller.signIn(authCredentialsDto, res as any);

    expect(authService.signIn).toHaveBeenCalledWith(authCredentialsDto.username, authCredentialsDto.password);
  });

  it('should sign out a user', async () => {
    const res = { clearCookie: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

    controller.signOut(res as any);

    expect(res.clearCookie).toHaveBeenCalledWith('user_token');
  });
});