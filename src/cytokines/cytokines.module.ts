import { Module } from '@nestjs/common';
import { CytokinesService } from './cytokines.service';
import { CytokinesController } from './cytokines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cytokine } from './entities/cytokine.entity';
import { Cell } from 'src/cells/entities/cell.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cytokine, Cell])],
  controllers: [CytokinesController],
  providers: [CytokinesService],
})
export class CytokinesModule {}
