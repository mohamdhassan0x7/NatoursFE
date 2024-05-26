import {Form, useActionData, useNavigate} from 'react-router-dom'
import { addUserImage, signUp } from '../../Services/apiUser';
import boat from '../../assets/boat.jpg'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function SignUp() {

  const navigation = useNavigate();
  const res = useActionData()
  const [AxiosError, setAxiosError] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    if(res?.errorType === "formValidation"){
      setFormErrors(res.errors)
    }else if(res?.errorType === "axiosError"){
      setAxiosError(res.errors)
    }else if(res?.redirect){
      
      setFormErrors({})
      setAxiosError(false)
      // console.log(res.redirect)
      navigation(res.redirect)
    }
  }, [res])
  
  function changeInput(e){
    setFormErrors({...formErrors, [e.target.name]: null})
  }

  const inputClass = "p-2 border input-border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
  const labelClass = "text-sm font-medium text-gray-700 mb-1"
  return (
    <div className='sm:m-12 md:mt-14 md:flex md:justify-between gap-x-4 '>
       <div
          className="absolute inset-0 bg-cover bg-center w-full"
          style={{
            backgroundImage: `url('${boat}')`,
            position: 'fixed',
            filter: 'blur(1px)', // Adjust the blur intensity as needed
            zIndex: '-1', // Ensure the background stays behind other content
          }}
    >
      <div className='bg-black opacity-55 h-dvh w-[100%] absolute'></div>
    </div>
    <div className='flex flex-col items-center justify-center mx-auto mb-2'> 
      <h1 className='text-2xl font-semibold text-white font-badscript '>Welcome to</h1>
      <h1 className='text-7xl md:text-8xl lg:text-[10rem] font-semibold text-white font-dancing '>Natours</h1>
      <p className='text-stone-300 font-light'>Sign up to get started</p>
    </div>
      <div className='md:w-[50%] lg:w-[35%] bg-stone-50 rounded-lg '>
        <Form method="POST" className=" p-5 secondary-text" encType="multipart/form-data">
          <div className="flex flex-col space-y-3 ">

            <div className="flex flex-col">
              <div className='flex justify-between'>
                <label htmlFor="firstName" className={labelClass}>First Name</label> 
                {formErrors.firstName && <span className='text-red-500 text-xs'>{formErrors.firstName}</span>}
              </div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`${inputClass} border-red ${formErrors.firstName?'input-border-warning':''}`}
                onChange={changeInput}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className='flex justify-between'>
                <label htmlFor="lastName" className={labelClass}>Last Name</label>
                {formErrors.lastName && <span className='text-red-500 text-xs'>{formErrors.lastName}</span>}
              </div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`${inputClass} border-red ${formErrors.lastName?'input-border-warning':''}`}
                onChange={changeInput}
                required
              />
            </div>
            
            <div className="flex flex-col">
              <div className='flex justify-between'>
                <label htmlFor="email" className={labelClass}>Email Address</label>
                {formErrors.email && <span className='text-red-500 text-xs'>{formErrors.email}</span>}
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className={`${inputClass} border-red ${formErrors.email?'input-border-warning':''}`}
                onChange={changeInput}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className='flex justify-between'>
                <label htmlFor="phone" className={labelClass}>Password</label>
                {formErrors.phone && <span className='text-red-500 text-xs'>{formErrors.phone}</span>}
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className={`${inputClass} border-red ${formErrors.password?'input-border-warning':''}`}
                onChange={changeInput}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className='flex justify-between'>
                <label htmlFor="password" className={labelClass}>Confirm Password</label>
                {formErrors.passwordConfirem && <span className='text-red-500 text-xs'>{formErrors.passwordConfirem}</span>}
              </div>
              <input
                type="password"
                id="passwordConfirem"
                name="passwordConfirem"
                className={`${inputClass} border-red ${formErrors.passwordConfirem?'input-border-warning':''}`}
                onChange={changeInput}
                required
              />
            </div>

            <div className='relative'>
              <p className={labelClass}>Upload Profile Picture</p>
              <label
              htmlFor="image"
              className='cursor-pointer bg-stone-400 p-2 text-stone-50 rounded-md hover:bg-stone-500 hover:text-stone-100 transition-all duration-300 inline-block ease-in-out'
              > <i class="fa-solid fa-cloud-arrow-up"></i> Upload</label>
              <input 
              accept="image/*"
              name='image' 
              id='image' 
              type="file" 
              className='absolute left-0 opacity-0 cursor-pointer'
              aria-hidden="true"
              required/>
            </div>

            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Sign Up</button>
            {AxiosError && <span className='text-red-500 text-xs mx-auto'>{AxiosError}</span>}
            <div className='mx-auto'>
              <span className='secondary-text me-2'>Already have an account?</span>
              <Link to={'/login'}  className='secondary-text text-green-600 hover:text-green-800 underline mx-auto'>Sign In</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

function validateForm ({firstName, lastName, email, password, passwordConfirem, image}){
  const errors = {};

  // console.log(image)
  if (!/^[a-zA-Z]+$/.test(firstName)) {
    errors.firstName = 'First name must contain only letters';
  }

  if (!/^[a-zA-Z]+$/.test(lastName)) {
    errors.lastName = 'Last name must contain only letters';
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }
  if (password !== passwordConfirem) {
    errors.passwordConfirem = 'Passwords do not match';
  }
  return errors;
};

export async function action({request}){
  const formData = await request.formData()
  const userData = Object.fromEntries(formData);
  const errors = validateForm(userData);
  if (Object.keys(errors).length > 0) {
    return {errorType:"formValidation",errors}
  }
  const image = userData.image
  delete userData.image
  const axiosRes = await signUp(userData)
  if(axiosRes?.status === 201){
    const imageUpload = await addUserImage(image, axiosRes.data.data.user._id)
    return{
      redirect: '/login'
    }
  }else{
    return {errorType:"axiosError",errors: axiosRes.response.data.message}
  }  
  return null
}