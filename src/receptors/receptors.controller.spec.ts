import { Test, TestingModule } from '@nestjs/testing';
import { ReceptorsController } from './receptors.controller';
import { ReceptorsService } from './receptors.service';

describe('ReceptorsController', () => {
  let controller: ReceptorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptorsController],
      providers: [ReceptorsService],
    }).compile();

    controller = module.get<ReceptorsController>(ReceptorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
