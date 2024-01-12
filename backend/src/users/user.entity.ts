import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterRemove,
  AfterUpdate,
  AfterInsert,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ nullable: true })
  joinDate: string;

  @BeforeInsert()
  setJoinDate(): void {
    this.joinDate = new Date().toDateString().substring(4);
  }

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
