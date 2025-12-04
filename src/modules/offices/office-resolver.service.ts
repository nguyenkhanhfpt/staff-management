import { OfficeEntity } from '@database/entities/office.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfficeInput } from './dto/create-office.input';
import { UpdateOfficeInput } from './dto/update-office.input';

@Injectable()
export class OfficeResolverService {
  constructor(
    @InjectRepository(OfficeEntity)
    private readonly officeRepository: Repository<OfficeEntity>,
  ) {}

  async findAll(): Promise<OfficeEntity[]> {
    return this.officeRepository.find();
  }

  async findOne(id: number): Promise<OfficeEntity> {
    const office = await this.officeRepository.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }
    return office;
  }

  async create(createOfficeInput: CreateOfficeInput): Promise<OfficeEntity> {
    const office = this.officeRepository.create(createOfficeInput);
    return this.officeRepository.save(office);
  }

  async update(
    id: number,
    updateOfficeInput: UpdateOfficeInput,
  ): Promise<OfficeEntity> {
    const office = await this.findOne(id);
    Object.assign(office, updateOfficeInput);
    return this.officeRepository.save(office);
  }

  async remove(id: number): Promise<string> {
    const office = await this.findOne(id);
    await this.officeRepository.softRemove(office);
    return `Office with ID ${id} has been successfully deleted`;
  }
}
