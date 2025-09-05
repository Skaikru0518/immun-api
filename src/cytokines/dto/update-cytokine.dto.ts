import { PartialType } from '@nestjs/swagger';
import { CreateCytokineDto } from './create-cytokine.dto';

export class UpdateCytokineDto extends PartialType(CreateCytokineDto) {}
