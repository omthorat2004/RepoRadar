import PersonIcon from '@mui/icons-material/Person'
import { useState } from 'react'
import '../styles/login.css'
const defaultData = {
  email: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState(defaultData)

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
  }
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <form className='login-form'>
        <div className='flex flex-col login-form-container'>
          <div className='login-form-heading flex items-center justify-center'>
            <PersonIcon fontSize='medium' className='person-icon' />
            <h2>Login Form</h2>
          </div>
          <div className='flex flex-col login-form-component'>
            <input 
            type='email'
            name='email'
            className='input-email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            />
            <input
              type='password'
              name='password'
              className='input-pass'
              value={formData.password}
              placeholder='Password'
              onChange={handleChange}
            />
            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
