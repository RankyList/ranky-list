import { Injectable } from '@nestjs/common';
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

  create(createTierListDto: CreateTierListDto) {
    return 'This action adds a new tierList';
  }

  findAll() {
    return this.tierListsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tierList`;
  }

  update(id: number, updateTierListDto: UpdateTierListDto) {
    return `This action updates a #${id} tierList`;
  }

  remove(id: number) {
    return `This action removes a #${id} tierList`;
  }
}
