import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  loginUser,
  selectAuthError,
  selectAuthLoading,
  selectAuthMessage,
  selectAuthSuccess,
  setInitialState
} from '../features/authentication/authenticationSlice'
import '../styles/login.css'

const defaultData = {
  email: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState(defaultData)
  const [showPassword, setShowPassword] = useState(false)
  const success = useSelector(selectAuthSuccess)
  const error = useSelector(selectAuthError)
  const loading = useSelector(selectAuthLoading)
  const message = useSelector(selectAuthMessage)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }

  useEffect(() => {
    if (success) {
      toast.success('Login Successful!')
      dispatch(setInitialState())
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }

    if (error) {
      toast.error(message)
      dispatch(setInitialState())
    }
  }, [success, error, dispatch, navigate])

  return (
    <div className='login-wrapper'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='login-form-container'>
          <div className='login-form-heading'>
            <PersonIcon fontSize='medium' className='person-icon' />
            <h2>Login Form</h2>
          </div>

          <div className='login-form-component flex flex-col'>
            <div className='input-wrapper'>
              <PersonIcon className='input-icon' />
              <input
                type='email'
                name='email'
                className='input-field'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
              />
            </div>

            <div className='input-wrapper'>
              <LockIcon className='input-icon' />
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                className='input-field'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
              />
              <span
                className='visibility-toggle'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>

            <button
              disabled={loading}
              type='submit'
              className={`submit-btn ${loading ? 'disabled-btn' : ''}`}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
