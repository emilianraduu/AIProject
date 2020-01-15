import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from 'modules/user';

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

    @Column()
    available_from: Date;

    @Column()
    available_to: Date;

    @Column()
    duration: number;

    @Column()
    no_courses: number;

    @Column()
    no_seminars: number;


    @BeforeInsert()
    beforeInsertActions() {
        this.description = '';
        this.necessities = '';
        this.available_from = new Date();
        this.available_to = new Date();
        this.duration = 0;
        this.no_courses = 0;
        this.no_seminars = 0;
    }
}

export class ClassesFillableFields {
    name: string;
    description: string;
    necessities: string;
    available_from: Date;
    available_to: Date;
    duration: number;
    no_courses: number;
    no_seminars: number;
}
