import {Exclude} from 'class-transformer';
import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {PasswordTransformer} from './password.transformer';
import {Classes} from '../class/classes.entity';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    firstName: string;

    @Column({length: 255})
    lastName: string;

    @Column({length: 255})
    email: string;

    @Column({nullable: true})
    isAdmin: boolean;

    @OneToMany(type => Classes, classes => classes.user) // note: we will create author property in the Photo class below
    classes: Classes[];

    @BeforeInsert()
    beforeInsertActions() {
        this.isAdmin = false;
    }

    @Column({
        name: 'password',
        length: 255,
        transformer: new PasswordTransformer(),
    })

    @Exclude()
    password: string;

}

export class UserFillableFields {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isAdmin: boolean;
}
