import { Exclude } from 'class-transformer';
import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm';
import { PasswordTransformer } from './password.transformer';

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

  @Column({
    name: 'password',
    length: 255,
    nullable: true,
    transformer: new PasswordTransformer(),
  })
  @Exclude()
  password: string;

  @Column({nullable: true})
  isAdmin: boolean;

  @BeforeInsert()
  beforeInsertActions() {
    this.isAdmin = false;
    this.password = '';
  }

}

export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isAdmin: boolean;
}
