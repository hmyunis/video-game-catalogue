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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { GameStatus } from './collection.entity';

@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Post('/new')
  @UseGuards(AuthGuard)
  createCollection(@Body() body: CreateCollectionDto) {
    return this.collectionsService.create(body);
  }

  @Get('/:id')
  async findCollection(@Param('id') id: string) {
    const collection = await this.collectionsService.findOne(parseInt(id));
    if (!collection) {
      throw new NotFoundException('collection not found');
    }
    return collection;
  }

  @Get()
  findAllCollections(@Query('status') status: GameStatus) {
    return this.collectionsService.find(status);
  }

  @Get('/:userId')
  findUserGames(
    @Param('userId') userId: string,
    @Query('status') status: GameStatus,
  ) {
    return this.collectionsService.getUserCollection(parseInt(userId), status);
  }

  @Delete('/:id')
  removeCollection(@Param('id') id: string) {
    return this.collectionsService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateCollection(@Param('id') id: string, @Body() body: CreateCollectionDto) {
    return this.collectionsService.update(parseInt(id), body);
  }
}
