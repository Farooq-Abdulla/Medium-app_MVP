import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useGetUser } from "../hooks";
import MediumLogo from "../assets/Medium-Logo-Black-RGB.svg";

export default function AppBar(){
    const {user}= useGetUser();

    return(
        <div className="border-b flex justify-between px-10 py-3">
            <div className="flex ">
                <Link to={"/blogs"}>
                <div className="flex flex-col justify-center cursor-pointer h-14 w-28 ">
                    <img src={MediumLogo} alt="Medium"  className="cursor-pointer"/>
                </div>
                </Link>
                <div className="flex flex-col justify-center mx-5">
                    
                    <form className="flex items-center max-w-sm mx-auto">   
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="stroke-2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:outline-none focus:ring-black-500 focus:border-black-500 block w-full ps-10 p-2.5" placeholder="Search ..." required />
                        </div>
                    </form>

                </div>
            </div>
            <div>
                <Link to={"/publish"}>
                <button type="button" className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">New Blog</button>
                </Link>
                <Avatar name={user || "Anonymous"} type="topBar"/>
            </div>

        </div>
    )
}