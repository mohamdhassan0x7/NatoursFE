import React, { createContext, memo, useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { getTours } from '../../Services/apiTour'
import { Pagination } from '@mui/material'
import OneTour from './OneTour'


// const tours = [
//     {
//         "startLocation": {
//             "type": "Point",
//             "coordinates": [
//                 -115.570154,
//                 51.178456
//             ],
//             "address": "224 Banff Ave, Banff, AB, Canada",
//             "description": "Banff, CAN"
//         },
//         "_id": "5c88fa8cf4afda39709c2951",
//         "name": "The Forest Hiker",
//         "duration": 1,
//         "maxGroupSize": 25,
//         "difficulty": "easy",
//         "price": 700,
//         "summary": "Breathtaking hike through the Canadian Banff National Park",
//         "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         "imageCover": "tour-1-cover.jpg",
//         "images": [
//             "tour-1-1.jpg",
//             "tour-1-2.jpg",
//             "tour-1-3.jpg"
//         ],
//         "ratingsAverage": 5,
//         "ratingsQuantity": 9,
//         "createdAt": "2024-04-17T14:17:47.843Z",
//         "startDates": [
//             "2021-04-25T09:00:00.000Z",
//             "2021-07-20T09:00:00.000Z",
//             "2021-10-05T09:00:00.000Z"
//         ],
//         "locations": [
//             {
//                 "type": "Point",
//                 "coordinates": [
//                     -116.214531,
//                     51.417611
//                 ],
//                 "description": "Banff National Park",
//                 "day": "1",
//                 "_id": "5c88fa8cf4afda39709c2954",
//                 "id": "5c88fa8cf4afda39709c2954"
//             },
//             {
//                 "type": "Point",
//                 "coordinates": [
//                     -118.076152,
//                     52.875223
//                 ],
//                 "description": "Jasper National Park",
//                 "day": "3",
//                 "_id": "5c88fa8cf4afda39709c2953",
//                 "id": "5c88fa8cf4afda39709c2953"
//             },
//             {
//                 "type": "Point",
//                 "coordinates": [
//                     -117.490309,
//                     51.261937
//                 ],
//                 "description": "Glacier National Park of Canada",
//                 "day": "5",
//                 "_id": "5c88fa8cf4afda39709c2952",
//                 "id": "5c88fa8cf4afda39709c2952"
//             }
//         ],
//         "guides": [
//             {
//                 "_id": "5c8a21d02f8fb814b56fa189",
//                 "name": "Steve T. Scaife",
//                 "email": "steve@example.com",
//                 "role": "lead-guide"
//             },
//             {
//                 "_id": "5c8a201e2f8fb814b56fa186",
//                 "name": "Kate Morrison",
//                 "email": "kate@example.com",
//                 "role": "guide"
//             },
//             {
//                 "_id": "5c8a1f292f8fb814b56fa184",
//                 "name": "Leo Gillespie",
//                 "email": "leo@example.com",
//                 "role": "guide"
//             }
//         ],
//         "slug": "the-forest-hiker",
//         "durationWeeks": 0.7142857142857143,
//         "id": "5c88fa8cf4afda39709c2951"
//     },
//     {
//         "startLocation": {
//             "type": "Point",
//             "coordinates": [
//                 -115.570154,
//                 51.178456
//             ],
//             "address": "224 Banff Ave, Banff, AB, Canada",
//             "description": "Banff, CAN"
//         },
//         "_id": "5c88fa8cf4afda39709c2951",
//         "name": "The Forest Hiker",
//         "duration": 1,
//         "maxGroupSize": 25,
//         "difficulty": "easy",
//         "price": 600,
//         "summary": "Breathtaking hike through the Canadian Banff National Park",
//         "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         "imageCover": "tour-1-cover.jpg",
//         "images": [
//             "tour-1-1.jpg",
//             "tour-1-2.jpg",
//             "tour-1-3.jpg"
//         ],
//         "ratingsAverage": 5,
//         "ratingsQuantity": 9,
//         "createdAt": "2024-04-17T14:17:47.843Z",
//         "startDates": [
//             "2021-04-25T09:00:00.000Z",
//             "2021-07-20T09:00:00.000Z",
//             "2021-10-05T09:00:00.000Z"
//         ],
//         "locations": [
//             {
//                 "type": "Point",
//                 "coordinates": [
//                     -116.214531,
//                     51.417611
//                 ],
//                 "description": "Banff National Park",
//                 "day": "1",
//                 "_id": "5c88fa8cf4afda39709c2954",
//                 "id": "5c88fa8cf4afda39709c2954"
//             },
//             {
//                 "type": "Point",
//                 "coordinates": [
//                     -118.076152,
//                     52.875223
//                 ],
//                 "description": "Jasper National Park",
//                 "day": "3",
//                 "_id": "5c88fa8cf4afda39709c2953",
//                 "id": "5c88fa8cf4afda39709c2953"
//             },
//             {
//                 "type": "Point",
//                 "coordinates": [
//                     -117.490309,
//                     51.261937
//                 ],
//                 "description": "Glacier National Park of Canada",
//                 "day": "5",
//                 "_id": "5c88fa8cf4afda39709c2952",
//                 "id": "5c88fa8cf4afda39709c2952"
//             }
//         ],
//         "guides": [
//             {
//                 "_id": "5c8a21d02f8fb814b56fa189",
//                 "name": "Steve T. Scaife",
//                 "email": "steve@example.com",
//                 "role": "lead-guide"
//             },
//             {
//                 "_id": "5c8a201e2f8fb814b56fa186",
//                 "name": "Kate Morrison",
//                 "email": "kate@example.com",
//                 "role": "guide"
//             },
//             {
//                 "_id": "5c8a1f292f8fb814b56fa184",
//                 "name": "Leo Gillespie",
//                 "email": "leo@example.com",
//                 "role": "guide"
//             }
//         ],
//         "slug": "the-forest-hiker",
//         "durationWeeks": 0.7142857142857143,
//         "id": "5c88fa8cf4afda39709c2951"
//     },
// ]

export default function AllTours() {

    const [maxPrice, setmaxPrice] = useState(0)
    const [minPrice, setminPrice] = useState(0)
    const [pagesCount, setpagesCount] = useState(0)
    const [value, setValue] = useState([0, 1000000]);
    const [myTours, setMyTours] = useState(null)
    const [loading, setloading] = useState(false)

    const [data, setdata] = useState({
        name:null,
        sort:null,
        duration:null,
        limit:5,
        page:1,
        maxValuePrice:100000000,
        minValuePrice:0,
    })
    function handleSearch(e){
        setdata({...data, name:e.target.value, page:1})
        
    }
    function handleSort(e){
        setdata({...data, sort:e.target.value, page:1})
    }
    function handlePageChange(e, value){
        setdata({...data, page:value})
    }
    useEffect(() => {
      setdata({...data, maxValuePrice:value[1], minValuePrice:value[0]})
    //   console.log("max" ,data.maxValuePrice,"min", data.minValuePrice)
    }, [value])



    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            const res = await getTours(data);
            setloading(false)
            // console.log(res.data.data.tours)
            setMyTours(res.data.data.tours)
            setmaxPrice(res.data.maxPrice)
            setminPrice(res.data.minPrice)
            setpagesCount(res.data.totalPages)
        }
        fetchData()
    }, [data])
    

    function handleClearSelection(){
        document.getElementById("price").checked = false;
        document.getElementById("duration").checked = false;
        setdata({
            name:null,
            sort:null,
            duration:null,
            limit:5,
            page:1,
            maxValuePrice:100000000,
            minValuePrice:0,
        })
    }

  return (
    <div className=' m-10 mt-24  gap-5 border border-green-600 rounded-t-3xl p-3'>
        <div className='secondary-text lg:col-span-3  px-12 py-6 md:flex md:flex-row w-full border rounded-3xl md:rounded-3xl bg-stone-50 border-stone-600  '>
            <div className=' w-[100%] my-auto mb-5'>
                 <input type="text" name='search' placeholder='Search for tours..' value={data.name} onChange={handleSearch} className='w-[100%] md:w-[80%] lg:w-[75%] border-b-2 bg-transparent secondary-text placeholder:text-stone-500  border-green-800 outline-none rounded-s-md' />
            </div>
            <div className='w-[100%]'> 
                <p className='font-semibold text-md'>Price Range:</p>
                {
                    minPrice && maxPrice?  
                    <div className='px-2 w-[100%] md:w-[80%] lg:w-[75%]'>
                        <RangeSlider value={value} setValue={setValue} minPrice = {minPrice} maxPrice = {maxPrice}/> 
                    </div>
                        
                        :""
                }

                <p className='font-semibold text-md'>Sort by:</p>
                <div className='flex  flex-wrap'>
                    <div className='me-3 flex flex-row gap-x-2 my-2'>
                        <input type="radio" onChange={handleSort} id="price" name="sort_type" className='' value="price"/>
                        <label for="price">Price</label><br/>
                    </div>
                    <div className='me-5 flex flex-row gap-x-2 my-2'>
                        <input type="radio" onChange={handleSort} id="duration" name="sort_type" value="duration"/>
                        <label for="duration">Duration</label><br/>
                    </div>
                    <button className='underline text-green-700 hover:text-green-500' onClick={handleClearSelection}>Clear selection</button>
                </div>
            </div>
        </div>


        <div className='sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-1 lg:col-span-7  '>
        {
            loading? 
            <div className='w-full col-span-2 my-64 flex justify-center items-center'> 
                <i class="fa-solid fa-compass fa-spin text-7xl text-green-600"></i>
            </div> : 
            myTours?.length > 0?
            myTours?.map(tour => <OneTour key={tour._id} tour={tour}/>)
            :
            <div className='col-span-2 flex justify-center items-center md:h-full '>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-6xl font-semibold text-stone-300 py-10'>No Tours Found</p>
          </div>
        }
        </div>
  
    <div className='my-10 flex justify-center items-center'>
            {
                pagesCount > 0?
                <Pagination
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'grey',
                        },
                        '& .MuiPaginationItem-page.Mui-selected': {
                            backgroundColor: 'green',
                            color: 'white',
                        },
                    
                    }}
                size='large'  page={data.page} onChange={handlePageChange} count={pagesCount} />
                :
                ""
            }
    </div>
    </div>
  )
}




function valuetext(value) {
  return `${value}°C`;
}

function RangeSlider({value, setValue, minPrice, maxPrice}) {
  

//  const [value, setValue] = useState([minPrice, maxPrice]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(value)
    //call API to filter tours
  };

  return (
    <Box >
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={minPrice}
        max={maxPrice}
        step={Math.ceil((maxPrice - minPrice)/10)}
        color='success'
        
      />
    </Box>
  );
}


async function loader() {
    const res = await getTours();
    return res.data.data.tours;
}