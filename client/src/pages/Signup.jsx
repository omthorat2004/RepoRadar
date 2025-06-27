import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import Email from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthMessage,
  selectAuthSuccess,
  signupUser
} from '../features/authentication/authenticationSlice'
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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const success = useSelector(selectAuthSuccess)
  const error = useSelector(selectAuthError)
  const message = useSelector(selectAuthMessage)
  const loading = useSelector(selectAuthLoading)

  const toggleVisibility = () => {
    setVisibilityOn(!visiblityOn)
  }

  const handleChange = e => {
    // console.log('Onchange Function Called..')
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const pasteText = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setFormData(prev => ({
        ...prev,
        personalAccessToken: text
      }))
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchGitlabInformation = async () => {
    try {
      const response = await fetch('https://gitlab.com/api/v4/user', {
        headers: {
          Authorization: `Bearer ${formData.personalAccessToken}`
        }
      })
      console.log('gitlab ')

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        throw new Error('Gitlab API Error')
      }
      const user = await response.json()

      const gitlab_username = user.username
      const gitlab_profile_url = user.web_url
      const avatar_url = user.avatar_url
      return { gitlab_profile_url, gitlab_username, avatar_url }
    } catch (err) {
      toast.error('Invalid Personal Access Token')
    }
  }

  useEffect(() => {
    if (success) {
      toast.success('Signup Successful!')
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    }
    if (error) {
      toast.error(message)
      setFormData(defaultData)
    }
  }, [success, error, dispatch, navigate])

  const handleSubmit = async e => {
    e.preventDefault()

    if (formData.personalAccessToken) {
      const gitlabInfo = await fetchGitlabInformation()
      if (gitlabInfo) {
        dispatch(signupUser({ ...formData, ...gitlabInfo }))
      } else {
        toast.error('Personal Access token Error')
      }
    }
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
                name='username'
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
                name='email'
                required
              />
            </div>
            <div className='input-wrapper'>
              <VpnKeyIcon fontSize='medium' className='input-icon' />
              <input
                type='text'
                className='input-field'
                placeholder='Personal Access Token'
                name='personalAccessToken'
                value={formData.personalAccessToken}
                onChange={handleChange}
                required
              />
              <span className='paste-text-icon' onClick={pasteText}>
                <ContentPasteIcon fontSize='medium' />
              </span>
            </div>

            <div className='input-wrapper'>
              <LockIcon fontSize='medium' className='input-icon' />
              <input
                className='input-field'
                placeholder='Password'
                value={formData.password}
                name='password'
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
