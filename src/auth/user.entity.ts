import { Exclude } from 'class-transformer';
import { Task } from './../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: false })
  tasks: Task[];
}
