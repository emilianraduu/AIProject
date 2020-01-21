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

    @Column({length: 255, nullable: true})
    description: string;

    @Column({length: 255})
    year: string;

    @Column({length: 255})
    type: string;

    @Column()
    noof_students: number;

    @Column({length: 255, nullable: true})
    necessities: string;

    @Column({length: 255, nullable: true})
    dayoftheweek: string;

    @Column({nullable: true})
    available_from: number;

    @Column({nullable: true})
    available_to: number;

    @Column({nullable: true})
    duration: number;

    @Column({nullable: true})
    no_courses: number;

    @Column({nullable: true})
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
    year: string;
    type: string;
    noof_students: number;
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
