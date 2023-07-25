import { PostDto } from "./blog.model";



export class BlogService{
    posts = [];

    getAllPosts(){
        return this.posts;
    }

    createPost(postDto: PostDto){
        const id = this.posts.length + 1;
        this.posts.push({ id: id.toString(), ...postDto, createdAt: new Date() });
    }

    getPostById(id: string){
        const post = this.posts.find((post) => post.id === id);

        console.log(id)
        console.log(post)
        return post;
    }

    deletePostById(id: string){
        const filterPost = this.posts.filter((post) => post.id !== id);
        this.posts = [...filterPost];

    }

    updatePostById(id: string, postDto: PostDto){
        let updateIndex = this.posts.findIndex((post) => post.id === id);
        const updatePost = {id, ...postDto, updatedAt: new Date()};
        this.posts[updateIndex] = updatePost;

        return updatePost;

    }


}

