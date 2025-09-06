import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CytokineType } from '../enums/cytokine-type.enum';
import { Cell } from 'src/cells/entities/cell.entity';

@Entity('cytokines')
export class Cytokine {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'IL-2', description: 'Name of the cytokine' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    enum: CytokineType,
    example: CytokineType.ANTI_INFLAMMATORY,
    description: 'Type of the cytokine',
  })
  @Column({ type: 'enum', enum: CytokineType })
  type: CytokineType;

  @ApiProperty({
    example: 'Induces the proliferation of T-cells',
    description: 'Short biological function cytokine',
  })
  @Column('text')
  function: string;

  @ApiProperty({
    type: () => [Cell],
    description: 'Cells that produce this cytokine',
  })
  @ManyToMany(() => Cell, (cell) => cell.cytokines, { cascade: true })
  @JoinTable()
  producingCells: Cell[];
}
