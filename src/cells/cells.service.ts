import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cell } from './entities/cell.entity';
import { Repository } from 'typeorm';
import { Receptor } from 'src/receptors/entities/receptor.entity';

@Injectable()
export class CellsService {
  constructor(
    @InjectRepository(Cell) private readonly cellRepo: Repository<Cell>,
  ) {}

  async create(dto: CreateCellDto): Promise<Cell> {
    const exists = await this.cellRepo.findOne({ where: { name: dto.name } });
    if (exists) {
      throw new ConflictException(`Cell ${dto.name} already exists`);
    }

    let receptors: Receptor[] = [];
    if (dto.receptorIds?.length) {
      receptors = await this.cellRepo.manager
        .getRepository(Receptor)
        .findByIds(dto.receptorIds);
    }

    const cell = this.cellRepo.create({
      ...dto,
      receptors,
    });
    return this.cellRepo.save(cell);
  }

  async findAll(): Promise<Cell[]> {
    return this.cellRepo.find({ relations: ['receptors'] });
  }

  async findOne(id: number): Promise<Cell> {
    const cell = await this.cellRepo.findOne({
      where: { id },
      relations: ['receptors'],
    });
    if (!cell) {
      throw new NotFoundException(`Cell with ID ${id} not found`);
    }
    return cell;
  }

  async update(id: number, updateDto: UpdateCellDto): Promise<Cell> {
    const cell = await this.findOne(id);

    if (updateDto.receptorIds?.length) {
      const receptors = await this.cellRepo.manager
        .getRepository(Receptor)
        .findByIds(updateDto.receptorIds);
      cell.receptors = receptors;
    }

    Object.assign(cell, updateDto);
    return this.cellRepo.save(cell);
  }

  async remove(id: number): Promise<void> {
    const del = await this.cellRepo.delete(id);
    if (del.affected === 0) {
      throw new NotFoundException(`Cell with ID ${id} not deleted`);
    }
  }
}
