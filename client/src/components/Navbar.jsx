import LogoutIcon from '@mui/icons-material/Logout'
import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  logOutUser,
  selectAuthToken
} from '../features/authentication/authenticationSlice'
import '../styles/navbar.css'
import Modal from './Modal'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const token = useSelector(selectAuthToken)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const onClose = () => {
    setOpen(false)
  }

  const handleLogoutClick = () => {
    setOpen(true)
  }

  const handleLogout = () => {
    dispatch(logOutUser())
    toast.success('Logout Successfully!')
    setOpen(false)
  }

  const cancelLogout = () => {
    setOpen(false)
  }

  return (
    <nav className='navbar-container'>
      <div className='navbar-content'>
        <div className='navbar-heading'>
          <Link className='navbar-brand' to='/'>
            RepoRadar
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={`mobile-menu-button ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle navigation'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation buttons */}
        <div className={`nav-buttons ${isMenuOpen ? 'open' : ''}`}>
          {token ? (
            <>
              <Link to='/projects' className='nav-button projects-btn'>
                <span>Projects</span>
              </Link>
              <Link to='/insights' className='nav-button features-btn'>
                <span>Insights</span>
              </Link>
              <Link to='/profile' className='nav-button contact-btn'>
                <span>Profile</span>
              </Link>
              <IconButton
                onClick={handleLogoutClick}
                className='nav-button logout-btn'
              >
                <LogoutIcon className='logout-btn' />
              </IconButton>
            </>
          ) : (
            <>
              <Link className='nav-button auth-button' to={'/login'}>
                Login
              </Link>
              <Link className='nav-button auth-button' to={'/signup'}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
      <Modal open={open} onClose={onClose}>
        <div className='logout-modal flex flex-col'>
          <h2>Are you sure want to Logout?</h2>
          <div className='flex logout-modal-buttons'>
            <button onClick={handleLogout} className='logout-modal-btn'>
              Yes
            </button>
            <button onClick={cancelLogout} className='logout-modal-btn'>
              No
            </button>
          </div>
        </div>
      </Modal>
    </nav>
  )
}

export default Navbar
