import React, { createContext, useContext, useEffect, useState } from 'react'
import { useActionData, useLoaderData, useNavigation } from 'react-router-dom'
import { EditUserImage, addUserImage, editReview, getBooking, getReviews, getUser, getWishList, removeReview, removeTourFromBooking, removeTourFromWishList, updatePassword, updateUser } from '../../Services/apiUser'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useUserContext } from '../UI/AppLayout'
import { Form } from 'react-router-dom'


const profileContext = createContext()
export default function Profile() {
    const linkClass = 'w-full secondary-text  text-center font-semibold text-lg hover:bg-stone-500 hover:text-stone-50 transition duration-300 py-3  border-b border-stone-300 '
    
    const [user, setUser] = useState(useLoaderData())
    const {userData ,setUserData} = useUserContext()

    
  return (
    <div className='mt-24 m-12 secondary-text'>
        <div className='grid grid-cols-3 gap-4 '>
            <div className='col-span-3  lg:col-span-1 bg-stone-100 rounded-lg overflow-hidden flex flex-col items-center justify-center'>
                <div className='m-3 '>
                  <div className=' rounded-2xl'>
                    <img src={user?.photo} alt="" className='w-96 h-96 rounded-3xl sm:rounded-full'/>
                  </div>
                    <h3 className='primary-text text-2xl capitalize font-semibold my-4 text-center'></h3>
                </div>
                <Link className={`${linkClass} ${window.location.href.toString().includes('info')?"text-stone-50 bg-stone-500":"bg-stone-100"}`} to={'info'}> <p className={``}>Info</p> </Link>
                <Link className={`${linkClass} ${window.location.href.toString().includes('booking')?"text-stone-50 bg-stone-500":"bg-stone-100"}`} to={'booking'}>Booking List</Link>
                <Link className={`${linkClass} ${window.location.href.toString().includes('wishList')?"text-stone-50 bg-stone-500":"bg-stone-100"}`} to={'wishList'}>Wish List</Link>
                <Link className={`${linkClass} ${window.location.href.toString().includes('reviews')?"text-stone-50 bg-stone-500":"bg-stone-100"}`} to={'reviews'}>Previous Reviews</Link>

            </div>
            <div className='col-span-3 lg:col-span-2 bg-stone-100 rounded-lg'>
                <profileContext.Provider value={{user, setUser}} >
                    <Outlet/>
                </profileContext.Provider>
            </div>
            
        </div>
    </div>
  )
}

