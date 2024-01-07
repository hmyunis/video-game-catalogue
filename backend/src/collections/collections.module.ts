import { Module } from '@nestjs/common';
import { Collection } from './collection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Collection])],
    providers: [CollectionsService],
    controllers: [CollectionsController],
    exports: [CollectionsService]
})
export class CollectionsModule {}
