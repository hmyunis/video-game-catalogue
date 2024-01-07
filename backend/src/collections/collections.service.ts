import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection) private repo: Repository<Collection>,
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

  find(id: number) {
    return this.repo.find({ where: { id:id } });
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
}
