import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '@database/entities/post.entity';
import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto, staffId: string) {
    const post = this.postRepository.create({
      ...createPostDto,
      staffId,
    });
    return this.postRepository.save(post);
  }

  async findAll() {
    return this.postRepository.find({
      relations: ['staff'],
    });
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['staff'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, staffId: string) {
    const post = await this.findOne(id);

    if (post.staffId !== staffId) {
      throw new NotFoundException('Post not found');
    }

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: string, staffId: string) {
    const post = await this.findOne(id);

    if (post.staffId !== staffId) {
      throw new NotFoundException('Post not found');
    }

    await this.postRepository.remove(post);
    return { id };
  }
}
