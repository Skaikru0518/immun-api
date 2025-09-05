import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CytokineType } from '../enums/cytokine-type.enum';

@Entity('cytokines')
export class Cytokine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'enum', enum: CytokineType })
  type: CytokineType;

  @Column('text')
  function: string;

  @Column({ nullable: true })
  receptor: string;

  @Column('simple-array', { nullable: true })
  diseaseAssociations: string[];
}
