import {Form, useActionData, useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { logIn } from '../../Services/apiUser';
import HomeImg2 from '../../assets/HomeImg2.jpg'
import { useContext, useEffect, useState } from 'react';
import { useUserContext } from '../UI/AppLayout';

export default function SignUp() {

  const{userData, setUserData} = useUserContext()
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
      // console.log(res.user)
      setUserData(res.user)
      localStorage.setItem('user', JSON.stringify(res.user))
      navigation(res.redirect)
    }
  }, [res])
  
  function changeInput(e){
    setFormErrors({...formErrors, [e.target.name]: null})
  }

  const inputClass = "p-2 border input-border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
  const labelClass = "text-sm font-medium text-gray-700 mb-1"
  return (
    <div className='m-6 sm:m-12 md:mt-24  gap-4'>
      <div
          className="absolute inset-0 bg-cover bg-center w-full h-full"
          style={{
            backgroundImage: `url('${HomeImg2}')`,
            filter: 'blur(1px)', // Adjust the blur intensity as needed
            zIndex: '-1', // Ensure the background stays behind other content
          }}
    >
      <div className='bg-black opacity-55 h-dvh w-[100%] absolute'></div>
    </div>
    
        <div className='flex flex-col items-center justify-center mx-auto mb-2'> 
        <h1 className='text-2xl font-semibold text-white font-badscript '>Welcome to</h1>
        <h1 className='text-7xl md:text-8xl lg:text-[10rem] font-semibold text-white font-dancing '>Natours</h1>
        <p className='text-stone-300 font-light'>Log In to get started</p>
        </div>
        <div className='md:w-[50%] lg:w-[35%] bg-stone-50 rounded-lg mx-auto '>
            <Form method="POST" className=" p-5 secondary-text">
            <div className="flex flex-col space-y-3 ">

                
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
                    {formErrors.password && <span className='text-red-500 text-xs'>{formErrors.password}</span>}
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

                
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Log In</button>
                {AxiosError && <span className='text-red-500 text-xs mx-auto'>{AxiosError}</span>}
                <div className='mx-auto'>
                <span className='secondary-text me-2'>Doesn't have an account?</span>
                <Link to={`/signUp`} className='secondary-text text-green-600 hover:text-green-800 underline mx-auto'>Sign Up</Link>
                </div>
            </div>
            </Form>
        </div>
    </div>
  );
}

function validateForm ({email, password}){
  const errors = {};

  if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
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
  const axiosRes = await logIn(userData)
  console.log(axiosRes)
  // localStorage.setItem('user', JSON.stringify(axiosRes?.data.User))
  console.log(axiosRes.headers)
  if(axiosRes?.status === 200){
    return{
      user: axiosRes?.data.User,
      redirect: '/'
    }
  }else{
    return {errorType:"axiosError",errors: axiosRes.response?.data.message}
  }  
}