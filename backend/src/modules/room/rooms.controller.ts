import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoomsPayload } from '../auth/rooms.payload';
import { RoomsService } from './rooms.service';
import { RoomsFillableFields } from 'modules/room/rooms.entity';

@Controller('api')
@ApiUseTags('rooms')
export class RoomsController {
  payload: any;

  constructor(
    private readonly roomsService: RoomsService,
  ) {
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('rooms')
  @ApiResponse({ status: 201, description: 'Succesfully got rooms' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getRoom(@Request() request): Promise<any> {
    return await this.roomsService.getAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('rooms/:id')
  @ApiResponse({ status: 201, description: 'Succesfully got room at id :id' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getRoomById(@Param('id') id): Promise<any> {
    return await this.roomsService.get(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('rooms/create')
  @ApiResponse({ status: 201, description: 'Succesfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createRoom(@Body() payload: RoomsPayload): Promise<any> {
    return await this.roomsService.create(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('rooms/remove/:id')
  @ApiResponse({ status: 201, description: 'Succesfully removed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeRoom(@Param('id') id): Promise<any> {
    const someclass = await this.roomsService.get(Number(id));
    return await this.roomsService.remove(someclass);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('rooms/update/:id')
  @ApiResponse({ status: 201, description: 'Succesfully updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateRoom(@Param('id') id, @Body() payload: RoomsFillableFields): Promise<any> {
    payload.id = Number(id);
    return this.roomsService.update(payload);
  }

}
