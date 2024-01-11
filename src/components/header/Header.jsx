import React from 'react'
import { Container, Login, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
 const authStatus = useSelector((state) => state.auth.status);
 const navigate = useNavigate();

 const navItems = [
  {
   name: "Home",
   slug: "/",
   active: "true",
  },
  {
   name: "login",
   slug: "/login",
   active: "!authStatus",
  },
  {
   name: "Signup",
   slug: "/signup",
   active: "!authStatus",
  },
  {
   name: "All Posts",
   slug: "/all_posts",
   active: "authStatus",
  },
  {
   name: "Add Posts",
   slug: "/add_posts",
   active: "authStatus",
  },
 ]
 return (
  <header className='py-3 shadow bg-gray-500 w-full space-between '>
   <Container>
    <nav className='mr-4'><div className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
     <Link to="/" >BLOG</Link></div>
     <ul className='flex flex-wrap ml-auto'>
      {
       navItems.map((items) =>
        items.active ? (
         <li key={items.name}>
          <button onClick={() => navigate(items.slug)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 roundede-full'>{items.name}</button>
         </li>
        ) : null
       )
      }
      {
       authStatus && (
        <li>
         <LogoutBtn />
        </li>
       )
      }
     </ul>
    </nav>
   </Container>
  </header>
 )
}

export default Header
