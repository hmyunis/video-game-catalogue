import { Expose, Transform } from 'class-transformer';
import { Game } from 'src/games/game.entity';

export class CollectionDto {
  @Expose()
  id: number;

  @Expose()
  playedGames: Game[];

  @Expose()
  playingGames: Game[];

  @Expose()
  plannedGames: Game[];
}
