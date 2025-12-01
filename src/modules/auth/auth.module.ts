import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from '@modules/auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '@modules/auth/strategies/refresh-token.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from '@database/entities/staff.entity';
import { IsExistEmailValidator } from '@shared/validators';
import { StaffsModule } from '@modules/staffs/staffs.module';
import { StaffsService } from '@modules/staffs/staffs.service';
import { PostEntity } from '@database/entities/post.entity';
import { StaffInfoEntity } from '@database/entities/staff-info.entity';
import { StaffDepartmentEntity } from '@database/entities/staff-department.entity';
import { DepartmentEntity } from '@database/entities/department.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      StaffEntity,
      PostEntity,
      StaffInfoEntity,
      StaffDepartmentEntity,
      DepartmentEntity,
    ]),
    StaffsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    IsExistEmailValidator,
    StaffsService,
  ],
})
export class AuthModule {}
