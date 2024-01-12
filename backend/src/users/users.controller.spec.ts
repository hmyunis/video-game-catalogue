import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // adjust the path according to your project structure
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(new User()),
            save: jest.fn().mockResolvedValue(new User()),
            findOne: jest.fn().mockResolvedValue(new User()),
            find: jest.fn().mockResolvedValue([new User()]),
            remove: jest.fn().mockResolvedValue(new User()),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should create a user', async () => {
    const user = await service.create('test', 'test');
    expect(repo.create).toBeCalledWith({ username: 'test', password: 'test' });
    expect(repo.save).toBeCalledWith(expect.any(Promise));
    expect(user).toEqual(new User());
  });

  it('should find one user by id', async () => {
    const user = await service.findOne(1);
    expect(repo.findOne).toBeCalledWith({ where: { id: 1 } });
    expect(user).toEqual(new User());
  });

  it('should find one user by username', async () => {
    const user = await service.findSingle('test');
    expect(repo.findOne).toBeCalledWith({ where: { username: 'test' } });
    expect(user).toEqual(new User());
  });

  it('should find users by username', async () => {
    const users = await service.find('test');
    expect(repo.find).toBeCalledWith({ where: { username: 'test' } });
    expect(users).toEqual([new User()]);
  });

  it('should update a user', async () => {
    const user = new User();
    user.id = 1;
    user.username = 'test';
    user.password = 'test';

    jest.spyOn(service, 'findOne').mockResolvedValue(user);
    const updatedUser = await service.update(1, { username: 'updatedTest', password: 'test' });

    expect(service.findOne).toBeCalledWith(1);
    expect(repo.save).toBeCalledWith({ ...user, username: 'updatedTest', password: 'test' });
    expect(updatedUser).toEqual(new User());
  });

  it('should remove a user', async () => {
    const user = new User();
    user.id = 1;
    user.username = 'test';
    user.password = 'test';

    jest.spyOn(service, 'findOne').mockResolvedValue(user);
    const removedUser = await service.remove(1);

    expect(service.findOne).toBeCalledWith(1);
    expect(repo.remove).toBeCalledWith(user);
    expect(removedUser).toEqual(new User());
  });
});