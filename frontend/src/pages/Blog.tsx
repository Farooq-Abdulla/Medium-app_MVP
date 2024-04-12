import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog";
import { useNavigate, useParams } from "react-router-dom";
import BlogSkeleton from "../components/BlogSkeleton";
import useAsyncEffect from "use-async-effect";
import { BACKEND_URL } from "../config";
import axios from "axios";



function Blog() {
  const {id}= useParams();
  const navigate = useNavigate();
  useAsyncEffect(async()=>{
    try {
     await axios.get(`${BACKEND_URL}/api/v1/blog/getUser`,{
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
     });
    } catch (error) {
     navigate('/signin');
    }
 },[navigate])
  
  const {blog, loading}= useBlog({id:id||''});
  if(loading){
    return <div><BlogSkeleton/></div>
  }
  return (
    <div>
      <FullBlog blog={blog}/>
    </div>
  )
}

export default Blog