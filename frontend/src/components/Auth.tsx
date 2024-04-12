import { useState } from "react";
import InputBox from "./InputBox";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@farooq_abdulla/medium-app-common";
import Button from "./Button";
import axios from "axios";
import {BACKEND_URL} from "../config";



interface Type{
    type: "signup"|"signin"
}
export default function Auth({type}: Type){
    const navigate = useNavigate();
    const [postInputs, setPostInputs]= useState<SignupInput>({
        email: "",
        password: "",
        name: "",
    });
    
    async function sendRequest() {
        try {
            const res=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signin"?"signin":"signup"}`,{
                email: postInputs.email,
                password: postInputs.password,
                name: postInputs.name,
            })
            const jwt = res.data.token;
            localStorage.setItem("token", jwt);
            navigate('/blogs')
        } catch (error) {
            navigate(type==="signup"?"/signup":"/signin");
            alert("Try again/ problem with credentials");
            console.log("An error occurred:", error);
        }
    }

    return(
        <div className="h-screen flex justify-center flex-cols items-center">
            <div className="box-border w-6/12  ">
                <div className="font-bold text-3xl text-center mb-4">
                    {type === "signup" ? "Create an account" : "Login"}
                </div>
                <div className="font-extralight m-px text-center text-slate-400">
                    {type==="signup"? "Already have an account":"Create an account"} <span className="cursor-pointer underline hover:text-blue-400"><Link to={type=="signup"? '/signin':'/signup'}>{type ==="signup"? "Login":"SignUp"}</Link></span>
                </div>
                <div className="pt-4">
                    {type==="signup"? <InputBox label="name" type="text" placeholder="Enter your name" onChange={(e)=>setPostInputs({...postInputs, name: e.target.value})}/>:""}
                    <InputBox label="email" type="email" placeholder="Enter your email" onChange={(e)=>setPostInputs({...postInputs, email: e.target.value})}/>
                    <InputBox label="password" type="password" placeholder="Enter your password" onChange={(e)=>setPostInputs({...postInputs, password: e.target.value})}/>
                    <Button buttonText={type==="signup"? "Sign Up":"Sign In"} onClick={sendRequest}/>
                </div>
            </div>

        </div>
    )
}