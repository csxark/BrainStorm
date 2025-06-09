import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function PageTransition({ children }) {
  const location = useLocation();

  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathname) {
      setTransitionStage('fadeOut');
    }
  }, [location.pathname, prevPathname]);

  const handleTransitionEnd = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayChildren(children);
      setPrevPathname(location.pathname);
      setTransitionStage('fadeIn');
    }
  };

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${
        transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      {displayChildren}
    </div>
  );
}

export default PageTransition;
