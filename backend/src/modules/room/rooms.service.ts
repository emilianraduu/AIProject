
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rooms, RoomsFillableFields } from './rooms.entity';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
  ) { }

  async get(id: number) {
    return this.roomsRepository.findOne(id);
  }


}
