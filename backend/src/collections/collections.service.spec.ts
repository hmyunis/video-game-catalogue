import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsService } from './collections.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Collection, GameStatus } from './collection.entity';
import { Repository } from 'typeorm';
import { GamesService } from '../games/games.service';

describe('CollectionsService', () => {
  let service: CollectionsService;
  let repo: Repository<Collection>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionsService,
        {
          provide: getRepositoryToken(Collection),
          useClass: Repository,
        },
        GamesService,
      ],
    }).compile();

    service = module.get<CollectionsService>(CollectionsService);
    repo = module.get<Repository<Collection>>(getRepositoryToken(Collection));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a collection', async () => {
    const collectionDto = { status: GameStatus.PLAYING, gameId: 1, userId: 1 };
    const collection = new Collection();
    collection.id = 1;
    collection.status = GameStatus.PLAYING;
    collection.gameId = 1;
    collection.userId = 1;

    jest.spyOn(repo, 'create').mockReturnValue(collection);
    jest.spyOn(repo, 'save').mockResolvedValue(collection);

    expect(await service.create(collectionDto)).toEqual(collection);
  });

  it('should find one collection', async () => {
    const id = 1;
    const collection = new Collection();
    collection.id = 1;
    collection.status = GameStatus.PLAYING;
    collection.gameId = 1;
    collection.userId = 1;

    jest.spyOn(repo, 'findOne').mockResolvedValue(collection);

    expect(await service.findOne(id)).toEqual(collection);
  });
  

  it('should find all collections', async () => {
    const status = GameStatus.PLAYING;
    const collection = new Collection();
    collection.id = 1;
    collection.status = GameStatus.PLAYING;
    collection.gameId = 1;
    collection.userId = 1;

    jest.spyOn(repo, 'find').mockResolvedValue([collection]);

    expect(await service.find(status)).toEqual([collection]);
  });
});
  
