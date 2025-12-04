import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DepartmentResolverService } from './department-resolver.service';
import { Department } from '@models/department.model';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(
    private readonly departmentResolverService: DepartmentResolverService,
  ) {}

  @Query(() => [Department], { name: 'departments' })
  async findAllDepartments(): Promise<Department[]> {
    return this.departmentResolverService.findAll();
  }

  @Query(() => [Department], {
    name: 'rootDepartments',
    description: 'Get all root departments (no parent)',
  })
  async findRootDepartments(): Promise<Department[]> {
    return this.departmentResolverService.findAllRoot();
  }

  @Query(() => Department, { name: 'department' })
  async findOneDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Department> {
    return this.departmentResolverService.findOne(id);
  }

  @Query(() => Department, { name: 'departmentWithStaff' })
  async findDepartmentWithStaff(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Department> {
    return this.departmentResolverService.findWithStaff(id);
  }

  @Mutation(() => Department, { name: 'createDepartment' })
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    return this.departmentResolverService.create(createDepartmentInput);
  }

  @Mutation(() => Department, { name: 'updateDepartment' })
  async updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<Department> {
    return this.departmentResolverService.update(id, updateDepartmentInput);
  }

  @Mutation(() => String, { name: 'deleteDepartment' })
  async deleteDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.departmentResolverService.remove(id);
  }
}
