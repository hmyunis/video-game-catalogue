import {
  Entity,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  status: GameStatus;

  @Column({ nullable: true })
  gameId: number;

  @Column({ nullable: true })
  userId: number;

  @AfterInsert()
  logInsert() {
    console.log('Inserted a record to Collection.');
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Collection.');
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed a record from Collection.');
  }
}

export enum GameStatus {
  'PLAYED' = 'PLAYED',
  'PLAYING' = 'PLAYING',
  'PLANNED' = 'PLANNED',
}
