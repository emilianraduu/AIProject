import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Classes, ClassesFillableFields } from './classes.entity';

@Injectable()
export class ClassesService {

  constructor(
    @InjectRepository(Classes)
    private readonly classesRepository: Repository<Classes>,
  ) { }

  async get(id: number) {
    return this.classesRepository.findOne(id);
  }

  async getByName(name: string) {
    return await this.classesRepository.createQueryBuilder('classes')
      .where('classes.name = :name')
      .setParameter('name', name)
      .getOne();
  }


  async create(
    payload: ClassesFillableFields,
  ) {
    const classes = await this.getByName(payload.name);

    if (classes) {
      throw new NotAcceptableException(
        'This class has already been added.',
      );
    }

    return await this.classesRepository.save(
      this.classesRepository.create(payload),
    );
  }
}
