import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: JwtService, useValue: {} }, // provide JwtService
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should call appService.getHello', () => {
      const req = {}; // Mock req object
      const getHelloSpy = jest
        .spyOn(appService, 'getHello')
        .mockImplementation(() => '');

      appController.getHello(req);

      expect(getHelloSpy)
    });
  });

  describe('getout', () => {
    it('should do something with res', () => {
      const res = { clearCookie: jest.fn() }; // Mock res object

      appController.getout(res);

      expect(res.clearCookie).toHaveBeenCalled();
    });
  });

  describe('getin', () => {
    it('should do something with res', () => {
      const res = { cookie: jest.fn() }; // Mock res object

      appController.getin(res);

      expect(res.cookie).toHaveBeenCalled();
    });
  });
});
