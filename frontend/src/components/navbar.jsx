import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import { useLocation } from 'react-router-dom'

const navbar = () => {
  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, navigate, setToken, setCartItems, token } = useContext(ShopContext)
  const location = useLocation()
  const cartCount = getCartCount()

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  return (
    <div>
      <div className='flex items-center justify-between py-1 font-medium'>
        <Link to={'./'}><img src={assets.logo} className='w-20' alt="" /></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
          <NavLink to='/' className='flex flex-col item-center gap-1'>
            <p>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/collection' className='flex flex-col item-center gap-1'>
            <p>Collection</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/about' className='flex flex-col item-center gap-1'>
            <p>About Us</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/contact' className='flex flex-col item-center gap-1'>
            <p>Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/user-login' className='flex flex-col item-center gap-1'>
            <p>My Orders</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </ul>

        <div className='flex item items-center gap-6'>
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className={`w-5 cursor-pointer ${location.pathname.includes('collection') ? 'visible' : 'invisible'}`}
            alt=""
          />

          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5' alt="" />
            {cartCount > 0 && (
              <span className='absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center'>
                {cartCount}
              </span>
            )}
          </Link>

          {token ? (
            <div className='group relative'>
              <Link to='/user-dashboard'>
                <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
              </Link>
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                  <Link to='/user-dashboard' className='cursor-pointer hover:text-black ml-5'>My Profile</Link>
                  <Link to='/user-login' className='cursor-pointer hover:text-black ml-5'>My Orders</Link>
                  <p className='cursor-pointer hover:text-black ml-5' onClick={logout}>Log Out</p>
                </div>
              </div>
            </div>
          ) : (
            <Link to='/login'>
              <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
            </Link>
          )}

          <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>

        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-[100] ${visible ? 'w-[90%]' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
              <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>About Us</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/cart'>Cart</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/user-login'>My Orders</NavLink>
            {token && (
              <button
                onClick={() => { logout(); setVisible(false) }}
                className='py-2 pl-6 border text-left text-red-600 hover:text-red-700'
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default navbar
