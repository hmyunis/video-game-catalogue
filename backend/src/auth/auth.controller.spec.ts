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
            signIn: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const authCredentialsDto: AuthCredentialDto = { username: 'test', password: 'test' };
    await controller.createUser(authCredentialsDto);
    expect(authService.signIn).toHaveBeenCalledWith(authCredentialsDto.username, authCredentialsDto.password);
  });
  
  it('should sign in a user', async () => {
    const authCredentialsDto: AuthCredentialDto = { username: 'test', password: 'test' };
    await controller.signIn(authCredentialsDto);
    expect(authService.signIn).toHaveBeenCalledWith(authCredentialsDto.username, authCredentialsDto.password);
  });
});