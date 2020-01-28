import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';
import { User, UsersService } from 'modules/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [CommentsService, UsersService],
  providers: [
    CommentsService,
    UsersService,
  ],
})
export class CommentsModule {
}
