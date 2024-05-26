import React from 'react'
import boat from '../../assets/boat.jpg'
import { Link } from 'react-router-dom'

export default function TourCard({tour}) {
  return (
    <div className=" mb-5 m-auto max-w-md rounded-lg overflow-hidden shadow-lg  h-full flex flex-col hover:scale-95 transition-all duration-300 ">
    <img className="w-full" src={tour.imageCover} alt="Trip Image"/>
    <div className=' flex-grow flex flex-col justify-between p-6 bg-gradient-to-t from-green-200/50'>
      <div>
        <h2 className="text-xl font-semibold text-green-600 mb-2">{tour.name}</h2>
        <p className="text-gray-700 mb-4">{tour.summary}</p>
      </div>
        <div className='  flex flex-col justify-center'>
          <div className='flex flex-wrap '>{tour.slug.split('-').map((s)=>{
            return (<p className='bg-stone-400 text-sm capitalize my-2  py-[1px] px-[2px] text-stone-100 rounded-full me-1 w-[50px] text-center hover:bg-stone-600 transition-all duration-300'>{s}</p>)
          })}</div>
          <Link 
                    to={`/tours/${tour.id}`}
                className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-semibold text-center my-2 py-2 px-4 rounded">
                    Learn More
          </Link>
        </div>
    </div>
  </div>
  )
}
