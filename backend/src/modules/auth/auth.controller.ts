import { Controller, Body, Post, UseGuards, Get, Request, Put, Delete } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, LoginPayload, RegisterPayload } from './';
import { ClassesPayload } from './classes.payload';
import { RoomsPayload } from './rooms.payload';
import {UsersService} from '../user';
import {ClassesService} from '../class/classes.service';
import {RoomsService} from '../room/rooms.service';

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


  @Get('users')
  @ApiResponse({ status: 201, description: 'Succesfully got users' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUsers(@Request() request): Promise<any> {
    return await this.userService.getAll();
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
  @Get('rooms/remove')
  @ApiResponse({ status: 201, description: 'Succesfully removed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeRoom(@Body() payload: RoomsPayload): Promise<any> {
    return await this.roomsService.remove(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('classes')
  @ApiResponse({ status: 201, description: 'Succesfully got classes' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getClassesByName(@Request() request): Promise<any> {
    return await this.classesService.getAll();
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
  @Delete('classes/remove')
  @ApiResponse({ status: 201, description: 'Succesfully removed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeClass(@Body() payload: ClassesPayload): Promise<any> {
    return await this.classesService.remove(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('classes/update')
  @ApiResponse({ status: 201, description: 'Succesfully updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateClass(@Body() payload: ClassesPayload): Promise<any> {
    return await this.classesService.update(payload);
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
    return request.user;
  }
}
