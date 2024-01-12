import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Repository } from 'typeorm';

describe('GamesService', () => {
  let service: GamesService;
  let repo: Repository<Game>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: getRepositoryToken(Game),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    repo = module.get<Repository<Game>>(getRepositoryToken(Game));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a game', async () => {
      const game = { title: 'Test Game' } as any;
      const spyCreate = jest.spyOn(repo, 'create').mockReturnValue(game);
      const spySave = jest.spyOn(repo, 'save').mockResolvedValue(game);
      expect(await service.create(game)).toEqual(game);
      expect(spyCreate).toHaveBeenCalledWith(game);
      expect(spySave).toHaveBeenCalledWith(game);
    });
  });
  
  describe('findOne', () => {
    it('should find one game', async () => {
      const game = { id: 1 } as any;
      const spy = jest.spyOn(repo, 'findOne').mockResolvedValue(game);
      expect(await service.findOne(game.id)).toEqual(game);
      expect(spy).toHaveBeenCalledWith({ where: { id: game.id } });
    });
  });

  describe('find', () => {
    it('should find games by genre', async () => {
      const game = { genre: 'Test Genre' } as any;
      const spy = jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve([game]));
      expect(await service.find(game.genre)).toEqual([game]);
      expect(spy).toHaveBeenCalledWith({ where: { genre: game.genre } });
    });
  });
  
  describe('findGames', () => {
    it('should find games by keyword', async () => {
      const game = { title: 'Test Game' } as any;
      const spy = jest.spyOn(service, 'find').mockImplementation(() => Promise.resolve([game]));
      expect(await service.findGames('Test')).toEqual([game]);
      expect(spy).toHaveBeenCalledWith('');
    });
  });
  
  describe('update', () => {
    it('should update a game', async () => {
      const game = { id: 1, title: 'Test Game' } as any;
      const updatedGame = { id: 1, title: 'Updated Game' } as any;
      const spyFindOne = jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(game));
      const spySave = jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(updatedGame));
      expect(await service.update(game.id, { title: 'Updated Game' })).toEqual(updatedGame);
      expect(spyFindOne).toHaveBeenCalledWith(game.id);
      expect(spySave).toHaveBeenCalledWith(updatedGame);
    });
  });
  
  describe('remove', () => {
    it('should remove a game', async () => {
      const game = { id: 1 } as any;
      const spyFindOne = jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(game));
      const spyRemove = jest.spyOn(repo, 'remove').mockImplementation(() => Promise.resolve(game));
      expect(await service.remove(game.id)).toEqual(game);
      expect(spyFindOne).toHaveBeenCalledWith(game.id);
      expect(spyRemove).toHaveBeenCalledWith(game);
    });
  });

});