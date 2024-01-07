import { IsArray } from "class-validator";
import { Game } from "src/games/game.entity";
export class CreateCollectionDto {
  @IsArray()
  playedGames: Game[];

  @IsArray()
  playingGames: Game[];

  @IsArray()
  plannedGames: Game[];
}