import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes , Route} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Dashboard from './pages/Dashboard'
import Login from './components/Login';
// import 'react-toastify/dist/reactToastify.css'
import { ToastContainer} from 'react-toastify';



 export const backendUrl = import.meta.env.VITE_BACKEND_URL;
 export const currency = '৳'
 

function App() {

  const [token , setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"")

  useEffect (()=>{
    localStorage.setItem('token', token)
  },[token])

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100'>
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className='border-b border-slate-800' />
          <div className='flex min-h-[calc(100vh-88px)] w-full bg-slate-950'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-slate-100 text-base'>
              <Routes>
                <Route path='/' element={<Dashboard token={token} />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
