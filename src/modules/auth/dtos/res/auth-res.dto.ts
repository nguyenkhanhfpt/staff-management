import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StaffItemDto {
  @ApiProperty({ example: 1, description: 'Staff ID', type: Number })
  @Expose()
  id: number;

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
