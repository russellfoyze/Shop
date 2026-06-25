import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1 , setImage1]= useState(false)
  const [image2 , setImage2]= useState(false)
  const [image3 , setImage3]= useState(false)
  const [image4 , setImage4]= useState(false)

  const [name , setName] = useState("")
  const [description , setDescription] = useState("")
  const [price , setPrice] = useState("")
  const [discount , setDiscount] = useState("")

  const [category , setCategory] = useState("Men")
  const [subCategory , setSubCatagory] = useState("Anime")
  const [bestseller , setBestseller] = useState(false)
  const [sizes , setSizes] = useState([])

  const onSubmitHandler = async (e)=> {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("name" , name)
      formData.append("description" , description)
      formData.append("price" , price)
      formData.append("discount" , discount)
      formData.append("category" , category)
      formData.append("subCategory" , subCategory)
      formData.append("bestseller" , bestseller)
      formData.append("sizes" ,JSON.stringify(sizes))

      image1 &&formData.append("image1", image1)
      image2 &&formData.append("image2" ,image2)
      image3 &&formData.append("image3", image3)
      image4 &&formData.append("image4" ,image4)

      const response = await axios.post(backendUrl + "/api/product/add" , formData ,{headers:{token}})

        if (response.data.success) {
          toast.success(response.data.message)
          setName('')
          setDescription('')
          setImage1(false)
          setImage2(false)
          setImage3(false)
          setImage4(false)
          setPrice('')
          setDiscount('')


        }else{
          toast.error(response.data.message)
        }


      
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  

  return (
    <div className='rounded-[32px] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/40'>
      <div className='mb-8 space-y-4'>
        <p className='text-sm uppercase tracking-[0.3em] text-slate-500'>Create Product</p>
        <h1 className='text-3xl font-semibold text-white'>Add a new listing</h1>
        <p className='text-sm text-slate-400'>Upload product images, set pricing, and configure details in one place.</p>
      </div>

      <form onSubmit={onSubmitHandler} className='space-y-6'>
        <div>
          <p className='mb-3 text-sm font-medium text-slate-300'>Upload Images</p>
          <div className='flex flex-wrap gap-3'>
            {[image1, image2, image3, image4].map((image, idx) => (
              <label key={idx} htmlFor={`image${idx+1}`} className='block cursor-pointer rounded-3xl border border-slate-800 bg-slate-950 p-3 transition hover:border-emerald-400'>
                <img className='h-20 w-20 rounded-2xl object-cover' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='' />
                <input onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (idx === 0) setImage1(file);
                    if (idx === 1) setImage2(file);
                    if (idx === 2) setImage3(file);
                    if (idx === 3) setImage4(file);
                  }
                }} type='file' id={`image${idx+1}`} hidden />
              </label>
            ))}
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-300'>Product Name</label>
            <input onChange={(e) => setName(e.target.value)} value={name} className='w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20' type='text' placeholder='Type here' required />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-300'>Product Description</label>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full min-h-[120px] rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20' placeholder='Write Description' required />
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-4'>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-300'>Product Category</label>
            <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'>
              <option value='Tshirt'>T-shirt</option>
              <option value='Dropshoulder'>Drop Shoulder</option>
              <option value='jersey'>Jersey</option>
            </select>
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-300'>Sub Category</label>
            <input type='text' value={subCategory} onChange={(e) => setSubCatagory(e.target.value)} className='w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20' />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-300'>Discounted Price</label>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20' type='number' placeholder='500' />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-300'>Original Price</label>
            <input onChange={(e) => setDiscount(e.target.value)} value={discount} className='w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20' type='number' placeholder='500' />
          </div>
        </div>

        <div>
          <p className='mb-3 text-sm font-medium text-slate-300'>Product Sizes</p>
          <div className='flex flex-wrap gap-3'>
            {['S','M','L','XL','XXL'].map((size) => (
              <button key={size} type='button' onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${sizes.includes(size) ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <label className='inline-flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300'>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type='checkbox' className='h-4 w-4 rounded border-slate-700 bg-slate-800 text-emerald-400 outline-none focus:ring-emerald-400' />
            <span>Add To Best Seller</span>
          </label>
          <button type='submit' className='ml-auto rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400'>Add Product</button>
        </div>
      </form>
    </div>
  )
}

export default Add
