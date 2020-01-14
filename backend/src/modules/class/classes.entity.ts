import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'classes',
})
export class Classes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  necessities: string;

  @Column()
  available_from: Date;

  @Column()
  available_to: Date;

  @Column()
  duration: number;

  @Column()
  no_courses: number;

  @Column()
  no_seminars: number;

}

export class ClassesFillableFields {
  name: string;
  description: string;
  necessities: string;
  available_from: Date;
  available_to: Date;
  duration: number;
  no_courses: number;
  no_seminars: number;
}
