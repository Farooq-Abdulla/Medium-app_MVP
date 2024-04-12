import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog, useGetUser } from "../hooks";
import JoditEditor from 'jodit-react';
import AppBar from "../components/AppBar";
import BlogSkeleton from "../components/BlogSkeleton";
import useAsyncEffect from "use-async-effect";

export default function EditBlog(){
    const {id}=useParams();
    const {blog}= useBlog({id:id||''})
    const [title,setTitle] =useState('');
    const navigate= useNavigate();
    const editor = useRef(null);
    const [content,setContent] =useState('');
    const { user, loading}= useGetUser();
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
    useEffect(()=>{
        setTitle(blog.title);
        setContent(blog.content);
    },[blog])

    if (loading){
        return <div><BlogSkeleton/></div>
    }


    const handleSubmit=async()=>{
        try {
            await axios.put(`${BACKEND_URL}/api/v1/blog/edit/${id}`,{
                content,
                title,
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setContent('');
            setTitle('');
            navigate('/blogs')
        } catch (error) {
            alert("Error while publishing the blog, Try again later");
            console.log("An error occurred while publishing:", error);
        }
    }
    return (
        <div>
            <AppBar/>
        <div className="max-w-4xl mx-auto mt-8 px-8 py-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-8">{user}, What do you want to edit ?</h1>
            <div className="mb-8">
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 py-3 px-4 mb-4 text-lg rounded-lg placeholder-gray-500"
                    placeholder={blog.title}
                />
            </div>
            <div className="mb-8">
                <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={newContent => setContent(newContent)}
                    className="bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 py-3 px-4 mb-4 text-lg rounded-lg placeholder-gray-500"
                />
            </div>
            <div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer">
                    Publish Edit
                </button>
            </div>
        </div>
    
        </div>   
    ); 
    
    
}