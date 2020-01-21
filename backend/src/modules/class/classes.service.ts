import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Classes } from './classes.entity';
import { ClassesPayload } from 'modules/auth/classes.payload';
import { User } from 'modules/user';

@Injectable()
export class ClassesService {

    constructor(
        @InjectRepository(Classes)
        private readonly classesRepository: Repository<Classes>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async get(id_class: number) {
        return this.classesRepository.findOne(id_class);
    }

    async getAll() {
        const classes = await this.classesRepository.createQueryBuilder('classes')
            .leftJoinAndSelect('classes.user', 'user')
            .getMany();
        return classes;
    }

    async getByUser(id: number) {
        const user = await this.userRepository.findOne(id);
        return this.classesRepository.createQueryBuilder('classes')
        .leftJoinAndSelect('classes.user', 'user')
        .where("user.id = :id", { id: id })
        .getMany()
    }

    async getByName(name: string) {
        return await this.classesRepository.createQueryBuilder('classes')
            .where('classes.name = :name')
            .setParameter('name', name)
            .getOne();
    }

    async update(payload: ClassesPayload) {
        return this.classesRepository.save(payload);
    }

    async create(
        payload: ClassesPayload,
    ) {
        const classes = await this.getByName(payload.name);
        if (classes) {
            throw new NotAcceptableException(
                'This class has already been added.',
            );
        }

        const course = await this.classesRepository.create(payload);
        const user = await this.userRepository.findOne({ where: { id: payload.user } });

        course.user = user;

        await this.classesRepository.save(course);

        return course;

    }

    async remove(
        payload: ClassesPayload,
    ) {
        const classes = await this.getByName(payload.name);

        if (!classes) {
            throw new NotAcceptableException(
                'This class does not exist. Cannot remove.',
            );
        }

        return await this.classesRepository.delete(payload);
    }

}