export function UserInfo() {

  const {user, setUser} = useContext(profileContext)
  const [iconClass, setIconClass] = useState("fa-solid fa-pen-to-square cursor-pointer" )
  const [error, seterror] = useState(null)
  const [imageClass, setimageClass] = useState('cursor-pointer text-stone-600')
  const [active, setActive] = useState(false)
  const inputClass ='font-semibold capitalize w-[50%] sm:w-fit sm:text-xl py-0 px-2 sm:px-4 me-2 outline-none placeholder:text-stone-600 focus:placeholder:text-stone-400 focus:ring-1 focus:ring-green-300 rounded-2xl '
  const [Loading, setLoading] = useState(false)
  const {setUserData} = useUserContext()

  async function handleEditIcon() {
    const fn_input = document.getElementById('firstName');
    const ln_input = document.getElementById('lastName');
    const img_input = document.getElementById('image');

      if(fn_input.disabled) {
        fn_input.disabled = false
        ln_input.disabled = false
        img_input.disabled = false
        setActive(true)
        setimageClass('cursor-pointer text-green-500')
        setIconClass("fa-solid fa-check cursor-pointer text-green-500 text-lg")
        document.querySelector('.cancel').hidden = false
      }
      else{
            if(!fn_input.value && !ln_input.value && !img_input.files[0]){
              seterror('Please enter a new data to update')
              return
            }
            if (fn_input.value && !/^[a-zA-Z]+$/.test(fn_input.value)) {
              seterror('First name must contain only letters');
              return
            }
            if (ln_input.value && !/^[a-zA-Z]+$/.test(ln_input.value)) {
              seterror('Last name must contain only letters');
              return
            }
            if(img_input.files[0]){
              setimageClass('cursor-pointer text-green-900')
              setLoading(true)
              const res1 = await EditUserImage(img_input.files[0], user._id)
              setLoading(false)
              if(res1.status === 200){
                // localStorage.setItem('user', JSON.stringify(res.data.data.user))
                seterror(null)
                setFileName('')
                setActive(false)
                document.querySelector('.cancel').hidden = true
                setIconClass("fa-solid fa-pen-to-square cursor-pointer")
                setimageClass('cursor-pointer text-stone-600')
                setUser(res1.data.data.user)
                setUserData(res1.data.data.user)
                localStorage.setItem('user', JSON.stringify(res1.data.data.user))

              }
              else{
                seterror(res1.response.data.message)
                return
              }

            }
            const updateData = {
              firstName: document.getElementById('firstName').value,
              lastName: document.getElementById('lastName').value,
            }
            for (const key in updateData) {
              if (!updateData[key]) {
                updateData[key] = document.getElementById(key).placeholder;
              }
            }
            if(updateData.firstName !== user.firstName || updateData.lastName !== user.lastName){
              setLoading(true)
              const res2 = await updateUser(updateData)
              setLoading(false)
              if(res2.status === 200){
                fn_input.value = ""
                ln_input.value = ""
                img_input.value = ""
                fn_input.disabled = true
                ln_input.disabled = true
                img_input.disabled = true
                setFileName('')
                setActive(false)
                seterror(null)
                document.querySelector('.cancel').hidden = true
                setIconClass("fa-solid fa-pen-to-square cursor-pointer")
                setimageClass('cursor-pointer text-stone-600')
                setUser(res2.data.data.user)
                setUserData(res2.data.data.user)
                localStorage.setItem('user', JSON.stringify(res2.data.data.user))
                // console.log(user)
              }
              else{
                seterror(res2.response.data.message)
              }
            }
      }
    }
    function handleCancelEdit(){
      const fn_input = document.getElementById('firstName');
      const ln_input = document.getElementById('lastName');
      const img_input = document.getElementById('image');
      fn_input.value = ""
      ln_input.value = ""
      img_input.value = ""
      setFileName('')
      fn_input.disabled = true
      ln_input.disabled = true
      img_input.disabled = true
      setActive(false)
      setimageClass('cursor-pointer text-stone-600')
      setIconClass("fa-solid fa-pen-to-square cursor-pointer")
      seterror(null)
      document.querySelector('.cancel').hidden = true
    }

    const [fileName, setFileName] = useState('')
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
      } else {
        setFileName('');
      }
    };

  return (
    <div className='p-2'>
      <div className='sm:p-7 md:p-12'> 
      <div className='flex gap-x-3'>
        <h1 className='text-2xl sm:text-3xl font-semibold primary-text mb-4'>User Info</h1> 
        {
          Loading?
          <div>
            <i class="fa-solid fa-spin fa-compass"></i>
          </div>
          :
          <i class={iconClass} onClick={()=>handleEditIcon('lastName')}></i>
        }
      <i class="cancel fa-solid fa-xmark cursor-pointer text-red-500 text-lg" onClick={handleCancelEdit} hidden></i>
      </div>

      <div className='mb-3 '>
        <label htmlFor="name" className='sm:text-lg font-semibold primary-text me-3'>First Name: </label>
        <input type="text" 
        id='firstName'
        className={inputClass}
        placeholder={`${user.firstName}`}
        disabled
        />
      </div>

      <div className='mb-3 flex items-center  '>
        <label htmlFor="name" className='text-lg font-semibold primary-text me-3 '>Last Name: </label>
        <input type="text" 
        id='lastName'
        className={inputClass}
        placeholder={`${user.lastName}`}
        disabled
        /> 
      </div>

      <div className='mb-3 md:flex md:items-center md:gap-x-3'>
        <p className='text-lg font-semibold primary-text'>Email: </p>
        <p className='font-semibold w-[50%] sm:text-lg py-2 px-2 sm:px-4 outline-none placeholder:text-stone-600 focus:placeholder:text-stone-400 focus:ring-1 focus:ring-green-300 rounded-2xl '> 
          {user.email} 
        </p>
      </div>
      
      <div className='w-52'>
        <div className={`text-center relative flex items-center w-full  `}>
            <label
            htmlFor="image"
            className={`rounded-sm text-stone-50 w-full p-2 ${active? "bg-green-500 ":"bg-stone-600"} transition`}
            > <i class="fa-solid fa-cloud-arrow-up me-2"></i> Edit Image</label>
            <input 
            accept="image/*"
            onChange={handleFileChange}
            name='image' 
            id='image' 
            type="file" 
            className={`absolute left-0 opacity-0 ${active? "cursor-pointer":""}`}
            aria-hidden="true"
            disabled
            />
        </div>
          <p className='text-sm test-green-800'>{fileName}</p>
        <div className='w-full mt-3'>
          <ChangePassword active={active}></ChangePassword>
        </div>
      </div>
      <p className='font-semibold text-sm text-red-500'>{error}</p>
     </div>
    </div>
  )
}

