
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  isDarkMode: boolean;
  textContrast: 'normal' | 'high';
};

const initialState: ThemeState = {
  isDarkMode: false,
  textContrast: 'normal',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setTextContrast: (state, action: PayloadAction<'normal' | 'high'>) => {
      state.textContrast = action.payload;
    },
  },
});

export const { toggleTheme, setDarkMode, setTextContrast } = themeSlice.actions;
export default themeSlice.reducer;
