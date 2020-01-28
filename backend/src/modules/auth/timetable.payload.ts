import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TimetablePayload {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  monday_availability_from: number;

  @IsNotEmpty()
  monday_availability_to: number;

  @IsNotEmpty()
  tuesday_availability_from: number;

  @IsNotEmpty()
  tuesday_availability_to: number;

  @IsNotEmpty()
  wednesday_availability_from: number;

  @IsNotEmpty()
  wednesday_availability_to: number;

  @IsNotEmpty()
  thursday_availability_from: number;

  @IsNotEmpty()
  thursday_availability_to: number;

  @IsNotEmpty()
  friday_availability_from: number;

  @IsNotEmpty()
  friday_availability_to: number;
}
