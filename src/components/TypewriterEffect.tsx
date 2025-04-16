
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
  speed = 20, // Even faster typing
  infinite = false,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseDuration, setPauseDuration] = useState(0);

  // Reset typing process when text changes
  useEffect(() => {
    if (displayText.length > 0) {
      setIsDeleting(true);
      setPauseDuration(0); // Don't pause before starting to delete
    } else {
      setCurrentIndex(0);
      setIsDeleting(false);
      setIsPaused(false);
      setPauseDuration(0);
    }
  }, [text]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Handle pause after completing text
    if (pauseDuration > 0) {
      timer = setTimeout(() => {
        setPauseDuration(0);
        setIsPaused(false);
        
        if (infinite) {
          setIsDeleting(true);
        }
      }, pauseDuration);
      return () => clearTimeout(timer);
    }

    // Handle regular pause between operations
    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
      }, delay);
      return () => clearTimeout(timer);
    }

    // Handle text deletion
    if (isDeleting) {
      if (displayText.length === 0) {
        // When text is fully deleted, prepare to type new text
        setIsDeleting(false);
        setCurrentIndex(0);
        return;
      }

      timer = setTimeout(() => {
        setDisplayText(prevText => prevText.slice(0, -1));
      }, speed / 2);
    } else {
      // Handle text typing
      if (currentIndex >= text.length) {
        // Text is fully typed, pause before next action
        if (infinite) {
          setPauseDuration(2000); // 2-second pause after completing the text
          setIsPaused(true);
        }
        return;
      }

      timer = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, delay, displayText, infinite, isDeleting, isPaused, speed, text, pauseDuration]);

  return (
    <span className={`${className} relative`}>
      {displayText}
      <span className="inline-block w-0.5 h-5 ml-0.5 bg-current animate-blink align-text-bottom" />
    </span>
  );
};

export default TypewriterEffect;
