import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CellLineage } from '../enums/cell-lineage.enum';

export class CreateCellDto {
  @ApiProperty({ example: 'CD4+ T helper cell' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ enum: CellLineage, example: CellLineage.LYMPHOID })
  @IsEnum(CellLineage)
  lineage: CellLineage;

  @ApiProperty({
    required: false,
    example: 'Coordinates the adaptive immune response',
  })
  @IsOptional()
  @IsString()
  function?: string;

  @ApiProperty({
    required: false,
    example: [1, 2],
    description: 'IDs of receptors expressed by this cell',
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  receptorIds?: number[];
}
