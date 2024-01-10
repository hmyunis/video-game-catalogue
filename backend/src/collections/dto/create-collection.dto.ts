import { IsEnum, IsNumber } from "class-validator";
import { GameStatus } from "../collection.entity";
export class CreateCollectionDto {
  @IsEnum(GameStatus)
  status: GameStatus;

  @IsNumber()
  gameId: number;

  @IsNumber()
  userId: number;
}