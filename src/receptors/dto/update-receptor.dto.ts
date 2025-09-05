import { PartialType } from '@nestjs/swagger';
import { CreateReceptorDto } from './create-receptor.dto';

export class UpdateReceptorDto extends PartialType(CreateReceptorDto) {}
