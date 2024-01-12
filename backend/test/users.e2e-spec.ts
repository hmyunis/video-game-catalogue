import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('User COntroller E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new User', () => {
    return request(app.getHttpServer())
      .post('/signup')
      .send({
        username: 'Beleoir11',
        password: 'LASTstanding',
        Confirmpassword: 'LASTstanding',
      })
      .expect(201);
  });
  it('should Return 400 bad request when passwords dont match', () => {
    return request(app.getHttpServer())
      .post('/signup')
      .send({
        username: 'Beiiioilei1',
        password: 'LASTstanding',
        Confirmpassword: 'LSTstanding',
      })
      .expect(400);
  });
});