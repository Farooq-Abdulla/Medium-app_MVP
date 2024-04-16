import axios from "axios";
import {  useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks";
import AppBar from "../components/AppBar";
import BlogSkeleton from "../components/BlogSkeleton";
import useAsyncEffect from "use-async-effect";
import { Editor } from "novel-lightweight";




export default function Publish(){
    
    const [title,setTitle] =useState('');
    const navigate= useNavigate();
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
    if (loading){
        return <div><BlogSkeleton/></div>
    }
    
    
    const handleSubmit=async()=>{
        try {
            await axios.post(`${BACKEND_URL}/api/v1/blog`,{
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
            <h1 className="text-3xl font-bold mb-8">What are you thinking, {user}?</h1>
            <div className="mb-8">
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 py-3 px-4 mb-4 text-lg rounded-lg placeholder-gray-500"
                    placeholder="Title"
                />
            </div>
            <div className="mb-4">
            <Editor
                defaultValue={content}
                disableLocalStorage={true}
                onUpdate={(editor) => {
                    setContent(editor?.storage.markdown.getMarkdown());
                }}

                />
            </div>
            <div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer" >
                    Publish
                </button>
            </div>
        </div>
    
        </div>   
    ); 
    
    
}


// className="bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 py-3 px-4 mb-4 text-lg rounded-lg placeholder-gray-500"
