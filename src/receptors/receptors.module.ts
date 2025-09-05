import { Module } from '@nestjs/common';
import { ReceptorsService } from './receptors.service';
import { ReceptorsController } from './receptors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receptor } from './entities/receptor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receptor])],
  controllers: [ReceptorsController],
  providers: [ReceptorsService],
  exports: [ReceptorsModule, ReceptorsService],
})
export class ReceptorsModule {}
