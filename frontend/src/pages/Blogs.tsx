import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

export default function Blogs(){
    const {blogs,loading}= useBlogs();
    if(loading){
        return <div>Loading...</div>
    }
    return (
        <div>
            <AppBar/>
            <div className="flex justify-center">
            <div className="">
                
                {blogs.map(blog =>
                <BlogCard 
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Farooq Abdulla"}
                    title={blog.title} 
                    content={blog.content}
                    publishedDate="April 11th, 2024"
                />)}
                
            </div>
        </div>
        </div>
        
    )
}