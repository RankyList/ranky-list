import { PartialType } from '@nestjs/mapped-types';
import { CreateTierListDto } from './create-tier-list.dto';

export class UpdateTierListDto extends PartialType(CreateTierListDto) {}
