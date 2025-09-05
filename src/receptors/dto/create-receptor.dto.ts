import { ApiProperty } from '@nestjs/swagger';
import { ReceptorType } from '../enums/receptor-type.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateReceptorDto {
  @ApiProperty({
    example: 'IL-2R',
    description: 'Name of the receptor, must be unique',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    enum: ReceptorType,
    example: ReceptorType.CHEMOKINE_RECEPTOR,
    description: 'Type of the receptor family',
  })
  @IsEnum(ReceptorType)
  type: ReceptorType;

  @ApiProperty({
    required: false,
    example: 'Mediates IL-2 signaling for T cell proliferation',
    description: 'Brief description of the receptors`s function',
  })
  @IsOptional()
  @IsString()
  function?: string;
}
