import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCytokineDto } from './dto/create-cytokine.dto';
import { UpdateCytokineDto } from './dto/update-cytokine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cytokine } from './entities/cytokine.entity';
import { Repository } from 'typeorm';
import { Cell } from 'src/cells/entities/cell.entity';

@Injectable()
export class CytokinesService {
  constructor(
    @InjectRepository(Cytokine)
    private readonly cytokineRepo: Repository<Cytokine>,
    @InjectRepository(Cell)
    private readonly cellRepo: Repository<Cell>,
  ) {}

  async create(dto: CreateCytokineDto): Promise<Cytokine> {
    const exists = await this.cytokineRepo.findOne({
      where: { name: dto.name },
    });
    if (exists) {
      throw new ConflictException(`Cytokine ${dto.name} already exists`);
    }
    let producingCells: Cell[] = [];
    if (dto.producingCellIds?.length) {
      producingCells = await this.cellRepo.findByIds(dto.producingCellIds);
    }
    const cytokine = this.cytokineRepo.create({ ...dto, producingCells });
    return this.cytokineRepo.save(cytokine);
  }
  async findAll(): Promise<Cytokine[]> {
    return this.cytokineRepo.find();
  }

  async findOne(id: number): Promise<Cytokine> {
    const cytokine = await this.cytokineRepo.findOne({
      where: { id },
      relations: ['producingCells'],
    });
    if (!cytokine)
      throw new NotFoundException(`Cytokine with ID ${id} not found`);
    return cytokine;
  }

  async update(id: number, dto: UpdateCytokineDto): Promise<Cytokine> {
    const cytokine = await this.findOne(id);
    if (dto.producingCellIds?.length) {
      cytokine.producingCells = await this.cellRepo.findByIds(
        dto.producingCellIds,
      );
    }
    Object.assign(cytokine, dto);
    return this.cytokineRepo.save(cytokine);
  }

  async remove(id: number): Promise<void> {
    const result = await this.cytokineRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cytokine with ID ${id} not found`);
    }
  }
}
