
import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  delay?: number;
  speed?: number;
  infinite?: boolean;
  className?: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  delay = 200,
  speed = 50,
  infinite = false,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
      }, delay);
      return () => clearTimeout(timer);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex(0);
        return;
      }

      timer = setTimeout(() => {
        setDisplayText(prevText => prevText.slice(0, -1));
      }, speed / 2);
    } else {
      if (currentIndex >= text.length) {
        if (infinite) {
          setIsPaused(true);
          setIsDeleting(true);
        }
        return;
      }

      timer = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, delay, displayText, infinite, isDeleting, isPaused, speed, text]);

  return (
    <span className={`${className} relative`}>
      {displayText}
      <span className="inline-block w-0.5 h-5 ml-0.5 bg-current animate-blink align-text-bottom" />
    </span>
  );
};

export default TypewriterEffect;
