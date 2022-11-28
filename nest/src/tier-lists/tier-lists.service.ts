import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTierListDto } from './dto/create-tier-list.dto';
import { UpdateTierListDto } from './dto/update-tier-list.dto';
import { TierList } from './entities/tier-list.entity';

@Injectable()
export class TierListsService {
  constructor(
    @InjectRepository(TierList)
    private tierListsRepository: Repository<TierList>,
  ) {}

  async create(createTierListDto: CreateTierListDto) {
    const tierList = this.tierListsRepository.create(createTierListDto);

    await this.tierListsRepository.insert(tierList);

    return tierList;
  }

  async findAll() {
    return this.tierListsRepository.find();
  }

  async findOne(slug: string) {
    const tierList = await this.tierListsRepository.findOneBy({ slug });

    if (!tierList) {
      throw new NotFoundException(`Tier list with slug "${slug}" not found.`);
    }

    return tierList;
  }

  async update(slug: string, updateTierListDto: UpdateTierListDto) {
    const tierList = await this.tierListsRepository.findOneBy({ slug });

    if (!tierList) {
      throw new NotFoundException(`Tier list with slug "${slug}" not found.`);
    }

    await this.tierListsRepository.update({ slug }, Object.assign(tierList, updateTierListDto));

    return tierList;
  }

  async remove(slug: string) {
    const result = await this.tierListsRepository.delete({ slug });

    if (result.affected === 0) {
      throw new NotFoundException(`Tier list with slug "${slug}" not found.`);
    }

    return result;
  }
}
