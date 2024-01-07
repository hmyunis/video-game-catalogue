import { Entity, PrimaryGeneratedColumn, Column, AfterRemove, AfterUpdate, AfterInsert, ManyToOne } from 'typeorm';
import { Collection } from '../collections/collection.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Collection, (collection) => collection.user)
  collection: Collection;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with ID', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with ID', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with ID', this.id);
  }

}
