import useAsyncEffect from "use-async-effect";
import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Blogs(){
    const navigate = useNavigate();
    useAsyncEffect(async()=>{
        try {
         await axios.get(`${BACKEND_URL}/api/v1/blog/getUser`,{
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token')}`
             }
         });
         navigate('/blogs');
        } catch (error) {
         navigate('/signin');
        }
     },[navigate])
    const {blogs,loading}= useBlogs();
    if(loading){
        return <div><BlogSkeleton/></div>
    }
    function todaysDate(createdDate:string){
        const isoDateString = createdDate;
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        return formattedDate;
    }
    // console.log('Original blogs:', blogs);
    const reversedBlogs = [...blogs].reverse();
    // console.log('Reversed blogs:', reversedBlogs);
    


    return (
        <div>
            <AppBar/>
            <div className="flex justify-center">
            <div className="">
                
                {reversedBlogs.map(blog =>
                <BlogCard 
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Farooq Abdulla"}
                    title={blog.title} 
                    content={blog.content}
                    publishedDate={todaysDate(blog.createdAt)}
                />)}
                
            </div>
        </div>
        </div>
        
    )
}