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
import { TimetablePayload } from './timetable.payload';
import { TimetableFillableFields, TimetableService } from 'modules/timetable';

@Controller('api')
@ApiUseTags('authentication')
export class AuthController {
  payload: any;
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly classesService: ClassesService,
    private readonly roomsService: RoomsService,
    private readonly timetableService: TimetableService,
  ) { }

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
    const classList = await this.classesService.getByUser(request.user.id)
    request.user.classes = classList;
    console.log(classList)
    return request.user;
  }

}
