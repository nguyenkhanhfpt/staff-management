import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    example: 'Engineering Department',
    description: 'Full name of the department',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'ENG',
    description: 'Short name/code of the department',
  })
  @IsNotEmpty()
  @IsString()
  shortName: string;

  @ApiProperty({
    example: 1,
    description: 'Parent department ID (for hierarchical structure)',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  parentId?: number;
}
