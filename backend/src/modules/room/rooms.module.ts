import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './rooms.entity';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rooms]),
  ],
  exports: [RoomsService],
  providers: [
    RoomsService,
  ],
})
export class RoomsModule {
}
