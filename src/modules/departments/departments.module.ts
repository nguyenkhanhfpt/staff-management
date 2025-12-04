import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { DepartmentEntity } from '@database/entities/department.entity';
import { StaffDepartmentEntity } from '@database/entities/staff-department.entity';
import { DepartmentResolver } from './department.resolver';
import { DepartmentResolverService } from './department-resolver.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentEntity, StaffDepartmentEntity]),
  ],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    DepartmentResolver,
    DepartmentResolverService,
  ],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
