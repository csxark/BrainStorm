import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Features from './Components/Features'
import Workflow from './Components/Workflow'
import Pricing from './Components/Pricing'
import Testimonals from './Components/Testimonals'
import Footer from './Components/Footer'
import LoginForm from './Components/Auth/LoginForm'
import RegisterForm from './Components/Auth/RegisterForm'
import ContactForm from './Components/ContactForm'
import Dashboard from './Components/Dashboard'
import PageTransition from './Components/PageTransition'
import NotFound from './Components/NotFound'

function App() {
  const location = useLocation()
  const [user, setUser] = useState(null)
  
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [location])

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <PageTransition>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <Workflow />
                <Pricing />
                <Testimonals />
              </>
            } />
            <Route path="/features" element={<Features />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/testimonials" element={<Testimonals />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </div>
      <Footer />
    </>
  )
}

export default App