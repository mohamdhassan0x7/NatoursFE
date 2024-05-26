import React, { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter, redirect, useNavigate } from 'react-router-dom';
import AppLayout from './Features/UI/AppLayout';
import Error from './Features/UI/Error';
import SignUp, {action as signUpAction} from './Features/User/SignUp';
import Home, { homeLoader } from './Features/Tours/Home';
import AllTours from './Features/Tours/AllTours';
import TourPage, {action as oneTourAction} from './Features/Tours/TourPage';
import Login, {action as logInAction} from './Features/User/LogIn';
import Profile ,{loader as profileLoader, UserInfo, UserBookList, UserWishList, UserReviews, BookingLoader, WishListLoader, ReviewsLoader , ReviewAction} from './Features/User/Profile';
import isExpired from './Services/CheckExpired';
import Error404 from './Features/UI/Error404';


  function ProtectedRoute({children})
  {
    if(isExpired()){
      return <Navigate to='/login'/>
    }else{
      return children
    }
  }

  const router = createBrowserRouter([
    {
        element: <AppLayout/>,     
        children: [ 
            {
              path: '/',
              element: <ProtectedRoute> <Home/> </ProtectedRoute> ,
              loader:homeLoader
            },
            {
              path: '/profile',
              element: <ProtectedRoute><Profile/></ProtectedRoute>,
              loader: profileLoader,
              children:[
                {path: 'info',element: <ProtectedRoute><UserInfo/></ProtectedRoute>},
                {path: 'booking',element: <ProtectedRoute><UserBookList/></ProtectedRoute>, loader:BookingLoader},
                {path: 'wishList',element: <ProtectedRoute><UserWishList/></ProtectedRoute>, loader:WishListLoader},
                {path: 'reviews',element: <ProtectedRoute><UserReviews/></ProtectedRoute>, loader:ReviewsLoader, action:ReviewAction},

              ]
            },
            {
              path: '/tours',
              element: <ProtectedRoute><AllTours/></ProtectedRoute>,
            },
            {
              path: '/tours/:id',
              element: <ProtectedRoute><TourPage/></ProtectedRoute>,
              action: oneTourAction
            },
            {
              path: '/signup',
              element: <SignUp/>,
              action: signUpAction
            },
            {
              path: '/login',
              element: <Login/>,
              action: logInAction
            },{
              path: '/*',
              element: <Error404/>
            }
        ]
    }
    
    ]);

function App() {
  return (
        <RouterProvider router = {router}  ></RouterProvider>
    )
}
export default App;

