import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from '@database/entities/staff.entity';
import { StaffsResolver } from './staff.resolver';
import { PostEntity } from '@database/entities/post.entity';
import { StaffInfoEntity } from '@database/entities/staff-info.entity';
import { StaffDepartmentEntity } from '@database/entities/staff-department.entity';
import { DepartmentEntity } from '@database/entities/department.entity';
import { OfficeEntity } from '@database/entities/office.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StaffEntity,
      PostEntity,
      StaffInfoEntity,
      StaffDepartmentEntity,
      DepartmentEntity,
      OfficeEntity,
    ]),
  ],
  controllers: [StaffsController],
  providers: [StaffsService, StaffsResolver],
  exports: [StaffsService],
})
export class StaffsModule {}
