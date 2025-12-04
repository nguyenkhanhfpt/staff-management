import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StaffItemDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Staff ID',
    type: String,
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the staff',
    type: String,
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'Email address of the staff',
    type: String,
  })
  @Expose()
  email: string;
}

export class GetStaffResDto extends StaffItemDto {}
