import { Test, TestingModule } from '@nestjs/testing';
import { TierListsService } from './tier-lists.service';

describe('TierListsService', () => {
  let service: TierListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TierListsService],
    }).compile();

    service = module.get<TierListsService>(TierListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
