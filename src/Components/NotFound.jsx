import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 to-orange-700 text-transparent bg-clip-text">404</h1>
      <h2 className="text-2xl md:text-4xl mt-6">Page Not Found</h2>
      <p className="mt-4 max-w-md text-neutral-400">
        The page you`&apos;`re looking for doesn`&apos;`t exist or has been moved.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link 
          to="/" 
          className="bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-3 rounded-lg hover:from-orange-500 hover:to-orange-700 transition-colors duration-200"
        >
          Back to Home
        </Link>
        <Link 
          to="/contact" 
          className="px-6 py-3 rounded-lg border border-neutral-700 hover:bg-neutral-800 transition-colors duration-200"
        >
          Contact Support
        </Link>
      </div>
    </div>
  )
}

export default NotFound