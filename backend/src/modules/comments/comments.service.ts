import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comments, CommentsFillableFields } from './comments.entity';
import { CommentsPayload } from 'modules/auth/comments.payload';
import { User } from 'modules/user';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Comments)
        private readonly commentsRepository: Repository<Comments>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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
        .where("user.id = :id", { id: id })
        .getMany()
    }


    async update(payload: CommentsPayload) {
        return this.commentsRepository.save(payload);
    }

    async create(
        payload: CommentsFillableFields,
    ) {
        const comments = await this.getCommentsById(payload.id);
        if (comments) {
            throw new NotAcceptableException(
                'This comment has already been added.',
            );
        }

        const comment = await this.commentsRepository.create(payload);
        const user = await this.userRepository.findOne({ where: { id: payload.user } });

        comment.user = user;

        await this.commentsRepository.save(comment);

        return comment;

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
