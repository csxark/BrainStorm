import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message is too short (minimum 20 characters)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setLoading(true)
      
      // Mock API call - would be replaced with actual form submission
      setTimeout(() => {
        setLoading(false)
        setSubmitted(true)
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      }, 1000)
    }
  }

  const handleNewMessage = () => {
    setSubmitted(false)
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl px-4">
      <div className="bg-neutral-900 py-10 px-6 shadow rounded-lg sm:px-10 border border-neutral-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>
        
        {submitted ? (
          <div className="text-center py-10">
            <div className="mb-4 text-green-500">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-4">Thank you for your message!</h3>
            <p className="mb-8 text-neutral-400">We have received your inquiry and will get back to you as soon as possible.</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleNewMessage}
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition duration-200"
              >
                Send another message
              </button>
              <button 
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md hover:from-orange-500 hover:to-orange-700 transition duration-200"
              >
                Return to home
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
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
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-700 focus:ring-orange-500 focus:border-orange-500 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-700 focus:ring-orange-500 focus:border-orange-500 ${errors.subject ? 'border-red-500' : ''}`}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-700 focus:ring-orange-500 focus:border-orange-500 ${errors.message ? 'border-red-500' : ''}`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ContactForm