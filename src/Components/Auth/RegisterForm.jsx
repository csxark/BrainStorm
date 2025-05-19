import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setLoading(true)
      
      // Mock API call - would be replaced with actual registration
      setTimeout(() => {
        setLoading(false)
        // Simulate successful registration
        localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }))
        navigate('/')
      }, 1000)
    }
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md px-4">
      <div className="bg-neutral-900 py-10 px-6 shadow rounded-lg sm:px-10 border border-neutral-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-700 focus:ring-orange-500 focus:border-orange-500 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

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
                autoComplete="new-password"
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-700 focus:ring-orange-500 focus:border-orange-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={`h-4 w-4 rounded border-neutral-700 bg-neutral-800 focus:ring-orange-500 ${errors.agreeTerms ? 'border-red-500' : ''}`}
            />
            <label htmlFor="agreeTerms" className="ml-2 block text-sm">
              I agree to the{' '}
              <Link to="/terms" className="text-orange-500 hover:text-orange-400">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-orange-500 hover:text-orange-400">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-sm text-red-500">{errors.agreeTerms}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-900">Or register with</span>
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
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 hover:text-orange-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm