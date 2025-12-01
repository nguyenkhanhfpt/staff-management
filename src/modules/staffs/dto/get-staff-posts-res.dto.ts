import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetStaffPostsResDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Post ID (UUID)',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: 'My first post', description: 'Post title' })
  @Expose()
  title: string;

  @ApiProperty({
    example: 'This is my first post content',
    description: 'Post content',
  })
  @Expose()
  content: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Post created at',
  })
  @Expose()
  createdAt: string;
}
