import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReceptorType } from '../enums/receptor-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Cell } from 'src/cells/entities/cell.entity';

@Entity('receptors')
export class Receptor {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'IL-2R' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ enum: ReceptorType, example: ReceptorType.CHEMOKINE_RECEPTOR })
  @Column({ type: 'enum', enum: ReceptorType })
  type: ReceptorType;

  @ApiProperty({
    example: 'Mediates IL-2 Signaling for T cell proliferation',
    required: false,
  })
  @Column('text', { nullable: true })
  function: string;

  @ApiProperty({
    type: () => [Cell],
    required: false,
    description: 'Cells with this receptor',
  })
  @ManyToMany(() => Cell, (cell) => cell.receptors)
  cells: Cell[];
}
