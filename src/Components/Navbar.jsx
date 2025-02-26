import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { navItems } from '../constants/index'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [mobilemenu, setmobilemenu] = useState(false)
  const toggleMenu = () => {
    setmobilemenu(!mobilemenu)
  }
  
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link to="/">
              <img className='h-10 w-10 mr-2' src={logo} alt="logo" />
              <span className="text-xl tracking-tight">BrainStorm</span>
            </Link>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12 text-xl">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-6 items-center">
            <Link to="" className="py-2 px-3 border rounded-md">
              Sign In
            </Link>
            <Link to="" className="bg-gradient-to-r from-orange-400 to-orange-600 py-2 px-3 ml-0.5 rounded-md">
              Create Account
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleMenu}>
              {mobilemenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobilemenu && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-6 flex flex-col justify-center items-center lg:hidden mb-3">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className='py-2 text-xl'>
                  <Link to={item.href} onClick={toggleMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <Link to="" className='py-2 px-3 border rounded-md'>
                Sign In
              </Link>
              <Link to="" className='bg-gradient-to-r from-orange-400 to-orange-600 py-2 px-3 rounded-md'>
                Create Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar