import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar flex  p-4">
        <Link to="/" className=" text-2xl font-bold text-gradient">Resume </Link>
        <Link to="/upload" className='primary-button w-fit'>Upload resume</Link>
    </nav>
  )
}

export default Navbar
