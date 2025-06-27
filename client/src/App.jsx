import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import Navbar from './components/Navbar'
import {
  logOutUser,
  selectAuthToken
} from './features/authentication/authenticationSlice'
import Home from './pages/Home'
import Login from './pages/Login'
import Projects from './pages/Projects'
import Signup from './pages/Signup'
import PrivateRoute from './PrivateRoute'

function App () {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const token = useSelector(selectAuthToken)

  const [checkingToken, setCheckingToken] = useState(true)

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setCheckingToken(false)
        return
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_API}/validate-token`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (!response.ok) {
          dispatch(logOutUser())
          toast.error('Session expired. Please log in again.')
        }
      } catch (err) {
        dispatch(logOutUser())
      } finally {
        setCheckingToken(false)
      }
    }

    validateToken()
  }, [token, dispatch])

  if (checkingToken) return <p>Loading...</p>

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />

        {/* Protected Route */}
        <Route element={<PrivateRoute />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
