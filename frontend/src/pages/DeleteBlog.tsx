// import { useNavigate, useParams } from "react-router-dom"
// import { checkAuthorization, useBlog, useCheckAuthorization } from "../hooks";
// import axios from "axios";
// import { BACKEND_URL } from "../config";
// import useAsyncEffect from "use-async-effect";
// import BlogSkeleton from "../components/BlogSkeleton";

// export default async function Delete(){
//     const navigate = useNavigate();
//     const {id} = useParams();
//     const {blog,loading}= useBlog({id:id||''});
    
    
//     if(loading){
//         return <div><BlogSkeleton/></div>
//     }
    
//     useAsyncEffect(async () => {
//         const same = await checkAuthorization(blog.author.id);
//         if (same) {
//           console.log("Inside if loop");
//           await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           });
//           navigate("/blogs");
//         }else{
//             navigate("/blogs");
//             alert("You are not allowed to")
//         }
//       }, [same]); 

//     if (loading){
//         return <div><BlogSkeleton/></div>
//     }
//     return(
//         <div>
//         </div>
//     )
// }


import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkAuthorization, useBlog } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";
import useAsyncEffect from "use-async-effect";
import BlogSkeleton from "../components/BlogSkeleton";

const Delete = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });

  useEffect(() => {
    const fetchData = async () => {
      if (!loading) {
        const same = await checkAuthorization(blog.author.id);
        if (same) {
          try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            navigate("/blogs");
          } catch (error) {
            console.error("Error deleting blog:", error);
          }
        } else {
          navigate("/blogs");
          alert("You are not allowed to delete this blog.");
        }
      }
    };
    fetchData();
  }, [blog, loading, navigate]);

  if (loading) {
    return <BlogSkeleton />;
  }

  return <div />;
};

export default Delete;
