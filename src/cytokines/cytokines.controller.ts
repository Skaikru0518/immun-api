import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CytokinesService } from './cytokines.service';
import { CreateCytokineDto } from './dto/create-cytokine.dto';
import { UpdateCytokineDto } from './dto/update-cytokine.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Cytokine } from './entities/cytokine.entity';

@Controller('cytokines')
export class CytokinesController {
  constructor(private readonly cytokinesService: CytokinesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new cytokine' })
  @ApiBody({ type: CreateCytokineDto })
  @ApiResponse({ status: 201, description: 'Created', type: Cytokine })
  @ApiResponse({ status: 409, description: 'Already exists' })
  create(@Body() dto: CreateCytokineDto) {
    return this.cytokinesService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all cytokines' })
  @ApiResponse({ status: 200, type: [Cytokine] })
  @ApiResponse({ status: 404, description: 'Not found' })
  findAll() {
    return this.cytokinesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a cytokine by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cytokine found', type: Cytokine })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id') id: string) {
    return this.cytokinesService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update cytokine by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateCytokineDto })
  @ApiResponse({ status: 200, type: Cytokine, description: 'Cytokine updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(@Param('id') id: string, @Body() dto: UpdateCytokineDto) {
    return this.cytokinesService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delet a cytokine by id' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id') id: string) {
    return this.cytokinesService.remove(+id);
  }
}
