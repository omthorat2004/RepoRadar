import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import '../styles/projects.css'

const Projects = () => {
  const [search, setSearch] = useState('')

  return (
    <div className='projects-container'>
      <div className='projects-content flex flex-col'>
        <div className='projects-search-container flex justify-center'>
          <SearchIcon fontSize='medium' className='projects-search-icon' />
          <input
            type='text'
            placeholder='Search a Project...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            name='search'
          />
        </div>
      </div>
    </div>
  )
}

export default Projects
