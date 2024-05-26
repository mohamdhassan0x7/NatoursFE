import React, { createContext, useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet, useLoaderData, useLocation, useNavigation } from 'react-router-dom'
import Loader from './Loader'
// import { getUser } from '../../Services/apiUser'


export const userContext = createContext()


export default function AppLayout() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const [userData, setUserData] = useState(null)
  // const userLoader = useLoaderData()

  const navigation = useNavigation()
  const isLoading = navigation.state!=='idle'
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('user')))
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className='flex flex-col min-h-screen' >
      <userContext.Provider value={{userData, setUserData}}>
        {isLoading && <Loader/>}
        {userData && <NavBar pathname={pathname} isScrolled={isScrolled}></NavBar>}
        <main className='flex-grow'>
          <Outlet/>
        </main>
      </userContext.Provider>
      {
        pathname === '/login' || pathname === '/signUp' ? null : <BackToTopButton></BackToTopButton>
      }
      
      {
        pathname === '/login' || pathname === '/signUp' ? null : <Footer></Footer>
      }
    </div>
  )
}




export function useUserContext(){
  const context = useContext(userContext)
  return  context
}

const Footer = () => {
  return (
    <footer className="bg-green-500 text-white py-4  w-full">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className='text-white text-4xl font-dancing tracking-wide font-light'>Natours</p>
            <p className="text-sm">© 2024 Natours. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a className="fa-brands fa-github text-3xl hover:-translate-y-1 hover:text-stone-600 transition-all duration-500 mx-2" href="https://github.com/mohamdhassan0x7" target="_blank" rel="noopener noreferrer"></a>
            <a className="fa-brands fa-linkedin text-3xl hover:-translate-y-1 hover:text-stone-600 transition-all duration-500" href="https://www.linkedin.com/in/mohamed-hassan-4a0461209/" target="_blank" rel="noopener noreferrer"></a>
          </div>
        </div>
      </div>
    </footer>
  );
};





const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-12 right-4">
      <button
        onClick={scrollToTop}
        className={`p-3 rounded-full bg-green-500 text-white shadow-lg transition-all duration-700 ease-in-out transform 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
};

