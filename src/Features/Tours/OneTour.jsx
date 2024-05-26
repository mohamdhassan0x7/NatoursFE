import React, { useEffect } from 'react'
import boat from '../../assets/boat.jpg'
import { Link } from 'react-router-dom'
export default function OneTour({tour}) {

  return (
    <div className='h-max- flex flex-col md:flex-row my-3 rounded-lg bg-stone-50 overflow-hidden'>
        <img src={tour.imageCover} alt="" className='max-w-md '/>
        <div className='p-3 flex-grow flex flex-col justify-between '>
            <div>
                <h3 className='primary-text font-semibold text-lg mb-3'>{tour.name}</h3>
                <div className='flex flex-wrap'>
                    {tour.locations.map((location)=>{
                        return (<p className='secondary-text bg-stone-600 text-[0.5rem]  sm:text-sm me-2 text-stone-50 py-1 px-2 rounded-2xl text-center my-2' >{location.description}</p>)
                    })}
                </div>
                <p className='secondary-text text-xsm mt-2'>{tour.summary}</p>
            </div>
            <div>
                <p className='secondary-text font-bold text-sm my-2'>Duration: {tour.duration} day</p>
                <p className='secondary-text font-bold text-sm my-2'>Price: {tour.price} $</p>
                <Link 
                    to={`/tours/${tour.id}`}
                className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-semibold text-sm my-2 py-2 px-4 rounded">
                    Learn More
                </Link>
            </div>
        </div>
    </div>
  )
}
