import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService as LoggerService } from './logger.service.js';

describe('WinstonService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
