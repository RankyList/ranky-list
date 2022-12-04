
import { OmitType } from '@nestjs/swagger';
import { TierListRank } from '../entities/tier-list-rank.entity';

export class CreateTierListRankDto extends OmitType(
  TierListRank,
  ['id', 'tierList', 'updatedAt', 'createdAt']
) {
}
