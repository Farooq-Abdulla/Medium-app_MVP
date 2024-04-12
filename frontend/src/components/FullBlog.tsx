import { Blog } from "../hooks"
import AppBar from "./AppBar"
import Avatar from "./Avatar"

export default function FullBlog({blog}:{blog:Blog}){
    return(
        <div>
            <AppBar/>
            <div className="flex justify-center ">
                <div className="grid grid-cols-12 px-10 w-full pt-48 max-w-screen-xl pt-12">
                    <div className="col-span-8 ">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-400 pt-2">
                            Posted on April 12th 2024
                        </div>
                        <div className=" pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4 ">
                        <div className="text-slate-600 text-lg pb-4">
                            Author
                        </div>
                        <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center  ">
                            <Avatar name={blog.author.name || "Farooq Abdulla"}/>
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Farooq Abdulla"}
                            </div>
                            <div className="pt-2 text-slate-500"> 
                                Random Catch Phrase about the author's ability to grab the user's attention 
                            </div>
                        </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )     
}