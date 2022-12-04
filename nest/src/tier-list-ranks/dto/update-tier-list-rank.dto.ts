import { PartialType } from '@nestjs/swagger';
import { CreateTierListRankDto } from './create-tier-list-rank.dto';

export class UpdateTierListRankDto extends PartialType(CreateTierListRankDto) {}
