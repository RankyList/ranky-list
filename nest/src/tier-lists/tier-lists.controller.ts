import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TierListsService } from './tier-lists.service';
import { CreateTierListDto } from './dto/create-tier-list.dto';
import { UpdateTierListDto } from './dto/update-tier-list.dto';

@Controller('tier-lists')
export class TierListsController {
  constructor(private readonly tierListsService: TierListsService) {}

  @Post()
  create(@Body() createTierListDto: CreateTierListDto) {
    return this.tierListsService.create(createTierListDto);
  }

  @Get()
  findAll() {
    return this.tierListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tierListsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTierListDto: UpdateTierListDto,
  ) {
    return this.tierListsService.update(+id, updateTierListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tierListsService.remove(+id);
  }
}
