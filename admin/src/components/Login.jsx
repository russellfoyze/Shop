import React, { useState } from 'react'
import axios from "axios"
import { backendUrl } from '../config'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

  const [email , setEmail]= useState('')
  const [password , setPassword]= useState('')

  const onSubmitHandler = async (e)=>{
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin' , {email , password})
      if (response.data.success) {
          setToken(response.data.token)
        
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center px-4'>
      <div className='w-full max-w-md rounded-[32px] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/40'>
        <div className='mb-6 space-y-2'>
          <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>Admin Access</p>
          <h1 className='text-3xl font-semibold text-white'>Welcome Back</h1>
          <p className='text-sm text-slate-400'>Log in to manage products, orders, and analytics.</p>
        </div>
        <form onSubmit={onSubmitHandler} className='space-y-5'>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-300'>Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'
              type='email'
              placeholder='your@email.com'
            />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-300'>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'
              type='password'
              placeholder='Enter Your Password'
            />
          </div>
          <button className='w-full rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
