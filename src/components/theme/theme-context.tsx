'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import ThemeProvider from './theme';

type ThemeContextType = {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ toggleTheme, mode }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider mode={mode}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};