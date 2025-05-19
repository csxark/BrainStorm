import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { navItems } from '../constants/index'
import { Menu, X, UserCircle, LogOut, Settings, User } from 'lucide-react'

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  
  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenu(false)
  }, [location.pathname])

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu)
  }
  
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }
  
  return (
    <nav className={`sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 transition-colors duration-300 ${isScrolled ? 'bg-black/80' : ''}`}>
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img className='h-10 w-10 mr-2' src={logo} alt="logo" />
              <span className="text-xl tracking-tight">BrainStorm</span>
            </Link>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12 text-xl">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.href}
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-orange-500 border-b-2 border-orange-500 pb-1'
                      : 'text-neutral-300 hover:text-white transition-colors duration-200'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink 
                to="/contact"
                className={({ isActive }) => 
                  isActive 
                    ? 'text-orange-500 border-b-2 border-orange-500 pb-1'
                    : 'text-neutral-300 hover:text-white transition-colors duration-200'
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="hidden lg:flex justify-center space-x-6 items-center">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 py-2 px-3 border border-orange-500 rounded-md text-white">
                  <UserCircle size={20} className="text-orange-500" />
                  <span>{user.name || user.email.split('@')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-neutral-900 rounded-md shadow-lg border border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                  <div className="py-1">
                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800">
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-neutral-800"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="py-2 px-3 border border-neutral-700 rounded-md hover:border-neutral-500 transition-colors duration-200">
                  Sign In
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-orange-400 to-orange-600 py-2 px-3 ml-0.5 rounded-md hover:from-orange-500 hover:to-orange-700 transition-colors duration-200">
                  Create Account
                </Link>
              </>
            )}
          </div>
          <div className="lg:hidden flex flex-col justify-end">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="fixed inset-x-0 top-16 z-20 bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-700 p-6 flex flex-col justify-center items-center lg:hidden animate-slideIn">
            <ul className="space-y-4 mb-6 w-full">
              {navItems.map((item, index) => (
                <li key={index} className='py-2 text-xl border-b border-neutral-800'>
                  <NavLink 
                    to={item.href}
                    className={({ isActive }) => 
                      isActive 
                        ? 'text-orange-500 font-medium'
                        : 'text-neutral-300 hover:text-white transition-colors duration-200'
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className='py-2 text-xl border-b border-neutral-800'>
                <NavLink 
                  to="/contact"
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-orange-500 font-medium'
                      : 'text-neutral-300 hover:text-white transition-colors duration-200'
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="flex flex-col w-full space-y-3">
              {user ? (
                <>
                  <div className="flex items-center py-3 border-b border-neutral-800">
                    <UserCircle size={24} className="text-orange-500 mr-2" />
                    <span>{user.name || user.email.split('@')[0]}</span>
                  </div>
                  <Link to="/profile" className="flex items-center py-2">
                    <User size={18} className="mr-2" />
                    Profile
                  </Link>
                  <Link to="/settings" className="flex items-center py-2">
                    <Settings size={18} className="mr-2" />
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center py-2 text-red-400"
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className='py-2 px-3 border border-neutral-700 rounded-md text-center'>
                    Sign In
                  </Link>
                  <Link to="/register" className='bg-gradient-to-r from-orange-400 to-orange-600 py-2 px-3 rounded-md text-center'>
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar