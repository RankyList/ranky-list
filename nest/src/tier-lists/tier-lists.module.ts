import { Module } from '@nestjs/common';
import { TierListsService } from './tier-lists.service';
import { TierListsController } from './tier-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TierList } from './entities/tier-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TierList])],
  controllers: [TierListsController],
  exports: [TierListsService],
  providers: [TierListsService],
})
export class TierListsModule {}
