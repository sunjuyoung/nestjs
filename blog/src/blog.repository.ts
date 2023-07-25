import { readFile, writeFile } from "fs/promises";
import { PostDto } from "./blog.model";

export interface BlogRepository {
    getAllPosts(): Promise<PostDto[]>;
    createPost(postDto: PostDto): Promise<void>;
    getPostById(id: string): Promise<PostDto>;
    deletePostById(id: string): Promise<void>;
    updatePostById(id: string, postDto: PostDto): Promise<void>;
}