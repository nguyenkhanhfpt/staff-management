import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class StaffItemDto {
  @ApiProperty({
    description: 'ID of the staff (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Name of the staff',
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Email of the staff',
    example: 'abc@gmail.com',
  })
  @Expose()
  email: string;
}

export class PostItemDto {
  @ApiProperty({
    description: 'ID of the post (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Title of the post',
    example: 'My First Post',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Content of the post',
    example: 'This is the content of my first post.',
  })
  @Expose()
  content: string;

  @ApiProperty({
    description: 'ID of the staff who created the post (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  staffId: string;

  @ApiProperty({
    description: 'Staff who created the post',
    type: () => StaffItemDto,
  })
  @Expose()
  @Type(() => StaffItemDto)
  staff: StaffItemDto;
}
