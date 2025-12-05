import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity } from '@database/entities/staff.entity';

@Injectable()
export class StaffResolverService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
  ) {}

  async findAll(): Promise<StaffEntity[]> {
    return this.staffRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<StaffEntity> {
    return this.staffRepository.findOne({
      where: { id },
      relations: ['staffInfo'],
    });
  }
}
