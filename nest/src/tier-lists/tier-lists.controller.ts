import { Crud, CrudController } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { TierListsService } from './tier-lists.service';
import { CreateTierListDto } from './dto/create-tier-list.dto';
import { UpdateTierListDto } from './dto/update-tier-list.dto';
import { ApiTags } from '@nestjs/swagger';
import { TierList } from './entities/tier-list.entity';

@Crud({
  model: {
    type: TierList
  },
  dto: {
    create: CreateTierListDto,
    update: UpdateTierListDto
  },
  query: {
    join: {
      tierListRanks: {
        eager: true
      }
    }
  }
})
@Controller('tier-lists')
@ApiTags('tier-lists')
export class TierListsController implements CrudController<TierList> {
  constructor(public readonly service: TierListsService) {}
}
