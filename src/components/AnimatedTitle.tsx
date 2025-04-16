
import React, { useState, useEffect } from 'react';

interface AnimatedTitleProps {
  titles: string[];
  interval?: number;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ titles, interval = 2500 }) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsChanging(true);
      
      // After the fade-out animation completes, change the title
      setTimeout(() => {
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setIsChanging(false);
      }, 300); // Faster transition time (was 500ms)
      
    }, interval);

    return () => clearInterval(intervalId);
  }, [titles, interval]);

  return (
    <span 
      className={`transition-all duration-300 font-bold ${
        isChanging 
          ? 'opacity-0 transform -translate-y-2' 
          : 'opacity-100 transform translate-y-0'
      }`}
    >
      {titles[currentTitleIndex]}
    </span>
  );
};

export default AnimatedTitle;
