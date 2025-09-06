import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CytokineType } from '../enums/cytokine-type.enum';

export class CreateCytokineDto {
  @ApiProperty({ example: 'IL-2' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: CytokineType, example: CytokineType.ANTI_INFLAMMATORY })
  @IsEnum(CytokineType)
  type: CytokineType;

  @ApiProperty({ example: 'Induces ploriferation of T-cells' })
  @IsString()
  function: string;

  @ApiProperty({
    description: 'IDs of the cells that produce this cytokine',
    example: [1, 2],
    required: false,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  producingCellIds?: number[];
}
