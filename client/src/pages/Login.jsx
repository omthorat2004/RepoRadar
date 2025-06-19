import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import '../styles/login.css'

const defaultData = {
  email: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState(defaultData)
  const [showPassword, setShowPassword] = useState(false)

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
    console.log(formData)
  }

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

            <button type='submit' className='submit-btn'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
