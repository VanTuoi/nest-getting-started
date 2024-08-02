import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class StatusUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  statusName: string;

  @OneToMany(() => User, (user) => user.status)
  users: User[];
}
