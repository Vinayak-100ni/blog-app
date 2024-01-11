import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
 return (
   <footer className="py-3 shadow bg-gray-500 w-full flex items-center justify-between">
   <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
     <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BLOG</span>
     </Link>
     <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-800">
      <li>
       <Link to="/" className="hover:underline me-4 md:me-6">About</Link>
      </li>
      <li>
       <Link to="/" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
      </li>
      <li>
       <Link to="/" className="hover:underline me-4 md:me-6">Licensing</Link>
      </li>
      <li>
       <Link to="/" className="hover:underline">Contact</Link>
      </li>
     </ul>
    </div>
   </div>
  </footer>
 )
}

export default Footer
