import { Post } from '@models';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { GraphStaff } from '@decorators';
import { CreatePostInput } from './dto/req/create-post.input';
import { UpdatePostInput } from './dto/req/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { name: 'posts', description: 'Get all posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post', description: 'Get post by ID' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post, { description: 'Create a new post' })
  createPost(
    @Args('input') createPostInput: CreatePostInput,
    @GraphStaff('id') staffId: string,
  ) {
    return this.postsService.create(createPostInput, staffId);
  }

  @Mutation(() => Post, { description: 'Update a post' })
  updatePost(
    @Args('id') id: string,
    @Args('input') updatePostInput: UpdatePostInput,
    @GraphStaff('id') staffId: string,
  ) {
    return this.postsService.update(id, updatePostInput, staffId);
  }

  @Mutation(() => String, { description: 'Delete a post' })
  async deletePost(
    @Args('id') id: string,
    @GraphStaff('id') staffId: string,
  ): Promise<string> {
    await this.postsService.remove(id, staffId);
    return `Post with ID ${id} deleted successfully`;
  }
}
