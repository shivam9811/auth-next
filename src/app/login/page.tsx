"use client";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading,setLoading]=useState(false);
  const [buttonDisabled,setButtonDisabled]=useState(false);
const router=useRouter();
  useEffect(()=>{
    if(user.email.trim().length>0&&user.password.trim().length>0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true)
    }
  },[user])
  const onLogin = async (e:any) => {
    e.preventDefault();
    try{
      setLoading(true);
      if(user.email.trim().length>0&&user.password.trim().length>0){
        const res= await axios.post('/api/users/login',user);
        toast.success(res.data.message,{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
        router.push('/profile')
      }
    }catch(error:any){
      console.log(error);
      toast.error(error.message,{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }finally{
      setLoading(false)
    }
  };
  const onChange = (e: {
    target: {
      id: string;
      value: string | number;
    };
  }) => {
    setUser((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {loading?<h1>loading...</h1>:
      <h1>Login</h1>
    }
      <hr />
      <form className="py-2 flex flex-col" onSubmit={onLogin}>
       
        <div className="p-2 w-96 flex justify-between items-center">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 m-1 text-black"
            type="email"
            id="email"
            value={user.email}
            placeholder="Email"
            onChange={onChange}
          />
        </div>
        <div className="p-2 w-96 flex justify-between items-center">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 m-1 text-black"
            type="password"
            id="password"
            value={user.password}
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <Link href='/forgotpassword' className="text-end mr-2 text-red-400">Forgot Password</Link>
        <button className="mt-10 px-2 py-1 bg-white text-black" disabled={buttonDisabled}>Login</button>
        <Link className="text-red-400 text-center" href="/signup">
          new user signup instead
        </Link>
      </form>
    </div>
  );
}