export  function ChangePassword({active}) {

  const [error, seterror] = useState(null)
  const [success, setsuccess] = useState(false)
  useEffect(() => {
  if(active){
      document.getElementById('changeBtn').disabled = false
    }
    else{
      document.getElementById('changeBtn').disabled = true
    }
  }, [active])
  
  useEffect(() => {
    const modalEl = document.getElementById('exampleModal');
    const handleModalClose = () => {
      document.getElementById('currentPassword').value = ''
      document.getElementById('newPassword').value = ''
      document.getElementById('newPasswordConfirm').value = ''
      seterror(null);
    };

    if (modalEl) {
      modalEl.addEventListener('hidden.bs.modal', handleModalClose);
    }
    return () => {
      if (modalEl) {
        modalEl.removeEventListener('hidden.bs.modal', handleModalClose);
      }
    };
  }, []);

  async function handleChangePassword(){
    seterror(null)
    const currentPassword = document.getElementById('currentPassword').value
    const newPassword = document.getElementById('newPassword').value
    const newPasswordConfirm = document.getElementById('newPasswordConfirm').value
    if(!currentPassword || !newPassword || !newPasswordConfirm){
      seterror('Please fill all fields')
      return
    }
    if(newPassword !== newPasswordConfirm){
      seterror('Passwords do not match')
      return
    }
    if(newPassword.length < 8){
      seterror('Password must be at least 8 characters long')
      return
    }
    const res = await updatePassword({currentPassword, newPassword, newPasswordConfirm})
    if(res.status === 200){
      document.getElementById('currentPassword').value = ''
      document.getElementById('newPassword').value = ''
      document.getElementById('newPasswordConfirm').value = ''
      seterror(null)
      setsuccess(true)
    }
    else{
      // console.log("DdEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
      seterror(res.response.data.message)
    }
  }

  return (
    <div className=''>
    <button type="button" id='changeBtn' class={`w-full rounded-sm text-stone-50 p-2 ${active? "bg-green-500":"bg-stone-600"} transition`} data-bs-toggle="modal" data-bs-target="#exampleModal">
      Change Password
    </button>

    <div class="modal fade mt-52 " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content" >
          <div class="modal-header">
            <h5 class="modal-title primary-text font-semibold text-lg" id="exampleModalLabel">Change Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body bg-stone-100">
            <Form onSubmit={handleChangePassword}>
              <div className='mb-3 flex justify-between'>
                <label htmlFor="currentPassword" className='font-semibold primary-text me-4'>Current Password: </label>
                <input type="password" id='currentPassword' className='font-semibold text-sm w-[50%] sm:w-fit sm:text-xl py-0 px-2 outline-none sm:px-4 me-2 focus:ring-1 focus:ring-green-300 rounded-2xl'/>
              </div>
              <div className='mb-3 flex justify-between'>
                <label htmlFor="newPassword" className='font-semibold primary-text me-4'>New Password: </label>
                <input type="password" id='newPassword' className='font-semibold w-[50%] sm:w-fit sm:text-xl py-0 px-2 outline-none sm:px-4 me-2 focus:ring-1 focus:ring-green-300 rounded-2xl '/>
              </div>
              <div className='mb-3 flex justify-between'>
                <label htmlFor="newPasswordConfirm" className='font-semibold primary-text me-4'>Confirm Password: </label>
                <input type="password" id='newPasswordConfirm' className='font-semibold w-[50%] sm:w-fit sm:text-xl py-0 px-2 outline-none sm:px-4 me-2 focus:ring-1 focus:ring-green-300 rounded-2xl '/>
              </div>
              <p className='font-semibold text-sm text-red-500'>{error}</p>
              <p className='font-semibold text-sm text-green-500'>{success?"Password changed successfully":""}</p>
              <div class="modal-footer">
                <button type="submit"  class="bg-green-500 text-stone-50 p-2 font-semibold rounded-lg hover:bg-green-600 transition-all duration-200">Save changes</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export function UserWishList(props) {
  const [wishList, setwishList] = useState(useLoaderData())
  return (
    <div className='p-2  h-full'>
      <div className='sm:p-7 md:p-12 h-full'> 
        <div className='flex gap-x-3'>
          <h1 className='text-2xl sm:text-3xl font-semibold primary-text mb-4'>Wishlisht Tours</h1> 
        </div>
        {
            wishList.length===0?
            <div className='col-span-2 flex justify-center items-center md:h-full '>
                <p className='text-xl sm:text-2xl md:text-4xl lg:text-6xl font-semibold text-stone-300'>No Tours Found</p>
              </div>:""
          }
        <div className='grid grid-cols-4 gap-3 '>
          {
            wishList.length>0?wishList.map((tour) => {
              return (
                <div className='col-span-4 sm:col-span-2 xl:col-span-1 h-full'>
                <Tour tour={tour} key={tour.id} listName={"WishList"} data={wishList} setData={setwishList}/>
                </div>
              )
            }):
            ""
          }
        </div>
    </div>
  </div>
  )
}

export function UserBookList() {
  
  const [booking, setBooking] = useState(useLoaderData())
    return (
    <div className='p-2 h-full overflow-hidden '>
        <div className='sm:p-7 md:p-12 h-full'> 
          <div className='sm:flex sm:gap-x-3 sm:items-center sm:justify-between'>
            <h1 className='text-2xl sm:text-3xl font-semibold primary-text mb-4'>Booked Tours</h1> 
            <p className='primary-text font-semibold text-stone-500 text-lg'>Total Cost : {booking.reduce((total, obj) => total + obj.price, 0)} $</p>
          </div>
          {
            booking.length===0?
            <div className='col-span-2 flex justify-center items-center md:h-full '>
                <p className='text-xl sm:text-2xl md:text-4xl lg:text-6xl font-semibold text-stone-300'>No Tours Found</p>
              </div>:""
        
          }
          <div className='grid grid-cols-4 gap-3'>
            {
              booking?.length>0?booking.map((tour) => {
                return (
                  <div className='col-span-4 sm:col-span-2 xl:col-span-1 h-full'>
                    <Tour tour={tour} key={tour.id} listName={"Booking"} data={booking} setData={setBooking} />
                  </div>
                )
              }):""
            }

          </div>
      </div>
      
    </div>
    )
}
 
function Remove({tour, listName, reviewId, data, setData}) {
  
  const {user, setUser} = useContext(profileContext)
  const [loading, setloading] = useState(false)

  async function handleRemove(){
    if(listName === 'Booking'){
      setloading(true)
      const res = await removeTourFromBooking({tourId:tour._id})
      console.log(res)
      setloading(false)
      if(res.status === 200){
        setData(data.filter((item) => item._id !== tour._id))
      }
    }else if(listName === 'WishList'){
      setloading(true)
      const res = await removeTourFromWishList({tourId:tour._id})
      console.log(res)
      setloading(false)
      if(res.status === 200){
        setData(data.filter((item) => item._id !== tour._id))
      }
    }else if(listName === 'Reviews'){
      setloading(true)
      const res = await removeReview(reviewId)
      console.log(res)
      setloading(false)
      if(res.status === 200){
        setData(data.filter((item) => item._id !== reviewId))
    }
  }

  }
    return (
      <div className='w-full'>
      <button type="button" class="bg-red-600 w-full hover:bg-red-700 transition-all duration-300 text-white font-semibold text-sm my-2 p-2 rounded" 
      data-bs-toggle="modal" 
      data-bs-target={`#exampleModal${tour._id}`}>
      {loading?<i class="fa-solid fa-spin fa-compass"></i>:`Remove`}
      </button>
      <div class="modal fade mt-52" id={`exampleModal${tour._id}`} tabindex="-1" aria-labelledby={`exampleModalLabel${tour._id}`} >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id={`exampleModalLabel${tour._id}`}></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            {
              listName !== 'Reviews'?
              <div className="modal-body">
                Are you sure you want to remove <span className='font-semibold'>{tour.name}</span> tour from your {listName} list?
              </div>
              :
              <div class="modal-body">
                Are you sure you want to remove your rate for <span className='font-semibold'>{tour.name}</span> tour ?
              </div>
            }

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleRemove} data-bs-dismiss="modal"  class="btn btn-danger">Confirm Remove</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}

function Tour({tour, listName, data, setData}) {
  return (
    <div className='my-3 bg-white rounded-2xl overflow-hidden'>
      <div>
        <img src={tour.imageCover} alt="" className='w-fit ' />
      </div>
      <div className='p-3 flex-grow flex flex-col h-full'>
        <div>
          <p className='text-stone-600 font-semibold text-lg mb-3 truncate'>{tour.name}</p>
          <p>{tour.price} $</p>
        </div>
        <div className=''>
          <Link 
            to={`/tours/${tour.id}`}
            type='button'
            className="w-full text-center bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-semibold text-sm my-2 p-2 rounded">
              Learn More
          </Link>
          <Remove tour={tour} listName={listName} data={data} setData={setData}></Remove>   
        </div>
      </div>
    </div>
  )
}

export function UserReviews(props) {
  const [reviews, setReviews] = useState(useLoaderData())
  
  function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleString('en-US', options);
}
  return (
    <div className='p-2  h-full'>
    <div className='sm:p-7 md:p-12 h-full'>
    <div className='flex gap-x-3'>
          <h1 className='text-2xl sm:text-3xl font-semibold primary-text mb-4'>Previous Reviews</h1> 
        </div>
        {
          reviews.length===0?
          <div className='col-span-2 flex justify-center items-center md:h-full '>
              <p className='text-xl sm:text-2xl md:text-4xl lg:text-6xl font-semibold text-stone-300'>No Reviews Found</p>
            </div>:""
        }
      {
        reviews.length>0?reviews.map((review) => {
          return (
            <div className='bg-white rounded-2xl mb-2'>
                <div className=' lg:flex lg:justify-between'>
                <Link 
                  to={`/tours/${review.tour.id}`}
                  type='button'
                  className="text-stone-50 flex flex-col justify-center font-semibold text-center bg-green-500 hover:bg-green-600 transition-all duration-300 w-fit px-3 py-2 rounded-r-lg">
                    {review.tour.name}
                    <p className='text-xs underline font-light'>CLick to go to tour page</p>
                </Link>
                  <div className='p-2'>
                    <p className='text-stone-600 font-semibold  mb-1'><span className='primary-text me-3'> Review Context: </span>{review.review}</p>
                    <p className='text-stone-600 font-semibold  mb-1'><span className='primary-text me-3'> Your Rate:  </span>{review.rating} <i class="fa-solid fa-star text-yellow-500"></i></p>
                    <p className='text-stone-600 font-semibold text-xs sm:text-sm mb-1'><span className='primary-text me-3 '> Created At:  </span>{formatDateString(review.createdAt)} </p>
                  </div>
                  <div className=' lg:w-[25%] p-2 flex justify-between gap-x-4 lg:inline-block '>
                    <Remove tour={review.tour} listName={"Reviews"} reviewId={review._id} data={reviews} setData={setReviews} ></Remove>
                    <EditReview review={review} allReviews={reviews} setReviews={setReviews}></EditReview>
                  </div>
                </div>
            </div>
          )
        }):
        ""
      }
    </div>
  </div>
  )
}
  
function EditReview({review, allReviews, setReviews}) {
  const [loading, setLoading] = useState(false)
  const [rate, setRate] = useState(review.rating);
  useEffect(() => {
    const modalEl = document.getElementById('exampleModal');
    const handleModalClose = () => {
      document.getElementById('review').value = '';
      setRate(review.rating);
      seterror(null);
      setdone(null);
    };

    if (modalEl) {
      modalEl.addEventListener('hidden.bs.modal', handleModalClose);
    }
    return () => {
      if (modalEl) {
        modalEl.removeEventListener('hidden.bs.modal', handleModalClose);
      }
    };
  }, []);

  const [error, seterror] = useState(null)
  const [done, setdone] = useState(null)
  async function handleReq(e){
    console.log(e.target.review.value)
    if(e.target.rating.value == review.rating && e.target.review.value == ""){
      e.preventDefault()
      setdone(null)
      seterror('Please enter a new data to update')
      return
    }else if(e.target.review.value == ""){
        e.target.review.value = review.review
    }
    
  }
  const res = useActionData()
  useEffect(() => {
    if(res){
      setReviews(res)
      seterror(null)
      setdone('Review updated successfully')
    }
  }, [res])
  return (
    <div className='w-full'>
    <button type="button" class="bg-stone-400 w-full hover:bg-stone-600 transition-all duration-300 text-white font-semibold text-sm my-1 p-2 rounded" 
    data-bs-toggle="modal" 
    data-bs-target={`#exampleModal${review._id}`}>
    {loading?<i class="fa-solid fa-spin fa-compass"></i>:`Edit`}
    </button>
    <div class="modal fade  mt-52" id={`exampleModal${review._id}`} tabindex="-1" aria-labelledby={`exampleModalLabel${review._id}`} >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title primary-text font-semibold text-lg" id={`exampleModalLabel${review._id}`}>Edit Review</h5>
            <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {/* {----------------------------------------------------------------------------------} */}
          <Form method='PATCH' onSubmit={handleReq}  className='secondary-text rounded-lg p-4 pt-0 bg-stone-50'>
                    <input type="number" hidden value={rate} name="rating" id="" />
                    <input type="text" id='reviewId' name='reviewId' value={review._id} hidden />
                    <div className='flex flex-col gap-y-3 mt-3'>
                        <textarea 
                        placeholder={review.review}
                        name="review" 
                        id="review" 
                        className='border shadow-sm rounded-lg p-3 w-full h-24 outline-none focus:ring-2 focus:ring-green-500 placeholder:text-stone-700 focus:placeholder:text-stone-300'></textarea>
                    </div>
                    <div className='mt-4 sm:flex sm:items-center sm:justify-between sm:px-5 mb-3'>
                        <RatingStars rate={rate} setRate={setRate}></RatingStars>
                    </div>
                    <div className='text-end px-3'>
                        <p className='text-sm text-green-600 font-semibold'>{done}</p>
                        <p className='text-xs text-red-600 font-semibold'>{error}</p>
                    </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="bg-green-500  text-stone-50 p-2 px-4 text-md hover:bg-green-600 transition-all duration-300 rounded-lg sm:mt-0">Submit Review</button>
            </div>
           </Form>
          {/* {----------------------------------------------------------------------------------} */}

        </div>
      </div>
    </div>
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














export async function loader(){
    const res = await getUser()
    // console.log(res.data.data.user)
    if(res.data) return res.data.data.user
    else return null
  }

export async function BookingLoader(){
  const res = await getBooking()
  // console.log(res.data.data.booking)
  if(res.data) return res.data.data.booking
  else return null
}

export async function WishListLoader(){
  const res = await getWishList()
  console.log(res.data.data.wishList)
  if(res.data) return res.data.data.wishList
  else return null
}

export async function ReviewsLoader(){
  const res = await getReviews()
  // console.log(res.data.data.reviews)
  if(res.data) return res.data.data.reviews
  else return null
}

export async function ReviewAction({request}){
  const formData = await request.formData()
  const review = Object.fromEntries(formData);
  console.log(review)
  const reviewId = review.reviewId
  delete review.reviewId
  const res = await editReview(reviewId, review)
  // console.log(res.data.data.reviews)
  return res.data.data.reviews
}