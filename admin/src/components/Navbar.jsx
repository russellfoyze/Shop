import React from 'react'
import {assets} from '../assets/assets'

const navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between bg-slate-900 px-[4%] py-4 shadow-lg shadow-slate-950/30'>
      <img className='w-[max(5%,80px)]' src={assets.logo} alt='Admin Logo' />
      <button onClick={()=>setToken("")} className='rounded-full bg-emerald-500 px-5 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400 sm:text-sm'>Logout</button>
    </div>
  )
}

export default navbar
