import { PartialType } from '@nestjs/swagger';
import { CreateTierListDto } from './create-tier-list.dto';

export class UpdateTierListDto extends PartialType(CreateTierListDto) {}
