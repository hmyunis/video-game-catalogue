import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesService } from './games.service';
import { AtGuard } from 'src/guards/at.guard';
import { IsAdmin } from 'src/users/decorators/isAdmin.decorator';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post('/new')
  @UseGuards(AtGuard)
  createGame(@Body() body: CreateGameDto, @IsAdmin() isAdmin: Boolean) {
    return isAdmin
      ? this.gamesService.create(body)
      : new UnauthorizedException('You are not the admin');
  }

  @Get('/:id')
  async findGameById(@Param('id') id: string) {
    const game = await this.gamesService.findOne(parseInt(id));
    if (!game) {
      throw new NotFoundException('game not found');
    }
    return game;
  }

  @Get()
  findAllGames(@Query('genre') genre: string) {
    return this.gamesService.find(genre);
  }

  @Get('/search/:keyword')
  searchGames(@Param() keyword: string) {
    return this.gamesService.findGames(keyword);
  }

  @Delete('/:id')
  @UseGuards(AtGuard)
  removeGame(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    return isAdmin
      ? this.gamesService.remove(parseInt(id))
      : new UnauthorizedException('You are not the admin');
  }

  @Patch('/:id')
  @UseGuards(AtGuard)
  updateGame(
    @Param('id') id: string,
    @Body() body: CreateGameDto,
    @IsAdmin() isAdmin: boolean,
  ) {
    return isAdmin
      ? this.gamesService.update(parseInt(id), body)
      : new UnauthorizedException('You are not the admin');
  }
}
