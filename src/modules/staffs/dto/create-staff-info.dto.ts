import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateStaffInfoDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Staff ID (UUID)',
  })
  @IsNotEmpty()
  @IsUUID()
  staffId: string;

  @ApiProperty({
    example: '+84 123 456 789',
    description: 'Phone number',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: '123 Main Street, City, Country',
    description: 'Address',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'TAX123456',
    description: 'Tax code',
    required: false,
  })
  @IsOptional()
  @IsString()
  taxCode?: string;

  @ApiProperty({
    example: 'ID123456789',
    description: 'ID code / National ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  idCode?: string;

  @ApiProperty({
    example: 'Engineering',
    description: 'Department',
    required: false,
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({
    example: 'Senior Developer',
    description: 'Position/Job title',
    required: false,
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'Start date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({
    example: 'Vietnamese',
    description: 'Nationality',
    required: false,
  })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({
    example: 'Additional notes about the staff',
    description: 'Notes',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    example: 1,
    description: 'Office ID',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  officeId?: number;
}
