import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class AssignDepartmentsDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'Array of department IDs to assign to the staff',
    type: [Number],
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  departmentIds: number[];

  @ApiProperty({
    example: 1,
    description: 'Department ID to set as default',
  })
  @IsNotEmpty()
  @IsNumber()
  defaultDepartmentId: number;
}

export class UpdateStaffDepartmentDto {
  @ApiProperty({
    example: true,
    description: 'Set as default department',
  })
  @IsBoolean()
  isDefault: boolean;
}
