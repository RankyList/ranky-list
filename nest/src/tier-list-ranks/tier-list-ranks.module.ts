import { Module } from '@nestjs/common';
import { TierListRanksService } from './tier-list-ranks.service';
import { TierListRanksController } from './tier-list-ranks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TierListRank } from './entities/tier-list-rank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TierListRank])],
  controllers: [TierListRanksController],
  providers: [TierListRanksService]
})
export class TierListRanksModule {}
