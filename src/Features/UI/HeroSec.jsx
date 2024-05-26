import React, { memo, useMemo } from 'react'
import HomeImg2 from '../../assets/HomeImg2.jpg'
import { Link } from 'react-router-dom'

 function HeroSec() {
  return (
    <div className="h-dvh bg-green-700 bg-cover flex flex-col justify-center items-center bg-fixed mb-20" style={{ backgroundImage: `url(${HomeImg2})` }} >
         <div className='z-10 text-center'>
         <p className='text-white text-8xl font-dancing tracking-wide font-light'>Natours</p>
          <p className='font-badscript text-white text-3xl mb-11'>Start the journey</p>
          <Link  to='/tours' className= 'font-urbanist mx-2 bg-green-500 py-3 px-4  text-white hover:bg-green-700 transition-all duration-700 rounded-full'>Discover Available Tours</Link>

         </div>
          <div className='bg-black opacity-55 h-dvh w-[100%] absolute'></div>
    </div>
  )
}

export default memo(HeroSec)