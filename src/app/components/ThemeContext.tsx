'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'modern' | 'rdr2';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'modern',
  setTheme: () => {},
  toggleTheme: () => {},
  isTransitioning: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('rdr2');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_theme') as Theme | null;
    if (saved === 'rdr2' || saved === 'modern') {
      setThemeState(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'rdr2');
    }
  }, []);

  const setTheme = (t: Theme) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setThemeState(t);
      localStorage.setItem('portfolio_theme', t);
      document.documentElement.setAttribute('data-theme', t);
      setTimeout(() => setIsTransitioning(false), 700);
    }, 350);
  };

  const toggleTheme = () => {
    setTheme(theme === 'modern' ? 'rdr2' : 'modern');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
