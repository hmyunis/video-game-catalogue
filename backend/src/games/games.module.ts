import { Module } from '@nestjs/common';
import { Game } from './game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    controllers: [GamesController],
    providers: [GamesService],
    exports: [GamesService]
})
export class GamesModule {}
