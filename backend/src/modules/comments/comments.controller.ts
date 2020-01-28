import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';

@Controller('api')
@ApiUseTags('comments')
export class CommentsController {
  payload: any;

  constructor(
    private readonly commentsService: CommentsService,
  ) {
  }

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
