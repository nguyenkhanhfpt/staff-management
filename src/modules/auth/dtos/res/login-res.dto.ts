import { ApiProperty } from '@nestjs/swagger';
import { StaffItemDto } from './auth-res.dto';
import { Expose, Type } from 'class-transformer';

export class GetTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsImlhdCI6MTY4ODUwMDE2NSwiZXhwIjoxNjg4NTg2NTY1fQ.4b8X0nVYd7v3hXHh1vZyWgWqk3fX9v1K3bF8w5Z6kYk',
    description: 'Access token of the staff',
    type: String,
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsImlhdCI6MTY4ODUwMDE2NSwiZXhwIjoxNjg4NTg2NTY1fQ.4b8X0nVYd7v3hXHh1vZyWgWqk3fX9v1K3bF8w5Z6kYk',
    description: 'Refresh token of the staff',
    type: String,
  })
  @Expose()
  refreshToken: string;
}

export class LoginResDto extends GetTokenDto {
  @ApiProperty({ type: StaffItemDto, description: 'Staff information' })
  @Expose()
  @Type(() => StaffItemDto)
  staff: StaffItemDto;
}
