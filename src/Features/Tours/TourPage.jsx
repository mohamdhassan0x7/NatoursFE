import React, { useEffect, useState } from 'react'
import { Form, Navigate, useActionData, useParams } from 'react-router-dom';
import Review from '../UI/Review';
import { addReview, getOneTour } from '../../Services/apiTour';
import { IsInMyBooking, IsInMyWishList, addToBooking, addToWishList, getWishList, removeTourFromBooking, removeTourFromWishList } from '../../Services/apiUser';
import Error404 from '../UI/Error404';
export default function TourPage() {

    const [loading, setloading] = useState(false)
    const [tour, settour] = useState(null)
    const [rate, setRate] = useState(1)
    const id = useParams().id
    const [isVisible, setIsVisible] = useState(true);

    const [wished, setWished] = useState(null)
    const [loadingWish, setloadingWish] = useState(false)

    const [loadingBook, setloadingBook] = useState(false)


    let addComment = useActionData()
    const fetchData = async () => {
        setloading(true)
        const res = await getOneTour(id);
        const wish = await IsInMyWishList(id)
        setWished(wish.data.data.isInWishlist)
        setloading(false)
        if(res.status === 200)
            settour(res?.data?.data?.tour)
        else
            settour(res.response.data.status)
        // console.log(res.data.data.tour)
    }
    

    async function handleWishing(){
        setloadingWish(true)
        if(wished){
            const res = await removeTourFromWishList({tourId:id})
            setWished(!wished)
        }else{
            const res = await addToWishList({tourId:id})
            setWished(!wished)
        }
        setloadingWish(false)
    }
    
    
    useEffect(() => {
        fetchData()
    }, [])
    
    useEffect(() => {
        setIsVisible(true);
        if(addComment!=="empty" && addComment!=="Error" && addComment!==null && addComment!==undefined){
            settour({...tour, reviews: addComment})
            document.getElementById('review').value = ""
            setRate(1)
            // console.log("reviews changed")
            // console.log(addComment)
        }
    }, [addComment])
    

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => clearTimeout(timeout);
    }, []);
  return (
    <>
{
    loading? 
    <div className='w-full my-72 flex justify-center items-center'> 
                <i class="fa-solid fa-compass fa-spin text-7xl text-green-600"></i>
    </div> 
    :
    tour != 'error'?
    <div className='m-10 mt-24  rounded-lg overflow-hidden'>
        <div className='grid grid-cols-2 gap-x-5 bg-stone-100 '>
            <div className='col-span-2 lg:col-span-1 p-5'>
                <div className='md:flex md:items-center md:justify-between'>
                    <div className='mb-3 md:mb-5'>
                        <div className='flex gap-x-3 items-center'>
                            <h1 className='primary-text text-2xl md:text-4xl font-bold mb-2 '>{tour?.name}</h1>
                            {
                                loadingWish?
                                <i class="fa-solid fa-compass fa-spin text-3xl text-green-600"></i>
                                :
                                <i class={`${wished?"fa-solid":"fa-regular"} fa-heart text-3xl text-rose-500 cursor-pointer`} onClick={handleWishing}></i>

                            }
                        </div>
                        <p 
                        className={`w-fit secondary-text ${tour?.difficulty === 'easy' ? 'bg-green-500' : tour?.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-700'} text-stone-50 p-2 px-4 text-center text-sm font-semibold rounded-2xl capitalize`} 
                        >{tour?.difficulty}</p>

                    </div>
                    <h3 className='primary-text text-2xl md:text-2xl font-bold mb-3 md:mb-5'>{tour?.price}$</h3>
                </div>
                <div className='flex gap-x-3 mb-3'>
                    <h4 className='text-xl primary-text font-semibold'>Tour Duration: </h4>
                    <p className='secondary-text leading-relaxed text-justify rounded-lg'>{tour?.duration} days </p>
                </div>
                <div className='flex gap-x-3 mb-3'>
                    <h4 className='text-xl primary-text font-semibold'>Available Tickets: </h4>
                    <p className='secondary-text leading-relaxed text-justify rounded-lg'>{tour?.maxGroupSize - tour?.numBookings} tickets </p>
                </div>



                <div className='mb-3'>
                <h4 className='text-xl primary-text font-semibold'>Tour Plan: </h4>
                <div className=" w-full border bg-white border-stone-500 rounded-lg overflow-hidden flex">
                    <table className=" divide-y w-[50%] divide-stone-400">
                        <thead className="bg-green-600 text-white cursor-pointer hover:bg-green-800 transition-all duration-300">
                            <tr>
                                <th className="primary-text text-white py-2 font-semibold px-4 text-center">Starting Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center hover:bg-stone-100 transition-all duration-300 cursor-pointer font-badscript border-l border-b border-stone-300">
                                <td className="py-2 px-4">{tour?.startLocation?.description}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className=" divide-y w-[50%] divide-stone-400">
                        <thead className="bg-green-600  text-white cursor-pointer hover:bg-green-800 transition-all duration-300">
                            <tr>
                                <th className="primary-text text-center text-white  py-2 px-4 ">Locations to Visit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tour?.locations.map((location, index) => (
                                <tr key={index} className="text-center hover:bg-stone-100 transition-all duration-300 cursor-pointer font-badscript border-l border-b border-stone-300">
                                    <td className="py-2 px-4">{location.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>

            </div>
                
                <h4 className='text-xl mb-3 primary-text font-semibold'>Tour Description: </h4>
                <p className=' bg-white p-2 rounded-lg secondary-text leading-relaxed text-justify cursor-pointer hover:bg-stone-100 transition-all duration-300'>{tour?.description}</p>

                <div className='flex justify-end gap-x-3 my-3 '>
                    {
                        loadingBook?
                        <i class="fa-solid fa-compass fa-spin text-3xl text-green-600"></i>
                        :
                        <div className='flex justify-end gap-x-3 my-3'>
                            <Book tour={tour} settour={settour}></Book>
                        </div>
                            // <button onClick={handleBooking} className="w-full md:w-[25%] bg-green-700 text-white py-2 px-4 font-semibold rounded hover:bg-green-900">Book</button>
                            // :
                            // <button onClick={handleBooking} className="w-full md:w-[30%] bg-stone-400 text-white py-2 px-4 font-semibold " disabled>Already Booked !</button>
                    }
                </div>
            </div>

            <div id="carouselExampleAutoplaying" className="col-span-2 lg:col-span-1 carousel slide bg-transparent rounded-xl p-3 " data-bs-ride="carousel">
                <div className="carousel-inner w-full h-full  ">
                    <div className="carousel-item active h-full w-full ">
                    <img src={tour?.imageCover} className=" w-full h-full object-contain " alt="..."/>
                    </div>
                    {
                        tour?.images.map((image, index) => {
                            return (
                                <div className="carousel-item h-full w-full " key={index}>
                                    <img src={image} className=" w-full h-full object-contain" alt="..."/>
                                </div>
                            )
                        })
                    }
            
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>

        <div className='grid grid-cols-3 gap-x-3 mt-5'>

            <div className=' rounded-lg col-span-3 order-2 lg:order-1 lg:col-span-2 '>
                <Form method='POST' className='secondary-text rounded-lg p-4 pt-0 mb-4 bg-stone-100'>
                    <label htmlFor="review" className='primary-text text-2xl font-bold mb-2 bg-green-600 text-stone-50 w-fit p-2 rounded-b-md'>Tour Reviews </label>
                    <input type="number" hidden value={rate} name="rating" id="" />
                    <input type="text" value={tour?._id} name='tourId' hidden />
                    <div className='flex flex-col gap-y-3 mt-3'>
                        <textarea 
                        placeholder='Write your review here...'
                        name="review" 
                        id="review" 
                        className='border shadow-sm rounded-lg p-3 w-full h-24 outline-none focus:ring-2 focus:ring-green-500'></textarea>
                    </div>
                    <div className='mt-4 sm:flex sm:items-center sm:justify-between sm:px-5'>
                        <RatingStars rate={rate} setRate={setRate}></RatingStars>
                        <button type='submit' className='bg-green-500 my-auto text-stone-50 p-2 px-4 text-md hover:bg-green-600 transition-all duration-300 rounded-lg mt-4 sm:mt-0 '>Submit Review</button>
                    </div>
                    <div className={`text-sm font-semibold text-start ms-3 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        {
                            addComment === "Error" ? <p className='text-red-600 ms-3'>You already rated this tour before</p> : addComment === "empty" ? <p className='text-red-600 ms-3'>Please fill all fields</p> : null
                        }
                    </div>
                </Form>
                {
                    tour?.reviews?.sort(function(a, b) {
                        return new Date(b.createdAt) - new Date(a.createdAt);;
                    }).map((review, index) => {
                        return (
                            <Review review = {review} index={index}></Review>
                        )
                    }
                )}
            </div>
            
            <div className='order-1 lg:order-2 col-span-3 lg:col-span-1'>
                <div className=' '>
                    <div className='bg-stone-100 p-4 pt-0 mb-4 rounded-lg'>
                    <h3 className='primary-text text-2xl font-bold mb-2 bg-green-600 text-stone-50 w-fit p-2 rounded-b-md'>Tour Guides</h3>
                        <div className='flex gap-x-5'>
                            {
                                tour?.guides.map((guide, index) => {
                                    return (
                                        <div className='flex flex-col items-center flex-wrap' key={index}>
                                            <img src={guide.photo} className='w-24 h-24 rounded-2xl sm:rounded-full' alt="" />
                                            <h4 className='primary-text text-sm  lg:text-md font-semibold'>{guide.name}</h4>
                                            <p className='secondary-text text-sm '>{guide.role}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='bg-stone-100 p-4 rounded-lg mb-4 pt-0 '>
                        <h3 className='primary-text text-2xl font-bold mb-2 bg-green-600 text-stone-50 w-fit p-2 rounded-b-md'>Tour Ratings</h3>
                        <div className='flex flex-col justify-center items-center '>
                            <p className='secondary-text text-6xl font-semibold my-2 mt-4'>{tour?.ratingsAverage}</p>
                            <div>
                                {
                                    tour?
                                    Array(Math.floor(tour?.ratingsAverage)).fill().map((_, index) => {
                                        return <i key={index} className="fas text-2xl fa-star text-yellow-600"></i>
                                    }):
                                    ""
                                    
                                }
                                {
                                    tour?.ratingsAverage % 1 > 0 ? <i className="fas text-2xl fa-star-half-alt text-yellow-600"></i> : null
                                }
                            </div>
                            <p className='secondary-text text-sm text-stone-600 leading-10'>Total Ratings: {tour?.ratingsQuantity}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    :
    <Error404></Error404>
}
    </>
  )
}



function Book({tour, settour}) {

    const [loading, setloading] = useState(false)
    const [result, setresult] = useState(null)
    const [booked, setbooked] = useState(null)

    const fetchData = async () => {
    const book = await IsInMyBooking(tour._id)
        setbooked(book.data.data.isInBooking)
    // console.log(booked)
    }
    useEffect(() => {
        fetchData()
    }, [])
    
    async function handleBooking() {
        setloading(true)
        const res = await addToBooking({tourId:tour._id})
        if(res.status === 200){
            setresult("Congratulations! You have successfully booked this tour")
            settour({...tour, numBookings: tour.numBookings + 1})
            setbooked(true)         
        }
    }

      return (
        <div className='w-full'>
            {
                
                booked?
                <button onClick={handleBooking} className="w-full bg-stone-400 text-white py-2 px-4 font-semibold " disabled>Already Booked !</button>:

            <>
           
                <button type="button" class=" bg-green-700 text-white py-2 px-4 font-semibold rounded hover:bg-green-900" 
                data-bs-toggle="modal" 
                data-bs-target={`#exampleModal`}>
                    {
                        loading?
                        <i class="fa-solid fa-spin fa-compass text-white"></i>
                        :
                        "Book Now !"
                    }
                {/* {loading?<i class="fa-solid fa-spin fa-rotate"></i>:`Remove`} */}
                </button>
                <div class="modal fade mt-52"  id={`exampleModal`} tabindex="-1" aria-labelledby={`exampleModalLabel`} >
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title primary-text" id={`exampleModalLabel`}>Booking Confirmation</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <div class="modal-body">
                            <p className='secondary-text'>Are you sure you want to book <span className='font-semibold'>{tour?.name}</span> tour which costs <span className='font-semibold'>{tour?.price +' $'}</span> ?</p>
                        </div>

                        {
                            result? <p className='text-xs font-semibold text-green-600 mx-2 text-start'>{result}</p>:""
                        }
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {
                            loading?
                            <button type="button" onClick={handleBooking}   class="btn bg-stone-300 text-green-500 py-2 px-4 font-semibold rounded hover:bg-green-700">
                                <i class="fa-solid fa-compass fa-spin"></i>
                            </button>
                
                            :
                            <button type="button" onClick={handleBooking} data-bs-dismiss="modal"  class="btn bg-green-500 text-white py-2 px-4 font-semibold rounded hover:bg-green-700">Confirm Booking</button>
                        }
                    </div>
                    </div>
                </div>
                </div>
                </>
            }

        </div>
        
      )
  }


const RatingStars = ({rate, setRate}) => {
    // const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleStarHover = (value) => {
        setHoverRating(value);
    };

    const handleStarClick = (value) => {
        setRate(value);
    };

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <i
                    key={index}
                    className={`cursor-pointer text-3xl ${
                        (index < hoverRating || index < rate) ? 'fas' : 'far'
                    } fa-star text-yellow-600`}
                    onMouseEnter={() => handleStarHover(index + 1)}
                    onMouseLeave={() => handleStarHover(0)}
                    onClick={() => handleStarClick(index + 1)}
                ></i>
            ))}
        </div>
    );
};


//Post review
export async function action({request}){
    const formData = await request.formData()
    const review = Object.fromEntries(formData);
    // console.log(review)
    if(review.rating == '0' && review.review == "") {
        return "empty"
    }
    if(review.review == "") {
        review.review = "No Review"
    }
    const tourId = review.tourId
    delete review.tourId
    // console.log(review)
    const res = await addReview(tourId, review)
    if(res.status === 201){
        return res.data.data.reviews
    }else{
        return "Error"
    }
  }
