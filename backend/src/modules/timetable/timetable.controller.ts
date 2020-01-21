import { Controller, Body, Post, UseGuards, Get, Request, Put, Delete, Param } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TimetableFillableFields, TimetableService } from 'modules/timetable';

@Controller('api')
@ApiUseTags('timetable')
export class TimetableController {
  payload: any;
  constructor(
    private readonly timetableService: TimetableService,
  ) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('timetable')
  @ApiResponse({ status: 201, description: 'Succesfully got timetable' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getTimetable(@Request() request): Promise<any> {
    return await this.timetableService.getOne();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('timetable/create')
  @ApiResponse({ status: 201, description: 'Succesfully created timetable' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createTimetable(@Body() payload: TimetableFillableFields): Promise<any> {
    return await this.timetableService.create(payload);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('timetable/update/:id')
  @ApiResponse({ status: 201, description: 'Succesfully updated timetable' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateTimetable(@Param('id') id, @Body() payload: TimetableFillableFields): Promise<any> {
    payload.id = Number(id);
    return await this.timetableService.update(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('timetable/remove/:id')
  @ApiResponse({ status: 201, description: 'Succesfully removed timetable' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeTimetable(@Param('id') id): Promise<any> {
    const someclass = await this.timetableService.get(Number(id));
    return await this.timetableService.remove(someclass);
  }
  
}
