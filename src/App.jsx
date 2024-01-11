import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { Header, Footer } from './components/index'
import './App.css'
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  console.log(useSelector((state) => state.auth))

  useEffect(() => {
    authService.getCurrnetUser()
      .then((userData) => { userData ? dispatch(login(userData)) : dispatch(logout()) })
      .finally(() => setLoading(false));
  }, [])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap bg-gray-400 text-center content-between'>
      <div className='w-full block '>
        <Header />

        <main>
          <Outlet />
        </main>
        <Footer />

      </div>
    </div>
  ) : null;
}

export default App
