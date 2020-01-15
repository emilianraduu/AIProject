import { Exclude } from 'class-transformer';
import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany} from 'typeorm';
import { PasswordTransformer } from './password.transformer';
import {Classes} from '../class/classes.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({nullable: true})
  isAdmin: boolean;

  @BeforeInsert()
  beforeInsertActions() {
    this.isAdmin = false;
  }
  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })

  @OneToMany(type => Classes, photo => photo.teacher)
  classes: Classes[];

  @Exclude()
  password: string;

}

export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isAdmin: boolean;
}
