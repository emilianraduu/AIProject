
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';


@Entity({
  name: 'rooms',
})
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capacity: number;

  @Column({ length: 255 })
  features: string;

  @Column({ length: 255 })
  number: string;

}

export class RoomsFillableFields {
  capacity: number;
  features: string;
  number: string;
  id: number;
}
