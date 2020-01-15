import { Controller, Body, Post, UseGuards, Get, Request, Put, Delete, Param } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, LoginPayload, RegisterPayload } from './';
import { ClassesPayload } from './classes.payload';
import { RoomsPayload } from './rooms.payload';
import { UsersService } from '../user';
import { ClassesService } from '../class/classes.service';
import { RoomsService } from '../room/rooms.service';
import { Classes, ClassesFillableFields } from 'modules/class/classes.entity';
import { RoomsFillableFields } from 'modules/room/rooms.entity';

@Controller('api')
@ApiUseTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly classesService: ClassesService,
    private readonly roomsService: RoomsService,
  ) { }

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


  @Get('users')
  @ApiResponse({ status: 201, description: 'Succesfully got users' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUsers(@Request() request): Promise<any> {
    return await this.userService.getAll();
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload): Promise<any> {
    const user = await this.userService.create(payload);
    return await this.authService.createToken(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@Request() request): Promise<any> {
    const classList = await this.classesService.getByUser(request.id)
    request.user.classes = classList;
    return request.user;
  }

  
}
