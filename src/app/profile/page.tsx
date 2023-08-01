"use client";

import axios from 'axios'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {useState} from 'react'
import Link from 'next/link'

export default function ProfilePage(){
    const router=useRouter();
    const [userData,setUserData]=useState("nothing")

    const getUserDetails=async()=>{
      try{
        const res=await axios.get('/api/users/getme');
        console.log('user',res.data.user)
        setUserData(res.data.user._id);
        toast.success(res.data.message,{
          style:{
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        })


      }catch(error:any){
        toast.error(error.message,{
          style:{
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        })
      }
    }
    const logout=async()=>{
       try{
        const res=await axios.get('/api/users/logout');
          if(res.data.success){
            toast.success(res.data.message,{
             style: {
               borderRadius: '10px',
               background: '#333',
               color: '#fff',
             },
           })
          }
          router.push('/login')

       }catch(error:any){
        toast.error(error.message,{
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          })
       }
    }
    return (
        <div className="flex flex-col items-center justify-center max-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>
              Profile page
            </p>
            <h2>{userData==='nothing'?'Nothing':<Link href={'/profile/'+userData}>profile link</Link>}</h2>

            <button onClick={getUserDetails} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                User Details
            </button>
            <button onClick={logout} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                logout
            </button>
        </div>
    )
}