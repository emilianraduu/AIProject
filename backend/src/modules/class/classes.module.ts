import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classes } from './classes.entity';
import { ClassesService } from './classes.service';
import { User, UsersService } from 'modules/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classes]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [ClassesService, UsersService],
  providers: [
    ClassesService,
    UsersService,
  ],
})
export class ClassesModule {
}
