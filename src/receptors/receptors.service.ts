import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReceptorDto } from './dto/create-receptor.dto';
import { UpdateReceptorDto } from './dto/update-receptor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receptor } from './entities/receptor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReceptorsService {
  constructor(
    @InjectRepository(Receptor)
    private readonly receptorRepo: Repository<Receptor>,
  ) {}

  async create(dto: CreateReceptorDto): Promise<Receptor> {
    const exists = await this.receptorRepo.findOne({
      where: { name: dto.name },
    });
    if (exists) {
      throw new ConflictException(`Receptor ${dto.name} already exists`);
    }

    const receptor = this.receptorRepo.create(dto);
    return this.receptorRepo.save(receptor);
  }

  async findAll(): Promise<Receptor[]> {
    return this.receptorRepo.find({ relations: ['cells'] });
  }

  async findOne(id: number): Promise<Receptor> {
    const receptor = await this.receptorRepo.findOne({
      where: { id },
      relations: ['cells'],
    });
    if (!receptor) {
      throw new NotFoundException(`Recteptor with ID ${id} not found`);
    }
    return receptor;
  }

  async update(id: number, updateDto: UpdateReceptorDto): Promise<Receptor> {
    const receptor = await this.findOne(id);
    Object.assign(receptor, updateDto);
    return this.receptorRepo.save(receptor);
  }

  async remove(id: number): Promise<void> {
    const del = await this.receptorRepo.delete(id);
    if (del.affected === 0) {
      throw new NotFoundException(`Receptor with ID ${id} not deleted`);
    }
  }
}
