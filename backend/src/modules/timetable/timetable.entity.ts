import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
  name: 'timetable',
})
export class Timetable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monday_availability_from: Date;

  @Column()
  monday_availability_to: Date;

  @Column()
  tuesday_availability_from: Date;

  @Column()
  tuesday_availability_to: Date;

  @Column()
  wednesday_availability_from: Date;

  @Column()
  wednesday_availability_to: Date;

  @Column()
  thursday_availability_from: Date;

  @Column()
  thursday_availability_to: Date;

  @Column()
  friday_availability_from: Date;

  @Column()
  friday_availability_to: Date;

}

export class TimetableFillableFields {
  monday_availability_from: Date;
  monday_availability_to: Date;
  tuesday_availability_from: Date;
  tuesday_availability_to: Date;
  wednesday_availability_from: Date;
  wednesday_availability_to: Date;
  thursday_availability_from: Date;
  thursday_availability_to: Date;
  friday_availability_from: Date;
  friday_availability_to: Date;
}
