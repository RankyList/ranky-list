import { Test, TestingModule } from '@nestjs/testing';
import { TierListRanksController } from './tier-list-ranks.controller';
import { TierListRanksService } from './tier-list-ranks.service';

describe('TierListRanksController', () => {
  let controller: TierListRanksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TierListRanksController],
      providers: [TierListRanksService],
    }).compile();

    controller = module.get<TierListRanksController>(TierListRanksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
