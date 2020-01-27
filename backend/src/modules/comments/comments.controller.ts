import { Controller, Body, Post, UseGuards, Get, Request, Put, Delete, Param } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentsPayload } from '../auth/comments.payload';
import { CommentsService } from './comments.service';
import { Comments, CommentsFillableFields } from 'modules/comments/comments.entity';
import { ObjectID } from "typeorm";

@Controller('api')
@ApiUseTags('comments')
export class CommentsController {
  payload: any;
  constructor(
    private readonly commentsService: CommentsService,
  ) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('comments')
  @ApiResponse({ status: 201, description: 'Succesfully got comments' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCommentsByName(@Request() request): Promise<any> {
    const comments = await this.commentsService.getAll();
    return comments;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('comments/:id')
  @ApiResponse({ status: 201, description: 'Succesfully got comments' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCommentsById(@Param('id') id): Promise<any> {
    return await this.commentsService.get(id);
  }
  
}
