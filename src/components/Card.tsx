import React from 'react'
import { LuClipboard } from "react-icons/lu";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import toast, { useToaster } from 'react-hot-toast';

interface CardProps {
  id: number,
  _id?: string,
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  avatar: string,
  domain: string,
  available: boolean,
  handleClick:any
}


const Card:React.FC <CardProps> = ({id, firstName, lastName, email, gender, avatar, domain, available, handleClick}) => {
  return (
    <div className='bg-neutral-800 relative shadow-lg w-80 border-2 border-neutral-700 rounded-2xl h-fit p-4 flex flex-col justify-center items-center gap-3'>
        <img loading='lazy' className='w-28 rounded-full border-2 border-teal-700' src={avatar.split('?')[0]} alt="avatar" />
        <div className='w-full flex flex-col items-center justify-center gap-2'>
            <h2 className='text-2xl text-white font-sans font-semibold'>{`${firstName} ${lastName}`}</h2>
            <h3 className='text-teal-600 font-semibold bg-teal-200 p-2 py-1 rounded-md'>{domain}</h3>
            <h3 className='rounded-sm bg-teal-700 p-1 absolute text-teal-300 top-4 right-4'>{gender.toLowerCase() === "male" ? <IoMdMale size={20} /> : <IoMdFemale size={20} />}</h3>
            <p onClick={()=> {
                navigator.clipboard.writeText(email)
                toast.success("email copied")
              }} className='flex justify-center items-center cursor-pointer gap-2 text-teal-800 bg-gray-200 rounded-lg px-2 py-1'>{email} <LuClipboard size={16}/></p>
        </div>
        <div className={`rounded-full w-4 h-4 absolute top-3 left-3 ${available ? "bg-green-500" : "bg-neutral-500"}`}></div>
        <button className='border-2 border-teal-800 border-none text-teal-800 w-full px-3 py-2 bg-teal-400 rounded-lg font-semibold' onClick={()=> handleClick(id)}>Add to team</button>
    </div>
  )
} 

export default Card