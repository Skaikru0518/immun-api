import { Test, TestingModule } from '@nestjs/testing';
import { CytokinesController } from './cytokines.controller';
import { CytokinesService } from './cytokines.service';

describe('CytokinesController', () => {
  let controller: CytokinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CytokinesController],
      providers: [CytokinesService],
    }).compile();

    controller = module.get<CytokinesController>(CytokinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
