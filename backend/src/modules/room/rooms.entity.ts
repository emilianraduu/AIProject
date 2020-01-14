
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


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

  @Column()
  number: number;

}

export class RoomsFillableFields {
  id: number;
  capacity: number;
  features: string;
  number: number;
}
