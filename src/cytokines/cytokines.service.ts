import { Injectable } from '@nestjs/common';
import { CreateCytokineDto } from './dto/create-cytokine.dto';
import { UpdateCytokineDto } from './dto/update-cytokine.dto';

@Injectable()
export class CytokinesService {
  create(createCytokineDto: CreateCytokineDto) {
    return 'This action adds a new cytokine';
  }

  findAll() {
    return `This action returns all cytokines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cytokine`;
  }

  update(id: number, updateCytokineDto: UpdateCytokineDto) {
    return `This action updates a #${id} cytokine`;
  }

  remove(id: number) {
    return `This action removes a #${id} cytokine`;
  }
}
