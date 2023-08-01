"use client"

import {useState} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios';

export default function ForgotPasswordPage(){
    const [email,setEmail]=useState('');
    const onChange=(e:any)=>{
      setEmail(e.target.value);
    }
    const onSubmit=async()=>{
        console.log(email)
        try {
             const res=await axios.post('/api/users/sendmail',{email});
             toast.success(res.data.message,{
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
             })    
        } catch (error:any) {
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
    <>
     <div className="flex flex-col items-center justify-center min-h-screen">
        <p className='m-2'>Enter email to reset your password</p>
        <input className="text-black m-2 py-1 focus:border-none active:border-none selection:border-none"placeholder='email' type="email" name="emai" id="email" onChange={onChange} value={email} />
         <button onClick={onSubmit} className='m-2 border-none bg-slate-500 text-white p-2'>Send Email</button>
     </div>
    </>
  )
}