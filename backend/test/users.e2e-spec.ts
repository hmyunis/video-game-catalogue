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
        username: 'Beleir11',
        password: 'LASTstanding',
        Confirmpassword: 'LASTstanding',
      })
      .expect(201);
  });
});
