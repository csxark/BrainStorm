import { useState } from 'react'
import { Search, Book, Code, Zap, Users, Globe, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react'

function Documentation() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSection, setActiveSection] = useState('getting-started')
  const [expandedSections, setExpandedSections] = useState({
    'getting-started': true,
    'vr-development': false,
    'api-reference': false,
    'examples': false
  })

  const documentationSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Zap size={20} />,
      items: [
        { id: 'installation', title: 'Installation', description: 'Set up BrainStorm development environment' },
        { id: 'quick-start', title: 'Quick Start Guide', description: 'Create your first VR application' },
        { id: 'project-structure', title: 'Project Structure', description: 'Understanding BrainStorm project layout' },
        { id: 'configuration', title: 'Configuration', description: 'Configure your development environment' }
      ]
    },
    {
      id: 'vr-development',
      title: 'VR Development',
      icon: <Globe size={20} />,
      items: [
        { id: 'scene-creation', title: 'Scene Creation', description: 'Building immersive VR scenes' },
        { id: 'interaction-systems', title: 'Interaction Systems', description: 'Implementing user interactions' },
        { id: 'physics-engine', title: 'Physics Engine', description: 'Adding realistic physics to your VR world' },
        { id: 'audio-spatial', title: 'Spatial Audio', description: 'Creating immersive 3D audio experiences' },
        { id: 'performance-optimization', title: 'Performance Optimization', description: 'Optimizing VR applications for smooth performance' }
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: <Code size={20} />,
      items: [
        { id: 'core-api', title: 'Core API', description: 'Essential BrainStorm APIs' },
        { id: 'rendering-api', title: 'Rendering API', description: 'Graphics and rendering functions' },
        { id: 'input-api', title: 'Input API', description: 'Handling VR controllers and gestures' },
        { id: 'networking-api', title: 'Networking API', description: 'Multiplayer and networking features' }
      ]
    },
    {
      id: 'examples',
      title: 'Examples & Tutorials',
      icon: <Book size={20} />,
      items: [
        { id: 'hello-vr', title: 'Hello VR World', description: 'Your first VR application' },
        { id: 'vr-gallery', title: 'VR Art Gallery', description: 'Create an interactive art gallery' },
        { id: 'multiplayer-game', title: 'Multiplayer VR Game', description: 'Build a collaborative VR experience' },
        { id: 'data-visualization', title: 'Data Visualization', description: 'Visualizing data in VR space' }
      ]
    }
  ]

  const contentData = {
    'getting-started': {
      title: 'Getting Started with BrainStorm',
      content: `
        <h2>Welcome to BrainStorm VR Development Platform</h2>
        <p>BrainStorm is a powerful and intuitive platform for creating immersive VR applications. Whether you're a beginner or an experienced developer, our tools and documentation will help you bring your VR ideas to life.</p>
        
        <h3>Prerequisites</h3>
        <ul>
          <li>Node.js 16.0 or higher</li>
          <li>A compatible VR headset (Oculus, HTC Vive, or WebXR compatible device)</li>
          <li>Modern web browser with WebXR support</li>
        </ul>
        
        <h3>Quick Installation</h3>
        <pre><code>npm install -g brainstorm-cli
brainstorm create my-vr-app
cd my-vr-app
npm start</code></pre>
      `
    },
    'installation': {
      title: 'Installation Guide',
      content: `
        <h2>Installing BrainStorm</h2>
        <p>Follow these steps to set up your development environment:</p>
        
        <h3>System Requirements</h3>
        <ul>
          <li>Operating System: Windows 10+, macOS 10.14+, or Linux</li>
          <li>RAM: 8GB minimum, 16GB recommended</li>
          <li>Graphics: Dedicated GPU with WebGL 2.0 support</li>
          <li>Storage: 2GB free space</li>
        </ul>
        
        <h3>Step-by-step Installation</h3>
        <ol>
          <li>Install Node.js from <a href="https://nodejs.org" target="_blank">nodejs.org</a></li>
          <li>Install BrainStorm CLI globally</li>
          <li>Verify installation</li>
        </ol>
        
        <pre><code># Install BrainStorm CLI
npm install -g brainstorm-cli

# Verify installation
brainstorm --version

# Create a new project
brainstorm create my-first-vr-app</code></pre>
      `
    },
    'scene-creation': {
      title: 'Creating VR Scenes',
      content: `
        <h2>Building Your First VR Scene</h2>
        <p>Learn how to create immersive VR environments using BrainStorm's scene creation tools.</p>
        
        <h3>Basic Scene Setup</h3>
        <pre><code>import { Scene, Camera, Light } from 'brainstorm-vr';

const scene = new Scene({
  background: 'skybox',
  lighting: 'realistic'
});

// Add a camera
const camera = new Camera({
  type: 'VR',
  position: [0, 1.6, 0]
});

// Add lighting
const light = new Light({
  type: 'directional',
  intensity: 1.0,
  position: [10, 10, 10]
});

scene.add(camera, light);</code></pre>
        
        <h3>Adding 3D Objects</h3>
        <p>You can add various 3D objects to your scene:</p>
        <ul>
          <li>Primitive shapes (cubes, spheres, planes)</li>
          <li>Imported 3D models (GLTF, OBJ)</li>
          <li>Custom geometries</li>
        </ul>
      `
    },
    'core-api': {
      title: 'Core API Reference',
      content: `
        <h2>BrainStorm Core API</h2>
        <p>Essential APIs for VR development with BrainStorm.</p>
        
        <h3>Scene Class</h3>
        <pre><code>class Scene {
  constructor(options)
  add(...objects)
  remove(object)
  render()
  dispose()
}</code></pre>
        
        <h3>Object3D Class</h3>
        <pre><code>class Object3D {
  position: Vector3
  rotation: Euler
  scale: Vector3
  visible: boolean
  
  translate(x, y, z)
  rotate(x, y, z)
  lookAt(target)
}</code></pre>
        
        <h3>Camera Class</h3>
        <pre><code>class Camera extends Object3D {
  fov: number
  aspect: number
  near: number
  far: number
  
  updateProjectionMatrix()
}</code></pre>
      `
    },
    'hello-vr': {
      title: 'Hello VR World Tutorial',
      content: `
        <h2>Creating Your First VR Application</h2>
        <p>Let's build a simple "Hello VR World" application step by step.</p>
        
        <h3>1. Project Setup</h3>
        <pre><code>brainstorm create hello-vr-world
cd hello-vr-world
npm install</code></pre>
        
        <h3>2. Basic Scene Code</h3>
        <pre><code>// src/main.js
import { BrainStorm, Scene, TextMesh } from 'brainstorm-vr';

const app = new BrainStorm();
const scene = new Scene();

// Create 3D text
const helloText = new TextMesh({
  text: 'Hello VR World!',
  fontSize: 2,
  color: '#ff6b35',
  position: [0, 2, -5]
});

scene.add(helloText);
app.setScene(scene);
app.start();</code></pre>
        
        <h3>3. Adding Interactivity</h3>
        <p>Make your text interactive by adding controller support:</p>
        <pre><code>helloText.onSelect = () => {
  helloText.material.color = Math.random() * 0xffffff;
};</code></pre>
      `
    }
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const filteredSections = documentationSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0 || searchQuery === '')

  const currentContent = contentData[activeSection] || contentData['getting-started']

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              Documentation
            </span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Everything you need to build amazing VR experiences with BrainStorm
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <nav className="space-y-2">
                {filteredSections.map((section) => (
                  <div key={section.id} className="border border-neutral-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 bg-neutral-900 hover:bg-neutral-800 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-orange-400">{section.icon}</span>
                        <span className="font-medium">{section.title}</span>
                      </div>
                      {expandedSections[section.id] ? 
                        <ChevronDown size={20} className="text-neutral-400" /> : 
                        <ChevronRight size={20} className="text-neutral-400" />
                      }
                    </button>
                    
                    {expandedSections[section.id] && (
                      <div className="bg-neutral-950">
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full text-left p-4 border-t border-neutral-800 hover:bg-neutral-800 transition-colors ${
                              activeSection === item.id ? 'bg-orange-500/10 border-l-4 border-l-orange-500' : ''
                            }`}
                          >
                            <div className="pl-4">
                              <h4 className="font-medium text-white mb-1">{item.title}</h4>
                              <p className="text-sm text-neutral-400">{item.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-4">{currentContent.title}</h1>
              </div>
              
              <div 
                className="prose prose-invert prose-orange max-w-none"
                dangerouslySetInnerHTML={{ __html: currentContent.content }}
                style={{
                  color: '#e5e5e5'
                }}
              />
              
              {/* Navigation Footer */}
              <div className="mt-12 pt-8 border-t border-neutral-800">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-neutral-400">
                    <Users size={16} />
                    <span className="text-sm">Community Support</span>
                  </div>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <span className="text-sm">Edit on GitHub</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <style>{`
        .prose pre {
          background-color: #1a1a1a;
          border: 1px solid #374151;
          border-radius: 8px;
          padding: 16px;
          overflow-x: auto;
        }
        
        .prose code {
          background-color: #1a1a1a;
          color: #f97316;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.875em;
        }
        
        .prose pre code {
          background-color: transparent;
          color: #e5e5e5;
          padding: 0;
        }
        
        .prose h2 {
          color: #f97316;
          border-bottom: 2px solid #374151;
          padding-bottom: 8px;
        }
        
        .prose h3 {
          color: #fb923c;
        }
        
        .prose a {
          color: #f97316;
          text-decoration: none;
        }
        
        .prose a:hover {
          color: #fb923c;
          text-decoration: underline;
        }
        
        .prose ul, .prose ol {
          color: #d1d5db;
        }
        
        .prose li {
          margin: 4px 0;
        }
      `}</style>
    </div>
  )
}

export default Documentation