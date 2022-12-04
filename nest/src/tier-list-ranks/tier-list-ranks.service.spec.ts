import { Test, TestingModule } from '@nestjs/testing';
import { TierListRanksService } from './tier-list-ranks.service';

describe('TierListRanksService', () => {
  let service: TierListRanksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TierListRanksService],
    }).compile();

    service = module.get<TierListRanksService>(TierListRanksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
