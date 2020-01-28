import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comments, CommentsFillableFields } from './comments.entity';
import { CommentsPayload } from 'modules/auth/comments.payload';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {
  }

  async get(id_class: number) {
    return this.commentsRepository.findOne(id_class);
  }

  async getAll() {
    const comments = await this.commentsRepository.createQueryBuilder('comments')
      .leftJoinAndSelect('comments.user', 'user')
      .getMany();
    return comments;
  }

  async getCommentsById(id: number) {
    const comments = await this.commentsRepository.findOne(id);
    return this.commentsRepository.createQueryBuilder('comments')
      .leftJoinAndSelect('comments.user', 'user')
      .where('user.id = :id', { id: id })
      .getMany();
  }


  async update(payload: CommentsPayload) {
    return this.commentsRepository.save(payload);
  }


  async remove(
    payload: CommentsFillableFields,
  ) {
    const comments = await this.getCommentsById(payload.id);

    if (!comments) {
      throw new NotAcceptableException(
        'This comment does not exist. Cannot remove.',
      );
    }

    return await this.commentsRepository.delete(payload);
  }

}
