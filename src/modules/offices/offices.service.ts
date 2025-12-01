import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficeEntity } from '@database/entities/office.entity';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';

@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(OfficeEntity)
    private readonly officeRepository: Repository<OfficeEntity>,
  ) {}

  async create(createOfficeDto: CreateOfficeDto): Promise<OfficeEntity> {
    const office = this.officeRepository.create(createOfficeDto);
    return this.officeRepository.save(office);
  }

  async findAll(): Promise<OfficeEntity[]> {
    return this.officeRepository.find({
      relations: ['staffInfos', 'staffInfos.staff'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<OfficeEntity> {
    const office = await this.officeRepository.findOne({
      where: { id },
      relations: ['staffInfos', 'staffInfos.staff'],
    });

    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }

    return office;
  }

  async update(
    id: number,
    updateOfficeDto: UpdateOfficeDto,
  ): Promise<OfficeEntity> {
    const office = await this.findOne(id);

    Object.assign(office, updateOfficeDto);
    return this.officeRepository.save(office);
  }

  async remove(id: number): Promise<{ message: string }> {
    const office = await this.findOne(id);

    await this.officeRepository.remove(office);
    return {
      message: `Office with ID ${id} has been successfully deleted`,
    };
  }
}
