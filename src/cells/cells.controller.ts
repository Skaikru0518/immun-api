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
import { CellsService } from './cells.service';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Cell } from './entities/cell.entity';

@ApiTags('Cells')
@Controller('cells')
export class CellsController {
  constructor(private readonly cellService: CellsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new cell' })
  @ApiBody({
    type: CreateCellDto,
    examples: {
      example1: {
        summary: 'T helper cell with receptors',
        value: {
          name: 'CD4+ T helper cell',
          lineage: 'Lymphoid',
          function: 'Coordinates adaptive immune response',
          receptorIds: [1, 2],
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Created', type: Cell })
  @ApiResponse({ status: 409, description: 'Already exists' })
  create(@Body() dto: CreateCellDto) {
    return this.cellService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all cells' })
  @ApiResponse({ status: 200, description: 'List of cells', type: [Cell] })
  findAll() {
    return this.cellService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a cell by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cell data', type: Cell })
  @ApiResponse({ status: 404, description: 'Cell not found' })
  findOne(@Param('id') id: string) {
    return this.cellService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update cell by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Cell updated succesfully',
    type: Cell,
  })
  @ApiResponse({ status: 404, description: 'Cell not found' })
  update(@Param('id') id: string, @Body() dto: UpdateCellDto) {
    return this.cellService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete cell by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Cell deleted successfully' })
  @ApiResponse({ status: 404, description: 'Cell not found' })
  remove(@Param('id') id: string) {
    return this.cellService.remove(+id);
  }
}
