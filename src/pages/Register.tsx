import {FormEvent, useState} from 'react'
import bkgImage from '../assets/grid.svg'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom'

const backgroundStyle = {
    backgroundImage: `url(${bkgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    
}

const Register = () => {
    const [registerDetails, setRegisterDetails] = useState({
        "email":"",
        "password":""
    })
    const registerUser = async () => {
        return axios.post(`${process.env.REACT_APP_API}/register`, registerDetails, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
      };
    const handleFormSubmit = async (e:FormEvent) => {
        e.preventDefault();
        toast.promise(registerUser(),
          {
            loading: 'Registering...',
            success:"Register Success",
            error: (resp)=>{
                return resp?.response?.data?.msg
            }
          }
        );
      };
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        
        setRegisterDetails((prevDetail) => ({
            ...prevDetail,
            [name]:value
        }))
    }
  return (
    <>
        <div style={backgroundStyle} className='bg-[#1e1e1e] w-full h-full flex items-center justify-center'>
            <form onSubmit={handleFormSubmit}>
            <div className='bg-[#181818] w-96 p-8 border-[#454545] border-2 rounded-3xl flex flex-col justify-center items-center gap-4'>
                <div className='w-full text-white text-3xl flex justify-center'>
                    <h1>Register</h1>
                </div>
                <div className='flex gap-2 w-full'>
                    <div className='w-full'>
                        <p className='text-[#efefef]'>Email</p>
                        <input onChange={handleInputChange} name='email' className='bg-[#181818] mt-3 b-2 border-[#454545] text-[#efefef] border-2 rounded-lg p-2 w-full focus:outline-none' type="email" />
                    </div>
                </div>
                <div className='flex gap-2 w-full'>
                    <div className='w-full'>
                        <p className='text-[#eeeeee]'>Password</p>
                        <input onChange={handleInputChange} name='password' className='bg-[#181818] mt-3 b-2 border-[#454545] text-[#eeeeee] border-2 rounded-lg p-2 w-full focus:outline-none' type="password" />
                    </div>
                </div>
                <div className='w-full mt-2'>
                    <button className='bg-teal-500 py-2 w-full text-center rounded-lg text-neutral-950 font-bold' type='submit'>Register</button>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <hr className='w-32 border-t-2 border-neutral-600' />
                    <p className='text-[#eeeeee] text-base'>Or</p>
                    <hr className='w-32 border-t-2 border-neutral-600' />
                </div>
                <div className='w-full'>
                    <button className='bg-[#181818] mt-2 b-2 border-[#454545] text-[#eeeeee] text-base border-2 rounded-lg p-2 w-full'>Sign up with Google</button>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <p className='text-[#eeeeee]'>Already have an account? <span className='text-teal-500 hover:underline hover:cursor-pointer'><Link to="/login">Login Here</Link></span></p>
                </div>
            </div>
            </form>
        </div>
        <Toaster/>
    </>
  )
}

export default Register