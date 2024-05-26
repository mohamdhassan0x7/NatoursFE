import React, { useEffect, useState } from 'react'
import HeroSec from '../UI/HeroSec'
import TourCard from './TourCard'
import travel from '../../assets/travel.jpg'
import plane from '../../assets/plane.jpg'
import { topFiveTours } from '../../Services/apiTour'
import { useLoaderData } from 'react-router-dom'

// const tours = [
//     {
//       "startLocation": {
//           "type": "Point",
//           "coordinates": [
//               -115.570154,
//               51.178456
//           ],
//           "address": "224 Banff Ave, Banff, AB, Canada",
//           "description": "Banff, CAN"
//       },
//       "name": "The Forest Hiker",
//       "duration": 5,
//       "maxGroupSize": 25,
//       "difficulty": "easy",
//       "price": 397,
//       "summary": "Breathtaking hike through the Canadian Banff National Park",
//       "imageCover": "tour-1-cover.jpg",
//       "ratingsAverage": 5,
//       "ratingsQuantity": 9,
//       "createdAt": "2024-04-17T14:17:47.843Z",
//       "startDates": [
//           "2021-04-25T09:00:00.000Z",
//           "2021-07-20T09:00:00.000Z",
//           "2021-10-05T09:00:00.000Z"
//       ],
//       "slug": "the-forest-hiker",
//       "durationWeeks": 0.7142857142857143,
//   },
//   {
//     "startLocation": {
//         "type": "Point",
//         "coordinates": [
//             -115.570154,
//             51.178456
//         ],
//         "address": "224 Banff Ave, Banff, AB, Canada",
//         "description": "Banff, CAN"
//     },
//     "name": "The Forest Hiker",
//     "duration": 5,
//     "maxGroupSize": 25,
//     "difficulty": "easy",
//     "price": 397,
//     "summary": "Breathtaking hike through the Canadian Banff National Park",
//     "imageCover": "tour-1-cover.jpg",
//     "ratingsAverage": 5,
//     "ratingsQuantity": 9,
//     "createdAt": "2024-04-17T14:17:47.843Z",
//     "startDates": [
//         "2021-04-25T09:00:00.000Z",
//         "2021-07-20T09:00:00.000Z",
//         "2021-10-05T09:00:00.000Z"
//     ],
//     "slug": "the-forest-hiker",
//     "durationWeeks": 0.7142857142857143,
// },
// {
//   "startLocation": {
//       "type": "Point",
//       "coordinates": [
//           -115.570154,
//           51.178456
//       ],
//       "address": "224 Banff Ave, Banff, AB, Canada",
//       "description": "Banff, CAN"
//   },
//   "name": "The Forest Hiker",
//   "duration": 5,
//   "maxGroupSize": 25,
//   "difficulty": "easy",
//   "price": 397,
//   "summary": "Breathtaking hike through the Canadian Banff National Park",
//   "imageCover": "tour-1-cover.jpg",
//   "ratingsAverage": 5,
//   "ratingsQuantity": 9,
//   "createdAt": "2024-04-17T14:17:47.843Z",
//   "startDates": [
//       "2021-04-25T09:00:00.000Z",
//       "2021-07-20T09:00:00.000Z",
//       "2021-10-05T09:00:00.000Z"
//   ],
//   "slug": "the-forest-hiker-start-when-call-come",
//   "durationWeeks": 0.7142857142857143,
// },
// {
//   "startLocation": {
//       "type": "Point",
//       "coordinates": [
//           -115.570154,
//           51.178456
//       ],
//       "address": "224 Banff Ave, Banff, AB, Canada",
//       "description": "Banff, CAN"
//   },
//   "name": "The Forest Hiker",
//   "duration": 5,
//   "maxGroupSize": 25,
//   "difficulty": "easy",
//   "price": 397,
//   "summary": "Breathtaking hike through the Canadian Banff National Park",
//   "imageCover": "tour-1-cover.jpg",
//   "ratingsAverage": 5,
//   "ratingsQuantity": 9,
//   "createdAt": "2024-04-17T14:17:47.843Z",
//   "startDates": [
//       "2021-04-25T09:00:00.000Z",
//       "2021-07-20T09:00:00.000Z",
//       "2021-10-05T09:00:00.000Z"
//   ],
//   "slug": "the-forest-hiker",
//   "durationWeeks": 0.7142857142857143,
// },
// ]
// const [tours, settours] = useState(null)
const sectionClass = 'mb-12 md:mb-20 container mx-auto'
const sectionTitle = 'text-4xl text-center primary-text font-badscript font-bold underline mb-5'
export default function Home() {
  
  const tours = useLoaderData()
  return (
    <div className=''>
      <HeroSec></HeroSec>
      {/* About Us */}
      <div className=''>
      <div className={`${sectionClass} `}>
        <h1 className={sectionTitle}>About Us</h1>

        <div className="bg-gradient-to-b from-green-100/50 rounded-lg md:rounded-full overflow-hidden mb-5 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className='px-8 pb-8 flex flex-col col-span-2 justify-center items-center '>
              <h3 className="text-2xl primary-text font-semibold mb-4 mt-4">Our Mission</h3>
              <p className="secondary-text leading-relaxed">
                At Travelify, our mission is to provide exceptional travel experiences that inspire and 
                connect people with the world. We strive to offer unforgettable adventures, 
                unparalleled service, and responsible tourism practices to ensure that every journey 
                with us is both enriching and sustainable.
              </p>
            </div>
            <div className='flex justify-end bg-red-500'>
              <img src={plane} alt=""  className='w-full'/>
            </div>
          </div> 
        </div>

        <div className="bg-gradient-to-t from-green-100/50 rounded-lg md:rounded-full overflow-hidden mb-5 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3"><div className='flex justify-start bg-red-500'>
              <img src={travel} alt=""  className='w-full'/>
              </div>
            <div className='px-8 pb-8 flex flex-col col-span-2 justify-center items-center '>
              <h3 className="text-2xl primary-text font-semibold mb-4 mt-4">Our Team</h3>
              <p className="secondary-text leading-relaxed">
              Our team consists of passionate travelers, experienced guides, and dedicated 
              professionals who are committed to making your travel dreams a reality. With 
              expertise in various destinations, languages, and cultures, we are here to 
              personalize your experience and provide the support you need every step of the way.
              </p>
            </div>
            
          </div> 
        </div>




      </div>  
      </div>
      {/* Most Popular Tours */}
      <div className={sectionClass}>
        <h1 className={sectionTitle}>Most Popular Tours</h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {tours.slice(0,4).map((tour, index) => (
            <TourCard key={index} tour={tour}></TourCard>
          ))}
        </div>
      </div>
    </div>
  )
}


export async function homeLoader(){
  const res = await topFiveTours()
  // console.log(res)
  return res.data.data.tours
}