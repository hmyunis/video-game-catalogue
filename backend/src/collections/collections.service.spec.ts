import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionsService } from './collections.service';
import { Collection } from './collection.entity';
import { GamesService } from '../games/games.service';
import { Game } from '../games/game.entity';
import { GameStatus } from '../games/game-status.enum';

describe('CollectionsService', () => {
  let service: CollectionsService;
  let repo: Repository<Collection>;
  let gameRepo: Repository<Game>; // Assuming Game is an entity


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionsService,
        {
          provide: getRepositoryToken(Collection),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            remove: jest.fn(),
            create: jest.fn(),
            // ... other methods as needed
          },
        },
        GamesService,
        {
          provide: 'GameRepository',
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            remove: jest.fn(),
            create: jest.fn(),
            // ... other methods as needed
          },
        },
      ],
    }).compile();
  
    service = module.get<CollectionsService>(CollectionsService);
    repo = module.get<Repository<Collection>>(getRepositoryToken(Collection));
    gameRepo = module.get<Repository<Game>>('GameRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a collection', async () => {
    const result = new Collection();
    jest.spyOn(repo, 'save').mockResolvedValue(result);
    expect(await service.create({} as any)).toEqual(result);
  });

  it('should find one collection', async () => {
    const result = new Collection();
    jest.spyOn(repo, 'findOne').mockResolvedValue(result);
    expect(await service.findOne(1)).toEqual(result);
  });

  it('should find collections', async () => {
    const result = [new Collection()];
    jest.spyOn(repo, 'find').mockResolvedValue(result);
    expect(await service.find('status' as any)).toEqual(result);
  });

  

  it('should update a collection', async () => {
    const result = new Collection();
    jest.spyOn(repo, 'findOne').mockResolvedValue(result); // Make sure to return a Collection object
    jest.spyOn(repo, 'save').mockResolvedValue(result);
    expect(await service.update(1, {} as any)).toEqual(result);
  });

  it('should remove a collection', async () => {
    const result = new Collection();
    jest.spyOn(repo, 'findOne').mockResolvedValue(result); // Make sure to return a Collection object
    jest.spyOn(repo, 'remove').mockImplementation((entity) => {
      // Check the entity and return the result if it matches
      if (entity === result) {
        return Promise.resolve(entity);
      }
      return Promise.resolve(new Collection());
    });
    expect(await service.remove(1)).toEqual(result);
  });

  
});