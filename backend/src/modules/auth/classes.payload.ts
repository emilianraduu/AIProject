import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {User} from '../user';
import { Rooms } from 'modules/room';

export class ClassesPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(1)
  name: string;
  
  @IsNotEmpty()
  user: User;

  
}