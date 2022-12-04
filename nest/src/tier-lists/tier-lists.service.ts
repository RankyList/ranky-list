import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TierList } from './entities/tier-list.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class TierListsService extends TypeOrmCrudService<TierList> {
  constructor(@InjectRepository(TierList) repository: Repository<TierList>) {
    super(repository);
  }
}
