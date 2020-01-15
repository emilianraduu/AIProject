import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RoomsPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(1)
  number: string;
}