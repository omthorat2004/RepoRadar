import { useState } from 'react'

import { Link } from 'react-router-dom'
import '../styles/navbar.css'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          <Link to='/projects' className='nav-button projects-btn'>
            <span>Projects</span>
          </Link>
          <Link to='/insights' className='nav-button features-btn'>
            <span>Insights</span>
          </Link>
          <Link to='/profile' className='nav-button contact-btn'>
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
