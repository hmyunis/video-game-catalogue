import { Expose } from 'class-transformer';
import { GameStatus } from '../collection.entity';

export class CollectionDto {
  @Expose()
  id: number;

  @Expose()
  status: GameStatus;

  @Expose()
  userId: number;

  @Expose()
  gameId: number;
}
