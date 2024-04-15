import axios from "axios";
import { useState } from "react"
import useAsyncEffect from "use-async-effect";
import { BACKEND_URL } from "../config";


export interface Blog{
    content: string;
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    author:{
        name: string;
        id: number;
    }
}
export  function useBlogs(){
    const [loading, setLoading] =useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useAsyncEffect(async()=>{
        const res=await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        setBlogs(res.data);
        setLoading(false);

    },[]);
    return {loading,blogs};
};

export function useBlog({id}:{id:string}){
    const [loading, setLoading] =useState(true);
    const [blog, setBlog] = useState({
        content: '',
        id: 0,
        title: '',
        createdAt: '',
        updatedAt: '',
        author:{
            name: '',
            id:0
        }
    });
    useAsyncEffect(async()=>{
        const res=await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        setBlog(res.data);
        setLoading(false);
    },[id]);
    return {loading,blog};
}

export function useGetUser():{ user: string | undefined; loading: boolean }{
    const [loading, setLoading] =useState(true);
    const [user, setUser] = useState<string>();
   try {

    useAsyncEffect(async()=>{
        const res=await axios.get(`${BACKEND_URL}/api/v1/blog/getUser`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUser(res.data.name);
        setLoading(false);
    },[]);
   } catch (error) {
    console.log("An error occurred and in catch block");
    setLoading(false);
    
   }
    return {loading,user};
}

export function useCheckAuthorization(blogAuthorId: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/getUser`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const same = res.data.id === blogAuthorId;
        resolve(same);
      } catch (error) {
        console.log("useCheckAuthorization failed:", error);
        reject(error);
      }
    });
  }

  export async function checkAuthorization(blogAuthorId: number): Promise<boolean> {
    try {
      return await useCheckAuthorization(blogAuthorId);
    } catch (error) {
      console.error("Error checking authorization:", error);
      return false;
    }
  }
  


// export function useEditBlogHook(blogId:Number){
//     const [loading, setLoading] =useState(true);
//     const [blog, setBlog] = useState<Blog>({
//         content: '',
//         id: 0,
//         title: '',
//         createdAt: '',
//         updatedAt: '',
//         author:{
//             name: '',
//             id:0
//         }
//     });
//     useAsyncEffect(async()=>{
//         const res=await axios.get(`${BACKEND_URL}/api/v1/blog/edit/${blogId}`,{
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         });
//         setBlog(res.data);
//         setLoading(false);
//     },[blogId]);
//     return {loading,blog};
// }