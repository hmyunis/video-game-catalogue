import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { JwtService } from '@nestjs/jwt';
import { CreateGameDto } from './dto/create-game.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';


// Mock the GamesService
const mockGamesService = {
  create: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  findGames: jest.fn(),
  remove: jest.fn(),
  update: jest.fn(),
};

// Mock the JwtService
const mockJwtService = {
  sign: jest.fn(),
};

describe('GamesController', () => {
  let controller: GamesController;
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        {
          provide: GamesService,
          useValue: mockGamesService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<GamesController>(GamesController);
    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  

describe('createGame', () => {
    it('should create a new game', () => {
      const createGameDto: CreateGameDto = {
        // Add properties as needed
        title: 'Test Game',
  description: 'Test Description',
  genre: 'Test Genre',
  platform: 'Test Platform',
  publisher: 'Test Publisher',
  releaseDate: '2022-01-01',
  imageUrl: 'Test Image URL',
      };
      const isAdmin = true;

      mockGamesService.create.mockReturnValueOnce('createdGame');

      const result = controller.createGame(createGameDto, isAdmin);

      expect(result).toEqual('createdGame');
      expect(mockGamesService.create).toHaveBeenCalledWith(createGameDto);
    });
  });

    

describe('findGameById', () => {
    it('should find a game by id', async () => {
      const gameId = '1';
      const foundGame = 'foundGame';

      mockGamesService.findOne.mockResolvedValueOnce(foundGame);

      const result = await controller.findGameById(gameId);

      expect(result).toEqual(foundGame);
      expect(mockGamesService.findOne).toHaveBeenCalledWith(parseInt(gameId));
    });

    it('should throw NotFoundException if game is not found', async () => {
      const gameId = '1';

      mockGamesService.findOne.mockResolvedValueOnce(null);

      await expect(controller.findGameById(gameId)).rejects.toThrowError(
        NotFoundException,
      );
      expect(mockGamesService.findOne).toHaveBeenCalledWith(parseInt(gameId));
    });
  });

describe('findAllGames', () => {
    it('should find all games', () => {
      const genre = 'action';
      const foundGames = ['game1', 'game2'];

      mockGamesService.find.mockReturnValueOnce(foundGames);

      const result = controller.findAllGames(genre);

      expect(result).toEqual(foundGames);
      expect(mockGamesService.find).toHaveBeenCalledWith(genre);
    });
  });

describe('searchGames', () => {
    it('should search games by keyword', () => {
      const keyword = 'action';
      const foundGames = ['game1', 'game2'];

      mockGamesService.findGames.mockReturnValueOnce(foundGames);

      const result = controller.searchGames(keyword);

      expect(result).toEqual(foundGames);
      expect(mockGamesService.findGames).toHaveBeenCalledWith(keyword);
    });
  });

  

  describe('updateGame', () => {
    it('should update a game', () => {
      const gameId = '1';
      const createGameDto: CreateGameDto = {
        title: 'Test Game',
        description: 'Test Description',
        genre: 'Test Genre',
        platform: 'Test Platform',
        publisher: 'Test Publisher',
        releaseDate: '2022-01-01',
        imageUrl: 'Test Image URL',
              
      };
      const isAdmin = true;

      mockGamesService.update.mockReturnValueOnce('updatedGame');

      const result = controller.updateGame(gameId, createGameDto, isAdmin);

      expect(result).toEqual('updatedGame');
      expect(mockGamesService.update).toHaveBeenCalledWith(
        parseInt(gameId),
        createGameDto,
      );
    });
  });
});
  