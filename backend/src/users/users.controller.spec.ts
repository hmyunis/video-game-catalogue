import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ username: 'asdf', password: 'asdf' } as User);
      },
      find: (username: string) => {
        return Promise.resolve([{ username: 'asdf' }] as User[]);
      },
      remove: (id: number) => {
        const user = { id, username: 'asdf', password: 'asdf' } as User;
        return Promise.resolve(user);
      },
      update: (id: number, attributes: UpdateUserDto) => {
        const user = { ...attributes, id } as User;
        return Promise.resolve(user);
      },
    };
    fakeAuthService = {
      
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the current user', async () => {
    const user = { username: 'asdf', password: 'asdf' } as User;
    expect(await controller.whoAmI(user)).toEqual(user);
  });

  it('should find a user by id', async () => {
    const user = { username: 'asdf', password: 'asdf' } as User;
    expect(await controller.findUser('1')).toEqual(user);
  });

  it('should remove a user by id', async () => {
    fakeUsersService.remove = async (id: number) => {
      return { id, username: '', password: '', admin: false } as User;
    };
    expect(await controller.removeUser('1')).toEqual({ id: 1, username: '', password: '', admin: false });
  });

  it('should update a user', async () => {
    const updateUserDto = { username: 'updatedTest', password: 'updatedTest' };
    fakeUsersService.update = async (id: number, attributes: UpdateUserDto) => {
      return { ...updateUserDto, id } as User;
    };
    expect(await controller.updateUser('1', updateUserDto)).toEqual({ ...updateUserDto, id: 1 });
  });

  it('should sign out a user', () => {
    const session = { userId: 1 };
    controller.signOut(session);
    expect(session.userId).toBeNull();
  });
});