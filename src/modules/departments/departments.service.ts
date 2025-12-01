import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentEntity } from '@database/entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentEntity> {
    // Validate parent department exists if parentId is provided
    if (createDepartmentDto.parentId) {
      const parentDepartment = await this.departmentRepository.findOne({
        where: { id: createDepartmentDto.parentId },
      });

      if (!parentDepartment) {
        throw new NotFoundException(
          `Parent department with ID ${createDepartmentDto.parentId} not found`,
        );
      }
    }

    const department = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(department);
  }

  async findAll(): Promise<DepartmentEntity[]> {
    return this.departmentRepository.find({
      relations: ['parent', 'children'],
      order: { name: 'ASC' },
    });
  }

  async findAllRoot(): Promise<DepartmentEntity[]> {
    // Get all departments without a parent (root departments)
    return this.departmentRepository.find({
      where: { parentId: null },
      relations: ['children'],
      order: { name: 'ASC' },
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

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<DepartmentEntity> {
    const department = await this.findOne(id);

    // Prevent self-referencing
    if (updateDepartmentDto.parentId === id) {
      throw new BadRequestException('A department cannot be its own parent');
    }

    // Validate parent department exists if parentId is being updated
    if (
      updateDepartmentDto.parentId &&
      updateDepartmentDto.parentId !== department.parentId
    ) {
      const parentDepartment = await this.departmentRepository.findOne({
        where: { id: updateDepartmentDto.parentId },
      });

      if (!parentDepartment) {
        throw new NotFoundException(
          `Parent department with ID ${updateDepartmentDto.parentId} not found`,
        );
      }

      // Prevent circular references
      const isCircular = await this.checkCircularReference(
        id,
        updateDepartmentDto.parentId,
      );

      if (isCircular) {
        throw new BadRequestException(
          'This operation would create a circular reference in the department hierarchy',
        );
      }
    }

    Object.assign(department, updateDepartmentDto);
    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<{ message: string }> {
    const department = await this.findOne(id);

    // Check if department has children
    if (department.children && department.children.length > 0) {
      throw new BadRequestException(
        'Cannot delete department with child departments. Please reassign or delete child departments first.',
      );
    }

    await this.departmentRepository.remove(department);
    return {
      message: `Department with ID ${id} has been successfully deleted`,
    };
  }

  /**
   * Check if setting newParentId as parent of departmentId would create a circular reference
   */
  private async checkCircularReference(
    departmentId: number,
    newParentId: number,
  ): Promise<boolean> {
    let currentParentId: number | null = newParentId;

    while (currentParentId) {
      if (currentParentId === departmentId) {
        return true; // Circular reference detected
      }

      const parent = await this.departmentRepository.findOne({
        where: { id: currentParentId },
        select: ['id', 'parentId'],
      });

      if (!parent) {
        break;
      }

      currentParentId = parent.parentId;
    }

    return false;
  }
}
