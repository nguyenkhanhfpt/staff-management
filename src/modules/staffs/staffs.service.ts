import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from '@database/entities/staff.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PostEntity } from '@database/entities/post.entity';
import { GetStaffPostsResDto } from './dto/get-staff-posts-res.dto';
import { StaffInfoEntity } from '@database/entities/staff-info.entity';
import { CreateStaffInfoDto } from './dto/create-staff-info.dto';
import { UpdateStaffInfoDto } from './dto/update-staff-info.dto';
import { hashPassword } from '@shared/utils';
import { StaffDepartmentEntity } from '@database/entities/staff-department.entity';
import { DepartmentEntity } from '@database/entities/department.entity';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(StaffInfoEntity)
    private readonly staffInfoRepository: Repository<StaffInfoEntity>,
    @InjectRepository(StaffDepartmentEntity)
    private readonly staffDepartmentRepository: Repository<StaffDepartmentEntity>,
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async create(createStaffDto: CreateStaffDto): Promise<StaffEntity> {
    // Check if email already exists
    const existingStaff = await this.staffRepository.findOne({
      where: { email: createStaffDto.email },
    });

    if (existingStaff) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password if provided
    if (createStaffDto.password) {
      createStaffDto.password = await hashPassword(createStaffDto.password);
    }

    const staff = this.staffRepository.create(createStaffDto);
    return this.staffRepository.save(staff);
  }

  async findAll(): Promise<StaffEntity[]> {
    return this.staffRepository.find({
      relations: ['staffInfo'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<StaffEntity> {
    const staff = await this.staffRepository.findOne({
      where: { id },
      relations: ['staffInfo'],
    });

    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    return staff;
  }

  async update(
    id: string,
    updateStaffDto: UpdateStaffDto,
  ): Promise<StaffEntity> {
    const staff = await this.findOne(id);

    // Check if email is being changed and if it already exists
    if (updateStaffDto.email && updateStaffDto.email !== staff.email) {
      const existingStaff = await this.staffRepository.findOne({
        where: { email: updateStaffDto.email },
      });

      if (existingStaff) {
        throw new BadRequestException('Email already exists');
      }
    }

    // Hash password if being updated
    if (updateStaffDto.password) {
      updateStaffDto.password = await hashPassword(updateStaffDto.password);
    }

    Object.assign(staff, updateStaffDto);
    return this.staffRepository.save(staff);
  }

  async remove(id: string): Promise<{ message: string }> {
    const staff = await this.findOne(id);
    await this.staffRepository.remove(staff);
    return { message: `Staff with ID ${id} has been successfully deleted` };
  }

  async findOneBy(
    where: FindOptionsWhere<StaffEntity>,
    select?: (keyof StaffEntity)[],
    relations?: string[],
  ): Promise<StaffEntity | null> {
    return this.staffRepository.findOne({
      select: select,
      relations: relations,
      where,
    });
  }

  async findAllPosts(staffId: string): Promise<GetStaffPostsResDto[]> {
    // Verify staff exists
    await this.findOne(staffId);

    const posts = await this.postRepository
      .createQueryBuilder('p')
      .select(['p.id', 'p.title', 'p.content', 'p.createdAt'])
      .where('p.staffId = :staffId', { staffId })
      .orderBy('p.createdAt', 'DESC')
      .getMany();

    return posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
    }));
  }

  // Staff Info CRUD operations

  async createStaffInfo(
    createStaffInfoDto: CreateStaffInfoDto,
  ): Promise<StaffInfoEntity> {
    // Verify staff exists
    await this.findOne(createStaffInfoDto.staffId);

    // Check if staff info already exists
    const existingInfo = await this.staffInfoRepository.findOne({
      where: { staffId: createStaffInfoDto.staffId },
    });

    if (existingInfo) {
      throw new BadRequestException('Staff info already exists for this staff');
    }

    const staffInfo = this.staffInfoRepository.create(createStaffInfoDto);
    return this.staffInfoRepository.save(staffInfo);
  }

  async getStaffInfo(staffId: string): Promise<StaffInfoEntity> {
    // Verify staff exists
    await this.findOne(staffId);

    const staffInfo = await this.staffInfoRepository.findOne({
      where: { staffId },
    });

    if (!staffInfo) {
      throw new NotFoundException(
        `Staff info for staff ID ${staffId} not found`,
      );
    }

    return staffInfo;
  }

  async updateStaffInfo(
    staffId: string,
    updateStaffInfoDto: UpdateStaffInfoDto,
  ): Promise<StaffInfoEntity> {
    const staffInfo = await this.getStaffInfo(staffId);

    Object.assign(staffInfo, updateStaffInfoDto);
    return this.staffInfoRepository.save(staffInfo);
  }

  async deleteStaffInfo(staffId: string): Promise<{ message: string }> {
    const staffInfo = await this.getStaffInfo(staffId);
    await this.staffInfoRepository.remove(staffInfo);
    return {
      message: `Staff info for staff ID ${staffId} has been successfully deleted`,
    };
  }

  // Department assignment methods

  async assignDepartments(
    staffId: string,
    departmentIds: number[],
    defaultDepartmentId: number,
  ): Promise<StaffDepartmentEntity[]> {
    // Verify staff exists
    await this.findOne(staffId);

    // Verify all departments exist
    for (const deptId of departmentIds) {
      const dept = await this.departmentRepository.findOne({
        where: { id: deptId },
      });
      if (!dept) {
        throw new NotFoundException(`Department with ID ${deptId} not found`);
      }
    }

    // Verify default department is in the list
    if (!departmentIds.includes(defaultDepartmentId)) {
      throw new BadRequestException(
        'Default department must be in the list of assigned departments',
      );
    }

    // Remove existing department assignments
    await this.staffDepartmentRepository.delete({ staffId });

    // Create new assignments
    const assignments = departmentIds.map((departmentId) =>
      this.staffDepartmentRepository.create({
        staffId,
        departmentId,
        isDefault: departmentId === defaultDepartmentId,
      }),
    );

    return this.staffDepartmentRepository.save(assignments);
  }

  async getStaffDepartments(staffId: string): Promise<StaffDepartmentEntity[]> {
    // Verify staff exists
    await this.findOne(staffId);

    return this.staffDepartmentRepository.find({
      where: { staffId },
      relations: ['department'],
      order: { isDefault: 'DESC' },
    });
  }

  async setDefaultDepartment(
    staffId: string,
    departmentId: number,
  ): Promise<StaffDepartmentEntity> {
    // Verify assignment exists
    const assignment = await this.staffDepartmentRepository.findOne({
      where: { staffId, departmentId },
    });

    if (!assignment) {
      throw new NotFoundException(
        `Staff is not assigned to department with ID ${departmentId}`,
      );
    }

    // Remove default from all other departments
    await this.staffDepartmentRepository.update(
      { staffId, isDefault: true },
      { isDefault: false },
    );

    // Set this as default
    assignment.isDefault = true;
    return this.staffDepartmentRepository.save(assignment);
  }

  async removeDepartmentAssignment(
    staffId: string,
    departmentId: number,
  ): Promise<{ message: string }> {
    const assignment = await this.staffDepartmentRepository.findOne({
      where: { staffId, departmentId },
    });

    if (!assignment) {
      throw new NotFoundException(
        `Staff is not assigned to department with ID ${departmentId}`,
      );
    }

    if (assignment.isDefault) {
      throw new BadRequestException(
        'Cannot remove default department. Please set another department as default first.',
      );
    }

    await this.staffDepartmentRepository.remove(assignment);
    return {
      message: `Department assignment removed successfully`,
    };
  }
}
