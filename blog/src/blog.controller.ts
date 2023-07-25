import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { PostDto } from "./blog.model";


@Controller('blog')
export class BlogController {
    blogService: BlogService;

    constructor(){
        this.blogService = new BlogService();
    }

@Get()
getAllPosts() {
   return this.blogService.getAllPosts();
}

@Post()
createPost(@Body() postDto: PostDto) {
    this.blogService.createPost(postDto);
    return "success";
}

@Get('/:id')
getPostById(@Param('id') id: string) {
    return this.blogService.getPostById(id);
}

@Delete('/:id')
deletePostById(@Param('id') id: string) {
    this.blogService.deletePostById(id);
    return "success";

}

@Put('/:id')
updatePostById(@Param('id') id: string, @Body() post: any) {
    this.blogService.updatePostById(id, post);
    return "success";
}

}

