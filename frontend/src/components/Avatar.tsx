
import { Button, Popover } from "flowbite-react";
import { useNavigate } from "react-router-dom";





interface Initials{
    name: string
    type:'topBar'|'bottom'
}
export default function Avatar({name, type}:Initials){
    const navigate= useNavigate();
    function signOutHandler(){
        localStorage.removeItem('token');
        navigate("/signin")
    
    }
    const content=(
        <div className="w-24 text-sm  border-0 rounded-lg bg-white	">
            <div className=" border-b border-gray-200  px-3 py-2 text-center text-slate-400 hover:bg-black cursor-pointer">
                <p className="font-extralight " onClick={signOutHandler}>Sign Out</p>
            </div>
            <div className="border-b border-gray-200  px-3 py-2 text-center text-slate-400 hover:bg-black cursor-pointer">
                <p className="font-extralight  ">Edit</p>
            </div>
        </div>
    )
    return(
            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow:hidden  bg-gray-400 rounded-full ">
            <span className="font-sm text-gray-800 ">
                {type==='bottom'? name[0].toUpperCase():
                    <Popover content={content} trigger="hover">
                    <Button className="text-black bg-slate-400">{name[0].toUpperCase()}</Button>
                </Popover>
                }
            </span>

            </div>
            
        
    )
}



