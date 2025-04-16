
import React, { useState, useEffect } from 'react';

interface AnimatedTitleProps {
  titles: string[];
  interval?: number;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ titles, interval = 3000 }) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsChanging(true);
      
      // After the fade-out animation completes, change the title
      setTimeout(() => {
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setIsChanging(false);
      }, 500); // This should match the animation duration
      
    }, interval);

    return () => clearInterval(intervalId);
  }, [titles, interval]);

  return (
    <span 
      className={`transition-opacity duration-500 ${isChanging ? 'opacity-0' : 'opacity-100'}`}
    >
      {titles[currentTitleIndex]}
    </span>
  );
};

export default AnimatedTitle;
