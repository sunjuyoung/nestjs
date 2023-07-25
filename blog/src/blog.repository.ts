import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

export interface BlogRepository {
  getAllPosts(): Promise<Blog[]>;
  createPost(postDto: PostDto): Promise<void>;
  getPostById(id: string): Promise<PostDto>;
  deletePostById(id: string): Promise<void>;
  updatePostById(id: string, postDto: PostDto): Promise<void>;
}

@Injectable()
export class BlogRepositoryImpl implements BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAllPosts(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }

  async createPost(postDto: PostDto) {
    const createPost = {
      ...postDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogModel.create(createPost);
  }

  async getPostById(id: string): Promise<PostDto> {
    return await this.blogModel.findById(id);
  }

  async deletePostById(id: string) {
    await this.blogModel.findByIdAndDelete(id);
  }

  async updatePostById(id: string, postDto: PostDto) {
    const updatePost = { id, ...postDto, updatedAt: new Date() };
    await this.blogModel.findByIdAndUpdate(id, updatePost);
  }
}
