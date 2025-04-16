
import React, { createContext, useContext, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/use-redux';
import { setDarkMode, setTextContrast } from '@/store/themeSlice';

type ThemeContextType = {
  isDarkMode: boolean;
  textContrast: 'normal' | 'high';
};

const ThemeContext = createContext<ThemeContextType>({ isDarkMode: false, textContrast: 'normal' });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, textContrast } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if user has a preference stored
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      dispatch(setDarkMode(true));
      // Set high contrast by default for dark mode
      dispatch(setTextContrast('high'));
    }
  }, [dispatch]);

  useEffect(() => {
    // Apply the theme to the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      
      // Set high contrast text for dark mode for better visibility
      if (textContrast !== 'high') {
        dispatch(setTextContrast('high'));
      }
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      
      // Reset to normal contrast for light mode
      if (textContrast !== 'normal') {
        dispatch(setTextContrast('normal'));
      }
    }
  }, [isDarkMode, textContrast, dispatch]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, textContrast }}>
      {children}
    </ThemeContext.Provider>
  );
};
