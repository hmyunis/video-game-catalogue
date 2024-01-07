import { Injectable, NotFoundException } from '@nestjs/common';
import { Game } from './game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(@InjectRepository(Game) private repo: Repository<Game>) {}

  create(gameDto: CreateGameDto) {
    const game = this.repo.create(gameDto);
    return this.repo.save(game);
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne({
      where: { id },
    });
  }

  find(title: string) {
    return this.repo.find({ where: { title } });
  }

  async update(id: number, attrs: Partial<Game>) {
    const game = await this.findOne(id);
    if (!game) {
      throw new NotFoundException('game not found');
    }
    Object.assign(game, attrs);
    return this.repo.save(game);
  }

  async remove(id: number) {
    const game = await this.findOne(id);
    if (!game) {
      throw new NotFoundException('game not found');
    }
    return this.repo.remove(game);
  }
}
