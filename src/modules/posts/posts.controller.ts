import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/req/update-post.dto';
import { Staff } from '@decorators';
import { StaffEntity } from '@database/entities/staff.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ApiErrorsResponse, ApiGetErrorsResponse } from '@decorators';
import { CreatePostDto } from './dto/req/create-post.dto';
import { PostItemDto } from './dto/res/post-res.dto';
import { Serialize } from '@interceptors';

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post has been successfully created.',
  })
  @ApiErrorsResponse()
  create(@Body() createPostDto: CreatePostDto, @Staff('id') staffId: string) {
    return this.postsService.create(createPostDto, staffId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all posts.',
    type: [PostItemDto],
  })
  @ApiGetErrorsResponse()
  @Serialize(PostItemDto)
  findAll(): Promise<PostItemDto[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({
    name: 'id',
    description: 'Post ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the post with the specified ID.',
    type: PostItemDto,
  })
  @ApiGetErrorsResponse()
  @Serialize(PostItemDto)
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PostItemDto> {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiParam({
    name: 'id',
    description: 'Post ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Post has been successfully updated.',
  })
  @ApiErrorsResponse()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Staff() staff: StaffEntity,
  ) {
    return this.postsService.update(id, updatePostDto, staff.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({
    name: 'id',
    description: 'Post ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Post has been successfully deleted.',
  })
  @ApiGetErrorsResponse()
  remove(@Param('id', ParseUUIDPipe) id: string, @Staff() staff: StaffEntity) {
    return this.postsService.remove(id, staff.id);
  }
}
