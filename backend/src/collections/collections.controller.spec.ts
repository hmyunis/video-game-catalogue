import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsService } from './collections.service';
import { CollectionsRepository } from './collections.repository'; // Make sure this path is correct
import { CreateCollectionDto } from './dto/create-collection.dto';
import { Collection } from './collection.entity';
import { GameStatus } from '../games/game-status.enum';
import { GamesService } from '../games/games.service';
import { Game } from '../games/game.entity';
import { CollectionsController } from './collections.controller';

describe('CollectionsController', () => {
  let controller: CollectionsController;
  let service: CollectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionsController],
      providers: [
        {
          provide: CollectionsService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            getUserCollection: jest.fn(),
            remove: jest.fn(),
            removeByThree: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CollectionsController>(CollectionsController);
    service = module.get<CollectionsService>(CollectionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a collection', async () => {
    const dto: CreateCollectionDto = { status: GameStatus.PLAYING, gameId: 1, userId: 1 };
    const result: Collection = { id: 1, status: GameStatus.PLAYING, gameId: 1, userId: 1, logInsert: jest.fn(), logUpdate: jest.fn(), logRemove: jest.fn() };
    jest.spyOn(service, 'create').mockResolvedValueOnce(result);
    expect(await controller.createCollection(dto)).toBe(result);
  });
  
  it('should find a collection', async () => {
    const id = '1';
    const result: Collection = { id: 1, status: GameStatus.PLAYING, gameId: 1, userId: 1, logInsert: jest.fn(), logUpdate: jest.fn(), logRemove: jest.fn() };
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(result);
    expect(await controller.findCollection(id)).toBe(result);
  });
});