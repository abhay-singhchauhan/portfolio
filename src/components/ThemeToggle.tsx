
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/hooks/use-redux';
import { toggleTheme } from '@/store/themeSlice';

const ThemeToggle: React.FC = () => {
  const { isDarkMode } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="relative px-2"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className={`h-5 w-5 transition-all ${isDarkMode ? 'opacity-0 scale-0 absolute' : 'opacity-100'}`} />
      <Moon className={`h-5 w-5 transition-all ${isDarkMode ? 'opacity-100' : 'opacity-0 scale-0 absolute'}`} />
    </Button>
  );
};

export default ThemeToggle;
