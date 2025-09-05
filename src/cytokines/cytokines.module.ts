import { Module } from '@nestjs/common';
import { CytokinesService } from './cytokines.service';
import { CytokinesController } from './cytokines.controller';

@Module({
  controllers: [CytokinesController],
  providers: [CytokinesService],
})
export class CytokinesModule {}
