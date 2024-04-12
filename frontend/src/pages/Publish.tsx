import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks";

export default function Publish(){
    const [content,setContent] =useState('');
    const [title,setTitle] =useState('');
    const navigate= useNavigate();
    const { user, loading}= useGetUser();
    if (loading){
        return <div>Loading...</div>
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
    return(
        <div className="">
            <h1>What are you thinking {user}?</h1>
            <h2>Title</h2>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="border border-black"></input>
            <h2>Content</h2>
            <textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={5} cols={40} className="border border-black"></textarea>
            <br />
            <button onClick={handleSubmit} className="border border-black">Publish</button>

        </div>
    )
}