import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'
import { currency } from '../App'

const List = ({token}) => {

  const [list , setList]= useState([])
  const fatchList = async ()=>{

    try {
      
      const response = await axios.get(backendUrl + '/api/product/list' , {headers:{token}})
      
      if (response.data.products) {
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }

  const removeProduct = async (id)=> {
    try {
      
      const response = await axios.post(backendUrl + '/api/product/remove', {id} , {headers:{token}})
      if (response.data.success) {
        toast.success(response.data.message)
        await fatchList()
      }else{
        toast.error(response.data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fatchList()
  },[])

  return (
    <div className='space-y-6'>
      <div className='rounded-[32px] bg-slate-900/95 border border-slate-800 p-6 shadow-xl shadow-slate-950/30'>
        <p className='text-sm uppercase tracking-[0.3em] text-slate-500'>Products</p>
        <h1 className='mt-3 text-2xl font-semibold text-white'>All Product Listings</h1>
        <p className='mt-2 text-sm text-slate-400'>Manage your catalog, remove items, and review product details in one place.</p>
      </div>

      <div className='rounded-[32px] bg-slate-900/90 border border-slate-800 p-6 shadow-xl shadow-slate-950/30'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 border-b border-slate-800 pb-3 text-sm text-slate-400'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-right'>Action</span>
        </div>

        <div className='mt-4 space-y-3'>
          {list.map((item, index) => (
            <div key={index} className='grid grid-cols-[3fr_3fr_1fr_1fr_1fr] items-center gap-4 rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-sm text-slate-200'>
              <img className='h-16 w-16 rounded-2xl object-cover' src={item.image[0]} alt='' />
              <div>
                <p className='font-semibold text-white'>{item.name}</p>
                <p className='text-xs text-slate-500'>SKU: {item._id.slice(-6)}</p>
              </div>
              <div>
                <p className='font-medium text-slate-100'>{item.category}</p>
              </div>
              <div>
                <p className='font-semibold text-emerald-300'>{item.price}{currency}</p>
              </div>
              <button onClick={() => removeProduct(item._id)} className='rounded-3xl bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-500'>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default List
