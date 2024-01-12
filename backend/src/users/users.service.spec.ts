import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const repoMock = {
      findOne: jest.fn(id => id),
      save: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findOneOrFail: jest.fn(),
      remove: jest.fn(),
      // Add other methods as needed
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repoMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user', async () => {
    const user = new User();
    jest.spyOn(repo, 'save').mockResolvedValue(user);
    expect(await service.create('username', 'password')).toEqual(user);
  });

  it('should return a user', async () => {
    const user = new User();
    jest.spyOn(repo, 'findOne').mockResolvedValue(user);
    expect(await service.findOne(1)).toEqual(user);
  });

  it('should return a user', async () => {
    const user = new User();
    jest.spyOn(repo, 'findOne').mockResolvedValue(user);
    expect(await service.findSingle('username')).toEqual(user);
  });

  it('should return an array of users', async () => {
    const result = [new User()];
    jest.spyOn(repo, 'find').mockResolvedValue(result);
    expect(await service.find('username')).toEqual(result);
  });

  it('should return a user', async () => {
    const user = new User();
    jest.spyOn(repo, 'save').mockResolvedValue(user);
    expect(await service.update(1, {})).toEqual(user);
  });

  it('should return undefined', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ raw: [], affected: 1 });
    expect(await service.remove(1)).toBeUndefined();
  });
});

