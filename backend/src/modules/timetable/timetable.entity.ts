import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
  name: 'timetable',
})
export class Timetable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monday_availability_from: number;

  @Column()
  monday_availability_to: number;

  @Column()
  tuesday_availability_from: number;

  @Column()
  tuesday_availability_to: number;

  @Column()
  wednesday_availability_from: number;

  @Column()
  wednesday_availability_to: number;

  @Column()
  thursday_availability_from: number;

  @Column()
  thursday_availability_to: number;

  @Column()
  friday_availability_from: number;

  @Column()
  friday_availability_to: number;

}

export class TimetableFillableFields {
  monday_availability_from: number;
  monday_availability_to: number;
  tuesday_availability_from: number;
  tuesday_availability_to: number;
  wednesday_availability_from: number;
  wednesday_availability_to: number;
  thursday_availability_from: number;
  thursday_availability_to: number;
  friday_availability_from: number;
  friday_availability_to: number;
  id: number;
}
