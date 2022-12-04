import { Controller } from '@nestjs/common';
import { TierListRanksService } from './tier-list-ranks.service';

@Controller('tier-list-ranks')
export class TierListRanksController {
  constructor(private readonly tierListRanksService: TierListRanksService) {}
}
