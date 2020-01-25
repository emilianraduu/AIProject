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

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('comments/create')
  @ApiResponse({ status: 200, description: 'Succesfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createComment(@Body() payload: CommentsFillableFields): Promise<any> {
    return this.commentsService.create(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('comments/remove/:id')
  @ApiResponse({ status: 201, description: 'Succesfully removed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeComment(@Param('id') id): Promise<any> {
    const newsomeclass = await this.commentsService.get(Number(id));
    return await this.commentsService.remove(newsomeclass);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('comments/update/:id')
  @ApiResponse({ status: 201, description: 'Succesfully updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateComment(@Param('id') id, @Body() payload: CommentsFillableFields): Promise<any> {
    payload.id = Number(id);
    return this.commentsService.update(payload);
  }

  
}
