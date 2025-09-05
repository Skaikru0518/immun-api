import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CellLineage } from '../enums/cell-lineage.enum';
import { Receptor } from 'src/receptors/entities/receptor.entity';

@Entity('cells')
export class Cell {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the immune cell',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'CD4+ T helper cell',
    description: 'Name of the immune cell',
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    enum: CellLineage,
    example: CellLineage.LYMPHOID,
    description: 'Cell lineage (Lymphoid or Myeloid)',
  })
  @Column({ type: 'enum', enum: CellLineage })
  lineage: CellLineage;

  @ApiProperty({
    required: false,
    example: 'Coordinates the adaptive immune response',
    description: 'Short description of the cell function',
  })
  @Column('text', { nullable: true })
  function: string;

  @ApiProperty({
    type: () => [Receptor],
    description: 'Receptors expressed by this cell',
  })
  @ManyToMany(() => Receptor, (receptor) => receptor.cells, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  receptors: Receptor[];
}
