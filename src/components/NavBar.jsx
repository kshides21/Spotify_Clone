import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {

  const navigate = useNavigate()

  return (
    <>
    <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
            <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
            <img onClick={() => navigate(+1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
        </div>
        <div className='flex items-center gap-4'>
            <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-not-allowed'>Explore Premium</p>
            <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-not-allowed'>Install App</p>
            <p className='bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center'>K</p>
        </div>
    </div>
    <div className='flex items-center gap-2 mt-4'>
        <Link to='/' className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</Link>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-not-allowed'>Music</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-not-allowed'>Podcasts</p>
    </div>
    </>
  )
}

export default NavBar
