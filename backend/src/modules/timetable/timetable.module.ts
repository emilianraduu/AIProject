import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timetable } from './timetable.entity';
import { TimetableService } from './timetable.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timetable]),
  ],
  exports: [TimetableService],
  providers: [
    TimetableService,
  ],
})
export class TimetableModule {
}
