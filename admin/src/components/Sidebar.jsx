import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-slate-950 border-r border-slate-800 px-3 py-6'>
      <div className='space-y-3'>
        <div className='mb-6 px-4'>
          <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>Admin Panel</p>
        </div>
        <NavLink
          to='/'
          className={({isActive}) => `flex items-center gap-3 rounded-3xl border px-3 py-3 text-sm transition ${isActive ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900'}`}>
          <img className='w-5 h-5' src={assets.order_icon} alt='' />
          <p>Dashboard</p>
        </NavLink>
        <NavLink
          to='/orders'
          className={({isActive}) => `flex items-center gap-3 rounded-3xl border px-3 py-3 text-sm transition ${isActive ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900'}`}>
          <img className='w-5 h-5' src={assets.order_icon} alt='' />
          <p>Orders</p>
        </NavLink>
        <NavLink
          to='/list'
          className={({isActive}) => `flex items-center gap-3 rounded-3xl border px-3 py-3 text-sm transition ${isActive ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900'}`}>
          <img className='w-5 h-5' src={assets.order_icon} alt='' />
          <p>List Item</p>
        </NavLink>
        <NavLink
          to='/add'
          className={({isActive}) => `flex items-center gap-3 rounded-3xl border px-3 py-3 text-sm transition ${isActive ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900'}`}>
          <img className='w-5 h-5' src={assets.add_icon} alt='' />
          <p>Add Item</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
