import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState('fadeIn')
  const location = useLocation()

  useEffect(() => {
    if (children.key !== displayChildren.key) {
      setTransitionStage('fadeOut')
    }
  }, [children, displayChildren])

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayChildren(children)
      setTransitionStage('fadeIn')
    }
  }

  return (
    <div
      className={`transition-opacity duration-300 ${
        transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      {displayChildren}
    </div>
  )
}

export default PageTransition