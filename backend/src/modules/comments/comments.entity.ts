import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from 'modules/user';
import { Rooms } from 'modules/room';
import { Classes } from 'modules/class';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';

@Entity({
    name: 'comments',
})
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    text: string;


}

export class CommentsFillableFields {
    id: number;
    text: string;

    
}
