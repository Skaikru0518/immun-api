import { Module } from '@nestjs/common';
import { CellsService } from './cells.service';
import { CellsController } from './cells.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cell } from './entities/cell.entity';
import { ReceptorsModule } from 'src/receptors/receptors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cell]), ReceptorsModule],
  controllers: [CellsController],
  providers: [CellsService],
})
export class CellsModule {}
