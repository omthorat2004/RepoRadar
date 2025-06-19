import '../styles/hero.css'

const HeroSection = () => {
  return (
    <div className='hero-section-content'>
      {/* Text Section */}
      <div className='hero-section-text'>
        <div className='hero-headline'>
          <h1 className='headline'>
            Track, Analyze, and Improve Your GitLab Code in Real Time
          </h1>
        </div>
        <div className='hero-subtext'>
          <p>
            Get instant feedback on every push and merge with AI-powered code
            insights.
          </p>
        </div>
        <div className='cta-btn'>
          <button className='btn btn-1'>View Projects</button>
          <button className='btn btn-2'>AI Powered Feedback</button>
        </div>
      </div>

    
      <div className='hero-section-img'>
        <div className='hero-img'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2oE1-MV1PE2j4rFIJPKEu87NvRfyJnwmHw&s'
            alt='Hero Illustration'
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
