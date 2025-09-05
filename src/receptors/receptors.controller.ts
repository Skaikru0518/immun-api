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
import { ReceptorsService } from './receptors.service';
import { CreateReceptorDto } from './dto/create-receptor.dto';
import { UpdateReceptorDto } from './dto/update-receptor.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Receptor } from './entities/receptor.entity';

@ApiTags('Receptors')
@Controller('receptors')
export class ReceptorsController {
  constructor(private readonly receptorService: ReceptorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new receptor' })
  @ApiBody({ type: CreateReceptorDto })
  @ApiResponse({ status: 201, description: 'Created', type: Receptor })
  @ApiResponse({ status: 409, description: 'Already exists' })
  create(@Body() dto: CreateReceptorDto) {
    return this.receptorService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all receptors' })
  @ApiResponse({
    status: 200,
    description: 'List of receptors',
    type: [Receptor],
  })
  findAll() {
    return this.receptorService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get receptor by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The receptor data',
    type: Receptor,
  })
  @ApiResponse({ status: 404, description: 'Receptor not found' })
  findOne(@Param('id') id: string) {
    return this.receptorService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update receptor by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateReceptorDto })
  @ApiResponse({
    status: 200,
    description: 'Receptor updated successfully',
    type: Receptor,
  })
  @ApiResponse({ status: 404, description: 'Receptor not found' })
  update(@Param('id') id: string, @Body() dto: UpdateReceptorDto) {
    return this.receptorService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete receptor by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Receptor deleted successfully' })
  @ApiResponse({ status: 404, description: 'Receptor not found' })
  remove(@Param('id') id: string) {
    return this.receptorService.remove(+id);
  }
}
