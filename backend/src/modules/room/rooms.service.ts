
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rooms, RoomsFillableFields } from './rooms.entity';
import { RoomsPayload } from 'modules/auth';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
  ) { }

  async get(id: number) {
    return this.roomsRepository.findOne(id);
  }

  async getByNumber(number: string) {
    return this.roomsRepository.createQueryBuilder('rooms')
      .where('rooms.number = :number')
      .setParameter('number', number)
      .getOne();
  }

  async getAll(){
    return this.roomsRepository.query('SELECT * FROM rooms');
  }  

  async create(
    payload: RoomsPayload,
  ) {
    const rooms = await this.getByNumber(payload.number);

    if (rooms) {
      throw new NotAcceptableException(
        'This room has already been added.',
      );
    }

    return await this.roomsRepository.save(
      this.roomsRepository.create(payload),
    );
  }

  async remove(
    payload: RoomsPayload,
  ) {
    const rooms = await this.getByNumber(payload.number);

    if(!rooms) {
      throw new NotAcceptableException(
        'This room does not exist. Cannot remove',
      );
    }

    return await this.roomsRepository.delete(payload);
  }

}
