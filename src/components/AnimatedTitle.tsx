
import React, { useState, useEffect } from 'react';
import TypewriterEffect from './TypewriterEffect';

interface AnimatedTitleProps {
  titles: string[];
  interval?: number;
  typingSpeed?: number;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  titles, 
  interval = 3000, 
  typingSpeed = 50 
}) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [titles, interval]);

  return (
    <span className="font-bold">
      <TypewriterEffect 
        text={titles[currentTitleIndex]} 
        speed={typingSpeed}
        className="text-portfolio-primary"
      />
    </span>
  );
};

export default AnimatedTitle;
