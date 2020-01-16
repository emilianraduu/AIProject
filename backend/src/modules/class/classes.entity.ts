import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from 'modules/user';
import { Rooms } from 'modules/room';

@Entity({
    name: 'classes',
})
export class Classes {
    @PrimaryGeneratedColumn()
    id_class: number;

    @Column({length: 255})
    name: string;

    @Column({length: 255})
    description: string;

    @Column({length: 255})
    necessities: string;

    @Column({length: 255})
    dayoftheweek: string;

    @Column()
    available_from: number;

    @Column()
    available_to: number;

    @Column()
    duration: number;

    @Column()
    no_courses: number;

    @Column()
    no_seminars: number;

    @ManyToOne(type => User, user => user.classes, {
        cascade: true,
    })
    user: User;

    @OneToOne(type => Rooms)
    @JoinColumn()
    room: Rooms;

}

export class ClassesFillableFields {
    name: string;
    description: string;
    necessities: string;
    dayoftheweek: string;
    available_from: number;
    available_to: number;
    duration: number;
    no_courses: number;
    no_seminars: number;
    user: User;
    id_class: number;
    room: Rooms;
}
