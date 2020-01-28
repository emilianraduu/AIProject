import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'comments',
})
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  text: string;


}

export class CommentsFillableFields {
  id: number;
  text: string;


}
