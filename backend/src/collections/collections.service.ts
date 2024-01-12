import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection, GameStatus } from './collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { GamesService } from '../games/games.service';
import { Game } from '../games/game.entity';

@Injectable()
export class CollectionsService {
  public async createCollection(dto: CreateCollectionDto): Promise<Collection> {
    // Implementation here...
    return null; // Replace null with the actual implementation
  }
  constructor(
    @InjectRepository(Collection) private repo: Repository<Collection>,
    private gamesService: GamesService,
  ) {}

  create(collectionDto: CreateCollectionDto) {
    const collection = this.repo.create(collectionDto);
    return this.repo.save(collection);
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne({
      where: { id },
    });
  }

  find(status: GameStatus) {
    return this.repo.find({ where: { status } });
  }

  async getUserCollection(userId: number, status: GameStatus) {
    const collections = await this.repo.find({ where: { userId, status } });
    const gameIds = collections.map((col) => col.gameId);

    return gameIds;
  }

  async update(id: number, attrs: Partial<Collection>) {
    const collection = await this.findOne(id);
    if (!collection) {
      throw new NotFoundException('collection not found');
    }
    Object.assign(collection, attrs);
    return this.repo.save(collection);
  }

  async remove(id: number) {
    const collection = await this.findOne(id);
    if (!collection) {
      throw new NotFoundException('collection not found');
    }
    return this.repo.remove(collection);
  }

  async removeByThree(status: GameStatus, gameId: number, userId: number) {
    const theCollection = await this.repo.find({
      where: { status, gameId, userId },
    });
    const collectionId = await theCollection[0].id;
    const collection = await this.findOne(collectionId);
    return this.repo.remove(collection);
  }
}
