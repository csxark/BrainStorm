import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
   
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
 
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setLoading(true)
      
      
      setTimeout(() => {
        setLoading(false)
       
        localStorage.setItem('user', JSON.stringify({ email: formData.email }))
        navigate('/')
      }, 1000)
    }
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md px-4">
      <div className="bg-neutral-900 py-10 px-6 shadow rounded-lg sm:px-10 border border-neutral-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In to Your Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-700 focus:ring-orange-500 focus:border-orange-500 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-700 focus:ring-orange-500 focus:border-orange-500 ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 focus:ring-orange-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="text-orange-500 hover:text-orange-400">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-900">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-700 rounded-md shadow-sm bg-neutral-800 text-sm font-medium hover:bg-neutral-700 transition-colors duration-200"
              >
                <span>Google</span>
              </a>
            </div>
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-700 rounded-md shadow-sm bg-neutral-800 text-sm font-medium hover:bg-neutral-700 transition-colors duration-200"
              >
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
        
        <p className="mt-6 text-center text-sm text-neutral-500">
          Don`&apos;`t have an account?{' '}
          <Link to="/register" className="text-orange-500 hover:text-orange-400">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm