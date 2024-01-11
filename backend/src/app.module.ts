import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { CollectionsModule } from './collections/collections.module';
import { User } from './users/user.entity';
import { Game } from './games/game.entity';
import { Collection } from './collections/collection.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Game, Collection],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    GamesModule,
    CollectionsModule,
  ],
})
export class AppModule {}
