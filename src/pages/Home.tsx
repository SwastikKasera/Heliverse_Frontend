import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { Toaster } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
interface CardProps {
    id:number,
    _id?:string
    first_name:string,
    last_name:string,
    email:string,
    gender:string,
    avatar:string,
    domain:string,
    available:boolean,
    handleClick:any
}

interface DecodedToken {
  userId: string;
  iat?: string | number;
  // Add other properties as needed based on your decoded token structure
}

const Home = () => {
    const [user, setUser] = useState<CardProps[]>([])
    const [team, setTeam] = useState<{ id: number }[]>([]);
    const [filters, setFilters] = useState({
      domain: '',
      gender: '',
      available: ''
    });
    const [page, setPage] = useState({
      startIndex:0,
      endIndex:19
    })
    const token = localStorage.getItem('auth') as string | null;
    let decoded: DecodedToken | null = null;
    console.log("process.env.REACT_APP_API", process.env.REACT_APP_API);
    
    const navigate = useNavigate()
    useEffect(()=>{
      if(token === null){
        navigate('/login')
      }else{
          decoded = jwtDecode(token)
          const fetchData = async ()=>{
            const resp = await axios.get(`${process.env.REACT_APP_API}/api/users`, {
                headers:{
                    Authorization:`Bearer ${token}`
                },
                params:{
                  page: {
                    startIndex: page.startIndex,
                    endIndex: page.endIndex
                  }
                }
            })
            setUser(resp?.data?.members)
            
          }
          fetchData()
        }
    },[page])
    const [keyword, setKeyword] = useState("")

    const handleSearch = async () => {
      try {
          const resp = await axios.post(`${process.env.REACT_APP_API}/api/users/search`, { keyword }, {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });
          setUser(resp?.data?.data);
      } catch (error) {
          console.error('Error searching:', error);
      }
    }

    const handleChange = (e:React.FormEvent<HTMLInputElement>)=>{
      setKeyword(e.currentTarget.value)
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFilters(prevFilters => ({
          ...prevFilters,
          [name]: value
      }));
  }

    const getFilteredData = async ()=>{
      const response = await axios.post(`${process.env.REACT_APP_API}/api/users/filter`, {filters, page}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      setUser(response.data?.data)
      
    }

    const handleNext = () => {
      setPage(prevPage => ({
        startIndex: prevPage.endIndex,
        endIndex: prevPage.endIndex + 20
      }));
    };
    
    const handlePrev = () => {
      setPage(prevPage => ({
        startIndex: Math.max(prevPage.startIndex - 20, 0),
        endIndex: prevPage.startIndex
      }));
    };

    const handleClick = (userId: number) => {
      setTeam(prevTeam => [...prevTeam, { id: userId }]);
    };
    const createTeam = async ()=>{
      const response = axios.post(`${process.env.REACT_APP_API}/api/team`, {userId: decoded?.userId, teamMembers:team}, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
    }
    
  return (
    <>
    <div className='bg-[#1e1e1e] w-full h-fit flex flex-col gap-4'>
      <div className='p-4 flex justify-center items-center'>
        <input onChange={handleChange} type="search" name="keyword" className='h-14 w-2/5 pl-4 rounded-s-lg px-2 outline-none' />
        <button onClick={handleSearch} type='button' className='bg-teal-500 h-14 w-14 flex justify-center items-center rounded-e-xl px-2 text-2xl font-bold'><IoIosSearch /></button>
      </div>
      <button onClick={createTeam}>Create Team</button>
      <div className='w-full h-24 flex justify-center items-center gap-4 shadow-gray-200 bg-neutral-800'>
        <select name="gender" className='bg-white p-2 rounded-md' onChange={handleFilterChange}>
          <option value="" defaultChecked disabled>--Select--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select name="available" className='bg-white p-2 rounded-md' onChange={handleFilterChange}>
          <option value="" defaultChecked disabled>--Select--</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <select name="domain" className='bg-white p-2 rounded-md' onChange={handleFilterChange}>
          <option value="" defaultChecked disabled>--Select--</option>
          <option value="IT">IT</option>
          <option value="Management">Management</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
        <button className='border-2 border-teal-800 border-none text-teal-800 w-fit px-3 py-2 bg-teal-400 rounded-lg font-semibold' onClick={getFilteredData}>Apply</button>
      </div>
      <div className='w-full flex flex-wrap gap-4 items-start justify-start'>
          {user.map((item:CardProps)=>(
              <Card key={item?._id} id={item.id} firstName={item?.first_name} lastName={item.last_name} gender={item.gender} avatar={item.avatar} domain={item.domain} email={item.email} available={item.available} handleClick={handleClick}/>
          ))}
      </div>
      <div className='flex justify-center items-center gap-4 p-4 mb-6'>
        <button className='bg-stone-500 text-gray-200 px-3 py-2 rounded-lg' onClick={handlePrev}>Previous</button>
        <button className='bg-stone-500 text-gray-200 px-3 py-2 rounded-lg' onClick={handleNext}>Next</button>
      </div>
    </div>
    <Toaster/>
    </>
  )
}

export default Home