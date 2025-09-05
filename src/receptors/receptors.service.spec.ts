import { Test, TestingModule } from '@nestjs/testing';
import { ReceptorsService } from './receptors.service';

describe('ReceptorsService', () => {
  let service: ReceptorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptorsService],
    }).compile();

    service = module.get<ReceptorsService>(ReceptorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
