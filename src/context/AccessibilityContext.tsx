import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AccessibilityPreferences = {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusIndicator: boolean;
};

type AccessibilityContextType = {
  preferences: AccessibilityPreferences;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleFocusIndicator: () => void;
  resetPreferences: () => void;
};

const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  focusIndicator: true,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    // Load preferences from localStorage if available
    const savedPreferences = localStorage.getItem('accessibility-preferences');
    return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  });

  // Apply preferences as CSS classes and variables
  useEffect(() => {
    const documentElement = document.documentElement;
    
    // High contrast mode
    if (preferences.highContrast) {
      documentElement.classList.add('high-contrast');
    } else {
      documentElement.classList.remove('high-contrast');
    }
    
    // Large text mode
    if (preferences.largeText) {
      documentElement.classList.add('large-text');
    } else {
      documentElement.classList.remove('large-text');
    }
    
    // Reduced motion
    if (preferences.reducedMotion) {
      documentElement.classList.add('reduced-motion');
    } else {
      documentElement.classList.remove('reduced-motion');
    }
    
    // Focus indicator
    if (preferences.focusIndicator) {
      documentElement.classList.add('focus-visible');
    } else {
      documentElement.classList.remove('focus-visible');
    }
    
    // Save to localStorage
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
  }, [preferences]);
  
  // Check system preferences for reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPreferences(prev => ({ ...prev, reducedMotion: true }));
    }
  }, []);

  const toggleHighContrast = () => {
    setPreferences(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };
  
  const toggleLargeText = () => {
    setPreferences(prev => ({ ...prev, largeText: !prev.largeText }));
  };
  
  const toggleReducedMotion = () => {
    setPreferences(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };
  
  const toggleFocusIndicator = () => {
    setPreferences(prev => ({ ...prev, focusIndicator: !prev.focusIndicator }));
  };
  
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <AccessibilityContext.Provider 
      value={{ 
        preferences, 
        toggleHighContrast, 
        toggleLargeText, 
        toggleReducedMotion,
        toggleFocusIndicator,
        resetPreferences
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
 