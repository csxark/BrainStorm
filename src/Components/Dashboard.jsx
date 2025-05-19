import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, ArrowRight, FileCode, Layers, BarChart, Users } from 'lucide-react'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      navigate('/login')
    }

    // Mock API call to get user projects
    setTimeout(() => {
      setProjects([
        { 
          id: 1, 
          name: 'VR Fitness App', 
          description: 'A virtual reality fitness experience with interactive workouts',
          progress: 75,
          collaborators: 3,
          updatedAt: '2025-05-15T10:30:00'
        },
        { 
          id: 2, 
          name: 'Educational VR Tour', 
          description: 'Interactive virtual tour of historical landmarks for education',
          progress: 45,
          collaborators: 2,
          updatedAt: '2025-05-12T14:20:00'
        },
        { 
          id: 3, 
          name: 'VR Game Prototype', 
          description: 'Action game prototype with advanced physics interactions',
          progress: 30,
          collaborators: 1,
          updatedAt: '2025-05-10T09:15:00'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [navigate])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-neutral-400 mt-1">Welcome back, {user?.name || 'Developer'}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 rounded-md flex items-center hover:from-orange-500 hover:to-orange-700 transition-colors duration-200">
            <Plus size={18} className="mr-2" />
            New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-full mr-4">
              <FileCode size={24} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Active Projects</h3>
              <p className="text-3xl font-bold">{projects.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-full mr-4">
              <Layers size={24} className="text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Resources</h3>
              <p className="text-3xl font-bold">24</p>
            </div>
          </div>
        </div>
        <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-orange-500/20 rounded-full mr-4">
              <Users size={24} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Collaborators</h3>
              <p className="text-3xl font-bold">5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden mb-10">
        <div className="flex justify-between items-center p-6 border-b border-neutral-800">
          <h2 className="text-xl font-medium">Recent Projects</h2>
          <Link to="/projects" className="text-orange-500 flex items-center hover:text-orange-400 transition-colors duration-200">
            View all
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-neutral-800 rounded w-3/4"></div>
              <div className="h-6 bg-neutral-800 rounded"></div>
              <div className="h-6 bg-neutral-800 rounded"></div>
              <div className="h-6 bg-neutral-800 rounded w-5/6"></div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-800">
              <thead className="bg-neutral-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Collaborators
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Last Update
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {projects.map((project) => (
                  <tr 
                    key={project.id} 
                    className="hover:bg-neutral-800/30 transition-colors duration-150 cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium">{project.name}</div>
                        <div className="text-sm text-neutral-400">{project.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-neutral-800 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              project.progress >= 70 ? 'bg-green-500' : 
                              project.progress >= 40 ? 'bg-orange-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2 relative z-0">
                        {Array(project.collaborators).fill(0).map((_, index) => (
                          <div key={index} className="h-8 w-8 rounded-full bg-neutral-700 border-2 border-neutral-900 flex items-center justify-center">
                            <span className="text-xs">U{index + 1}</span>
                          </div>
                        ))}
                        <button className="h-8 w-8 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center hover:bg-neutral-700 transition-colors duration-200">
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {formatDate(project.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-neutral-900 rounded-lg border border-neutral-800">
        <div className="flex justify-between items-center p-6 border-b border-neutral-800">
          <h2 className="text-xl font-medium">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-neutral-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-neutral-700 transition-colors duration-200">
            <Plus size={24} className="mb-2" />
            <span>New Project</span>
          </button>
          <button className="bg-neutral-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-neutral-700 transition-colors duration-200">
            <FileCode size={24} className="mb-2" />
            <span>Import Project</span>
          </button>
          <button className="bg-neutral-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-neutral-700 transition-colors duration-200">
            <Users size={24} className="mb-2" />
            <span>Manage Team</span>
          </button>
          <button className="bg-neutral-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-neutral-700 transition-colors duration-200">
            <BarChart size={24} className="mb-2" />
            <span>Analytics</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard