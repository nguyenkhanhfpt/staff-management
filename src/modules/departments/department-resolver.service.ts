import { DepartmentEntity } from '@database/entities/department.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentResolverService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async findAll(): Promise<DepartmentEntity[]> {
    return this.departmentRepository.find({
      relations: ['parent', 'children'],
    });
  }

  async findAllRoot(): Promise<DepartmentEntity[]> {
    return this.departmentRepository.find({
      where: { parentId: null },
      relations: ['children'],
    });
  }

  async findOne(id: number): Promise<DepartmentEntity> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async findWithStaff(id: number): Promise<DepartmentEntity> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: [
        'parent',
        'children',
        'staffDepartments',
        'staffDepartments.staff',
      ],
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async create(
    createDepartmentInput: CreateDepartmentInput,
  ): Promise<DepartmentEntity> {
    const { parentId } = createDepartmentInput;

    // Validate parent exists if parentId is provided
    if (parentId) {
      await this.findOne(parentId);
    }

    const department = this.departmentRepository.create(createDepartmentInput);
    return this.departmentRepository.save(department);
  }

  async update(
    id: number,
    updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<DepartmentEntity> {
    const department = await this.findOne(id);

    // Check for circular reference if parentId is being updated
    if (updateDepartmentInput.parentId !== undefined) {
      if (updateDepartmentInput.parentId === id) {
        throw new BadRequestException('Department cannot be its own parent');
      }

      if (updateDepartmentInput.parentId) {
        await this.checkCircularReference(id, updateDepartmentInput.parentId);
      }
    }

    Object.assign(department, updateDepartmentInput);
    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<string> {
    const department = await this.findOne(id);
    await this.departmentRepository.softRemove(department);
    return `Department with ID ${id} has been successfully deleted`;
  }

  private async checkCircularReference(
    departmentId: number,
    newParentId: number,
  ): Promise<void> {
    let currentParentId = newParentId;

    while (currentParentId) {
      if (currentParentId === departmentId) {
        throw new BadRequestException(
          'Cannot set parent: This would create a circular reference',
        );
      }

      const parent = await this.departmentRepository.findOne({
        where: { id: currentParentId },
        select: ['id', 'parentId'],
      });

      if (!parent) {
        throw new NotFoundException(
          `Parent department with ID ${currentParentId} not found`,
        );
      }

      currentParentId = parent.parentId;
    }
  }
}
