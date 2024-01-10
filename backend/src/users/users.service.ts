import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
<<<<<<< HEAD
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
=======
  constructor(@InjectRepository(User) private repo: Repository<User>,
  private collectionsService: CollectionsService){}
>>>>>>> 83d783c5879dbcb71a83a5ea4e04e0463c97c604
  create(username: string, password: string) {
    const user = this.repo.create({ username, password });
    return this.repo.save(user);
  }
  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne({
      where: { id },
    });
  }

  findSingle(username: string) {
    if (!username) return null;
    return this.repo.findOne({
      where: { username },
    });
  }

  find(username: string) {
    return this.repo.find({ where: { username } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
