import { Test, TestingModule } from '@nestjs/testing';
import { TierListsController } from './tier-lists.controller';
import { TierListsService } from './tier-lists.service';

describe('TierListsController', () => {
  let controller: TierListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TierListsController],
      providers: [TierListsService],
    }).compile();

    controller = module.get<TierListsController>(TierListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
