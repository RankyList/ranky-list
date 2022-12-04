
import { OmitType } from '@nestjs/swagger';
import { TierList } from '../entities/tier-list.entity';

export class CreateTierListDto extends OmitType(
  TierList,
  ['id', 'slug', 'tierLists', 'updatedAt', 'createdAt']
) {
}
