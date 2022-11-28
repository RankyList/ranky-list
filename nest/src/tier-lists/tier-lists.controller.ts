import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TierListsService } from './tier-lists.service';
import { CreateTierListDto } from './dto/create-tier-list.dto';
import { UpdateTierListDto } from './dto/update-tier-list.dto';
import { ApiCreatedResponse, ApiFoundResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseTierListDto } from './dto/response-tier-list.dto';

@Controller('tier-lists')
@ApiTags('tier-list')
export class TierListsController {
  constructor(private readonly tierListsService: TierListsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tier list.' })
  @ApiCreatedResponse({ description: 'The tier list was successfully created.', type: ResponseTierListDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  create(@Body() createTierListDto: CreateTierListDto) {
    return this.tierListsService.create(createTierListDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all the tier lists.' })
  findAll() {
    return this.tierListsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Find a tier list by its slug.' })
  @ApiFoundResponse({ description: 'The tier list was found.', type: ResponseTierListDto })
  @ApiNotFoundResponse({
    description: 'The tier list was not found.',
    schema: { type: 'object', example: new NotFoundException('Tier list with slug ":slug" not found.').getResponse() }
  })
  findOne(@Param('slug') slug: string) {
    return this.tierListsService.findOne(slug);
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'Update a tier list by its slug.' })
  update(
    @Param('slug') slug: string,
    @Body() updateTierListDto: UpdateTierListDto,
  ) {
    return this.tierListsService.update(slug, updateTierListDto);
  }

  @Delete(':slug')
  @ApiOperation({ summary: 'Delete a tier list by its slug.' })
  remove(@Param('slug') slug: string) {
    return this.tierListsService.remove(slug);
  }
}
