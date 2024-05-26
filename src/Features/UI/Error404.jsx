import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-900 to-green-200 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link className="px-4 py-2  text-green-500 rounded-md font-semibold shadow-md bg-stone-50 hover:bg-stone-200 transition-all duration-300" to={'/'}>
        Go Back Home
      </Link>
    </div>
  )
}
