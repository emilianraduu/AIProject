import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class RoomsPayload {
  @ApiModelProperty({
    required: true,
  })

  @IsNotEmpty()
  @MinLength(1)
  number: string;

  @IsNotEmpty()
  @MinLength(1)
  type: string;
}
