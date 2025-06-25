import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import {
  logOutUser,
  selectAuthToken
} from './features/authentication/authenticationSlice'
// import { toast } from 'react-toastify' // Using toast

const PrivateRoute = () => {
  const token = useSelector(selectAuthToken)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const [isValid, setValid] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setLoading(false)
        setValid(false)
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

        if (response.ok) {
          const { message } = await response.json()
          // toast.success(message)
          setValid(true)
        } else {
          dispatch(logOutUser())
          setValid(false)
        }
      } catch (error) {
        dispatch(logOutUser())
        setValid(false)
      } finally {
        setLoading(false)
      }
    }

    validateToken()
  }, [token, dispatch])

  if (loading) return <div>Loading...</div>

  return isValid ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute
