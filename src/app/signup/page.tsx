"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import  toast  from "react-hot-toast";

export default function SignUpPage() {
  const router=useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled,setButtonDisabled]=useState(false)
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(user.email.trim().length>0&&user.username.trim().length>0&&user.password.trim().length>0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true)
    }
  },[user])
  const onSignUp = async (e:any) => {
    e.preventDefault();
    try{
     setLoading(true);
     const res=await axios.post('/api/users/signup',user);
     console.log(res)
     if(res.data.success){
       toast.success(res.data.message,{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
     }
     setLoading(false);
     router.push('/login')

   }catch(error:any){
    toast.error(error.message,{
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
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
      {loading?<p>loading....</p>:<h1>Signup</h1>}
      <hr />
      <form className="py-2 flex flex-col" onSubmit={onSignUp}>
        <div className="p-2 w-96 flex justify-between items-center">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 m-1 text-black"
            type="text"
            id="username"
            value={user.username}
            placeholder="Username"
            onChange={onChange}
          />
        </div>
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
        <button className="mt-10 px-2 py-1 bg-white text-black" disabled={buttonDisabled}>{buttonDisabled?'No Signup':'Signup'}</button>
        <Link className="text-red-400 text-center" href="/login">
          already registered login instead
        </Link>
      </form>
    </div>
  );
}
