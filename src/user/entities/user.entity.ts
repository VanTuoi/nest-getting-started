import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StatusUser } from './status-user.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  iduser: number;

  @Column()
  userName: string;

  @Column()
  age: number;

  @ManyToOne(() => StatusUser, (statusUser) => statusUser.users)
  status: StatusUser;
}
