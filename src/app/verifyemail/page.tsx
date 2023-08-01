"use client"
import axios from "axios";
import Link from "next/link";
import {useEffect,useState} from 'react';
import toast from 'react-hot-toast';

export default function verifyEmailPage(){
    const [token,setToken]=useState('');
    const [verified,setVerified]=useState(false);
    const [error,setError]=useState(false);

    const verifyUserEmail=async ()=>{
        try {
           const res:any= await axios.post('/api/users/verifyemail',{token})
            setVerified(true);
            toast.success(res.data.message,{
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })

        } catch (error:any) {
            setError(true);
            toast.error(error.message,{
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
        }
    }

    useEffect(()=>{
       const urlToken=window.location.search.split('=')[1];
       setToken(urlToken||"")
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    },[token])
    return(
        <>
         <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-slate-500 text-white">{token?`${token}`:"no token"}</h2>
            {verified&&(
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href='/login'>
                        Login
                    </Link>
                </div>
            )}
            {error&&(
                <div>
                    <h2 className="text-2xl bg-red-600">Error</h2>
                </div>
            )}
         
         </div>
        </>
    )
}