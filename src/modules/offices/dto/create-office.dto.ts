import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOfficeDto {
  @ApiProperty({
    example: 'Main Office',
    description: 'Name of the office',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '123 Main Street, New York, NY 10001',
    description: 'Office location/address',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;
}
