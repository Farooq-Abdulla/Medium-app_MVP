import { ChangeEvent } from "react"

interface InputBoxProps{
    label: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
}
export default function InputBox({label, placeholder, onChange,type}:InputBoxProps){
    return(
        <div>
            <div>
                <label htmlFor={label} className="block mb-2 text-sm font-medium text-black mt-2 "> {label.toLocaleUpperCase()}</label>
                <input onChange={onChange} type={type} id={label}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
            </div>
        </div>
    )
}