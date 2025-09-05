import { Test, TestingModule } from '@nestjs/testing';
import { CytokinesService } from './cytokines.service';

describe('CytokinesService', () => {
  let service: CytokinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CytokinesService],
    }).compile();

    service = module.get<CytokinesService>(CytokinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
