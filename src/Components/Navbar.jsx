import React from 'react'
import { Link } from 'react-router-dom'
import { usePuterStore } from '../lib/puter'

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar flex p-4">
      <Link to="/" className="text-2xl font-bold text-gradient">Resume</Link>
      <div className="flex gap-4 items-center">
        <Link to="/upload" className='primary-button w-fit'>Upload resume</Link>
        <button onClick={auth.signOut} className='primary-button w-fit'>Log Out</button>
      </div>
    </nav>
  )
}

export default Navbar