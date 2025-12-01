import { IsNotEmpty } from 'class-validator';
import { StaffEntity } from '@database/entities/staff.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  public static readonly resource = StaffEntity.name;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email of the staff',
    type: String,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password of the staff',
    type: String,
  })
  @IsNotEmpty()
  password: string;
}
