import Email from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import VpnKeyIcon from '@mui/icons-material/VpnKey'

import { useState } from 'react'
import '../styles/signup.css'
const defaultData = {
  username: '',
  email: '',
  personalAccessToken: '',
  password: ''
}
const Signup = () => {
  const [formData, setFormData] = useState(defaultData)
  const [visiblityOn, setVisibilityOn] = useState(false)

  const toggleVisibility = () => {
    setVisibilityOn(!visiblityOn)
  }

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className='signup-wrapper h-full w-full flex justify-center items-center'>
      <form className='signup-form' onSubmit={handleSubmit}>
        <div className='signup-form-container flex flex-col'>
          <div className='signup-form-heading flex'>
            <PersonIcon fontSize='medium' className='person-icon' />
            <h2>Signup Form</h2>
          </div>
          <div className='signup-form-component flex items-center justify-center flex-col'>
            <div className='input-wrapper'>
              <PersonIcon className='input-icon' />
              <input
                type='text'
                placeholder='Username'
                className='input-field'
                onChange={handleChange}
                value={formData.username}
                required
              />
            </div>
            <div className='input-wrapper'>
              <Email fontSize='medium' className='input-icon' />
              <input
                type='email'
                className='input-field'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='input-wrapper'>
              <VpnKeyIcon fontSize='medium' className='input-icon' />
              <input
                type='text'
                className='input-field'
                placeholder='Personal Access Token'
                value={formData.personalAccessToken}
                onChange={handleChange}
                required

              />
            </div>

            <div className='input-wrapper'>
              <LockIcon fontSize='medium' className='input-icon' />
              <input
                className='input-field'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                type={visiblityOn ? 'text' : 'password'}
              />
              <span onClick={toggleVisibility} className='password-icon'>
                {visiblityOn ? (
                  <Visibility fontSize='medium' />
                ) : (
                  <VisibilityOff fontSize='medium' />
                )}
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

export default Signup
