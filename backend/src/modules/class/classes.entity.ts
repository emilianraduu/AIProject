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

  @Column({ length: 255 })
  available_from: Date;

  @Column({ length: 255 })
  available_to: Date;

  @Column({ length: 255 })
  length: number;

  @Column({ length: 255 })
  no_courses: number;

  @Column({ length: 255 })
  no_seminars: number;

}

export class ClassesFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  name: string;
  description: string;
  necessities: string;
  available_from: Date;
  available_to: Date;
  length: number;
  no_courses: number;
  no_seminars: number;
}
