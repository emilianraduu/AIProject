import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Timetable, TimetableFillableFields } from './timetable.entity';

@Injectable()
export class TimetableService {

  constructor(
    @InjectRepository(Timetable)
    private readonly timetableRepository: Repository<Timetable>,
  ) {
  }

  async get(id: number) {
    return this.timetableRepository.findOne(id);
  }

  async getOne() {
    return this.timetableRepository.findOne();
  }

  async getByEmail(email: string) {
    return await this.timetableRepository.createQueryBuilder('users')
      .where('users.email = :email')
      .setParameter('email', email)
      .getOne();
  }

  async getByEmailAndPass(email: string, password: string) {
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    const user = await this.timetableRepository.createQueryBuilder('users')
      .where('users.email = :email and users.password = :password')
      .setParameter('email', email)
      .setParameter('password', passHash)
      .getOne();
    return user;
  }

  async create(
    payload: TimetableFillableFields,
  ) {

    return await this.timetableRepository.save(
      this.timetableRepository.create(payload),
    );
  }

  async update(payload: TimetableFillableFields) {
    return this.timetableRepository.save(payload);
  }

  async remove(
    payload: TimetableFillableFields,
  ) {
    return await this.timetableRepository.delete(payload);
  }


}
