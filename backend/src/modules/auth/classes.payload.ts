import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../user';

export class ClassesPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  year: string;

  @IsNotEmpty()
  noof_students: number;


}
