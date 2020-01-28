import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClassesPayload } from '../auth/classes.payload';
import { ClassesService } from './classes.service';
import { ClassesFillableFields } from 'modules/class/classes.entity';

@Controller('api')
@ApiUseTags('classes')
export class ClassesController {
  payload: any;

  constructor(
    private readonly classesService: ClassesService,
  ) {
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('classes')
  @ApiResponse({ status: 201, description: 'Succesfully got classes' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getClassesByName(@Request() request): Promise<any> {
    const classes = await this.classesService.getAll();
    return classes;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('classes/:id_class')
  @ApiResponse({ status: 201, description: 'Succesfully got class at id :id_class' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getClassById(@Param('id_class') id_class): Promise<any> {
    return await this.classesService.get(id_class);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('classes/create')
  @ApiResponse({ status: 200, description: 'Succesfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createClass(@Body() payload: ClassesPayload): Promise<any> {
    return this.classesService.create(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('classes/remove/:id_class')
  @ApiResponse({ status: 201, description: 'Succesfully removed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeClass(@Param('id_class') id_class): Promise<any> {
    const someclass = await this.classesService.get(Number(id_class));
    return await this.classesService.remove(someclass);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('classes/update/:id_class')
  @ApiResponse({ status: 201, description: 'Succesfully updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateClass(@Param('id_class') id_class, @Body() payload: ClassesFillableFields): Promise<any> {
    payload.id_class = Number(id_class);
    return this.classesService.update(payload);
  }


}
