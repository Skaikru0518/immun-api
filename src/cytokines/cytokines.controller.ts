import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CytokinesService } from './cytokines.service';
import { CreateCytokineDto } from './dto/create-cytokine.dto';
import { UpdateCytokineDto } from './dto/update-cytokine.dto';

@Controller('cytokines')
export class CytokinesController {
  constructor(private readonly cytokinesService: CytokinesService) {}

  @Post()
  create(@Body() createCytokineDto: CreateCytokineDto) {
    return this.cytokinesService.create(createCytokineDto);
  }

  @Get()
  findAll() {
    return this.cytokinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cytokinesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCytokineDto: UpdateCytokineDto,
  ) {
    return this.cytokinesService.update(+id, updateCytokineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cytokinesService.remove(+id);
  }
}
