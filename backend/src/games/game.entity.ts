import { Collection } from 'src/collections/collection.entity';
import { Entity, PrimaryGeneratedColumn, Column, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column()
  platform: string;

  @Column({ nullable: true })
  releaseDate: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Game with ID', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Game with ID', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Game with ID', this.id);
  }
}
