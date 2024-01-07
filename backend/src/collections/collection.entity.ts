import { Game } from 'src/games/game.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { nullable: true })
  playedGames: Game[];

  @Column('simple-array', { nullable: true })
  playingGames: Game[];

  @Column('simple-array', { nullable: true })
  plannedGames: Game[];

  @OneToMany(() => User, (user) => user.collection)
  user: User[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted Collection with ID', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Collection with ID', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Collection with ID', this.id);
  }
}
