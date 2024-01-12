import { EntityRepository, Repository } from 'typeorm';
import { Collection } from './collection.entity';

@EntityRepository(Collection)
export class CollectionsRepository extends Repository<Collection> {
  async createCollection(collection: Collection): Promise<Collection> {
    return this.save(collection);
  }

  async findCollection(id: number): Promise<Collection> {
    return this.findOne({ where: { id } });
  }

  async findAllCollections(): Promise<Collection[]> {
    return this.find();
  }

  async removeCollection(id: number): Promise<void> {
    await this.delete(id);
  }

  // Add similar methods for findUserGames, removeByThree, updateCollection
}