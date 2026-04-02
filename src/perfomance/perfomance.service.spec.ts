import { Test, TestingModule } from '@nestjs/testing';
import { PerfomanceService } from './perfomance.service.js';

describe('PerfomanceService', () => {
  let service: PerfomanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfomanceService],
    }).compile();

    service = module.get<PerfomanceService>(PerfomanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
