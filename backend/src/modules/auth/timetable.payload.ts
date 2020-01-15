import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {Timetable} from '../timetable';

export class TimetablePayload {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  monday_availability_from: Date;

  @IsNotEmpty()
  monday_availability_to: Date;

  @IsNotEmpty()
  tuesday_availability_from: Date;

  @IsNotEmpty()
  tuesday_availability_to: Date;

  @IsNotEmpty()
  wednesday_availability_from: Date;

  @IsNotEmpty()
  wednesday_availability_to: Date;

  @IsNotEmpty()
  thursday_availability_from: Date;

  @IsNotEmpty()
  thursday_availability_to: Date;

  @IsNotEmpty()
  friday_availability_from: Date;

  @IsNotEmpty()
  friday_availability_to: Date;
}