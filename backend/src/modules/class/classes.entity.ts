import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'modules/user';
import { Rooms } from 'modules/room';
import { Comments } from 'modules/comments';

@Entity({
  name: 'classes',
})
export class Classes {
  @PrimaryGeneratedColumn()
  id_class: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ length: 255 })
  year: string;

  @Column()
  noof_students: number;

  @Column({ length: 255, nullable: true })
  dayoftheweek: string;

  @Column({ nullable: true })
  available_from: number;

  @Column({ nullable: true })
  available_to: number;

  @Column({ nullable: true })
  duration: number;

  @Column()
  type: string;

  @ManyToOne(type => User, user => user.classes, {
    cascade: true,
  })
  user: User;

  @OneToOne(type => Comments)
  @JoinColumn()
  comment: Comments;

  @OneToOne(type => Rooms)
  @JoinColumn()
  room: Rooms;

}

export class ClassesFillableFields {
  name: string;
  description: string;
  year: string;
  noof_students: number;
  dayoftheweek: string;
  available_from: number;
  available_to: number;
  type: string;
  duration: number;
  no_courses: number;
  user: User;
  id_class: number;
  room: Rooms;
  comment: Comments;
}
