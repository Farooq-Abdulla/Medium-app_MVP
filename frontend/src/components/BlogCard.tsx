import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { Popover } from "flowbite-react";



interface BlogCardProps{
    id: Number
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
}
export default function BlogCard({authorName, title, content, publishedDate,id}: BlogCardProps){
    const navigate= useNavigate();
    function deleteBlog(){
        navigate(`/delete/${id}`);
    }
    
    const contentOfPopOver=(
        <div className="w-24 text-sm  border-0 rounded-lg bg-white	">
            <div className=" border-b border-gray-200  px-3 py-2 text-center text-slate-400 hover:bg-black cursor-pointer">
                <p className="font-extralight " onClick={deleteBlog}>Delete</p>
            </div>
            
        </div>
    )
    
    return(
        
        <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer ">
            <div className="flex">
                    <Avatar name={authorName} type="bottom"/> 

                <div className="font-extralight text-sm pl-2 flex justify-center  flex-col">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2 flex justify-center  flex-col">
                    <Circle/>
                </div>
                <div className="pl-2 font-thin text-sm text-slate-400 flex justify-center  flex-col">
                    {publishedDate}
                </div>
                <div className="flex flex-col justify-center ml-96" >
                    <div>
                    <Popover content={contentOfPopOver} trigger="hover">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
                    </Popover>
                    </div>
                </div>
            </div>
            <Link to={`/blog/${id}`}>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,150)+"..."}
            </div>
            <div className="text-slate-400 pt-4 text-sm font-extralight">
                {`${Math.ceil(content.length/100)} minutes read`}
            </div>
            </Link>
        </div>
        
    )
};

function Circle(){
    return(
        <div className="h-1 w-1 rounded-full bg-slate-400">

        </div>
    )
}



