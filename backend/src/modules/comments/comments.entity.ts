import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from 'modules/user';
import { Classes } from 'modules/class';

@Entity({
    name: 'comments',
})
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    text: string;

    @ManyToOne(type => User, user => user.comments, {
        cascade: true,
    })
    user: User;

    @OneToOne(type => Classes)
    @JoinColumn()
    class: Classes;

}

export class CommentsFillableFields {
    user: User;
    class: Classes;
    id: number;
    text: string;

    
}
