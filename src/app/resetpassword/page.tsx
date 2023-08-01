"use client"
import axios from "axios";
import {useState,useEffect} from 'react'
import Link from "next/link";
import toast from 'react-hot-toast';

export default function ResetPasswordPage(){
    const [password,setPassword]=useState('');
    const [cpassword,setCPassword]=useState('');
    const [token,setToken]=useState('');
    const [error,setError]=useState(false);
    const [reset,setReset]=useState(false);

    useEffect(()=>{
        const urlToken=window.location.search.split('=')[1];
        setToken(urlToken||"")
     },[])

    const onChangePass=(e:any)=>{
        setPassword(e.target.value);
    }
    const onChangeCPass=(e:any)=>{
        setCPassword(e.target.value);
    }
     
    const onClick=async()=>{
        try {
            if(password.trim().length>0&&cpassword.trim().length>0&&password===cpassword){
                const res=await axios.post('/api/users/resetpassword',{password,token});
                toast.success(res.data.message,{
                    style: {
                      borderRadius: '10px',
                      background: '#333',
                      color: '#fff',
                    },
                  })
                  setReset(true);
            }else{
                setError(true)
            }

            
        } catch (error:any) {
            setError(true);
            toast.success(error.message,{
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
        }
    }
    

    return(
        <>
         <>
         <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Reset Password</h1>
            <h2 className="p-2 bg-slate-500 text-white">{token?`${token}`:"no token"}</h2>

            <input type="password" placeholder="password" className="py-2 m-2 text-black" name="password" id="password" value={password} onChange={onChangePass} />
            <input type="password" placeholder="confirm password" className="py-2 m-2 text-black" name="cpassword" id="cpassword" value={cpassword} onChange={onChangeCPass} />
            
            <button onClick={onClick} className="text-white border-none bg-green px-2 py-1"> Reset</button>
            {reset&&(
                <div>
                    <h2 className="text-2xl">Password reset successfully</h2>
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
        </>
    )
}