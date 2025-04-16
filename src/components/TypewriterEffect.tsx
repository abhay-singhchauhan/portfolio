
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

  // Reset and start deleting when text changes
  useEffect(() => {
    // If there's existing text, start deleting
    if (displayText.length > 0) {
      setIsDeleting(true);
      setPauseDuration(2000); // 2-second pause before deleting
    } else {
      // If no text, reset and start typing new text
      setCurrentIndex(0);
      setIsDeleting(false);
      setIsPaused(false);
      setPauseDuration(0);
    }
  }, [text]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (pauseDuration > 0) {
      timer = setTimeout(() => {
        setPauseDuration(0);
        setIsPaused(true);
      }, pauseDuration);
      return () => clearTimeout(timer);
    }

    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
      }, delay);
      return () => clearTimeout(timer);
    }

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
      if (currentIndex >= text.length) {
        if (infinite) {
          setIsPaused(true);
          setIsDeleting(true);
          setPauseDuration(2000); // 2-second pause before deleting
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
