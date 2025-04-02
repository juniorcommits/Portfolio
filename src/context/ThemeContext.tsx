import  { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme } from '../types';

const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    primaryColor: '#0ea5e9',
    secondaryColor: '#0284c7'
  },
  {
    id: 'neon',
    name: 'Neon',
    primaryColor: '#f0abfc',
    secondaryColor: '#c026d3'
  },
  {
    id: 'pastel',
    name: 'Pastel',
    primaryColor: '#a5b4fc',
    secondaryColor: '#818cf8'
  },
  {
    id: 'futuristic',
    name: 'Futuristic',
    primaryColor: '#10b981',
    secondaryColor: '#059669'
  }
];

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    const savedColorTheme = localStorage.getItem('colorTheme');
    if (savedColorTheme) {
      const theme = themes.find(t => t.id === savedColorTheme);
      if (theme) {
        setCurrentTheme(theme);
        applyThemeColors(theme);
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newMode;
    });
  };

  const applyThemeColors = (theme: Theme) => {
    document.documentElement.style.setProperty('--color-primary', theme.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', theme.secondaryColor);
  };

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('colorTheme', theme.id);
      applyThemeColors(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      currentTheme, 
      setTheme,
      availableThemes: themes 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
 