import  { useEffect, useState } from 'react';

// Custom hook to get current screen size
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect runs only on mount and unmount

  return screenSize;
}

// Breakpoint definitions for consistent responsive design
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Custom hook to check if screen is mobile
export function useIsMobile() {
  const { width } = useScreenSize();
  return width < breakpoints.md;
}

// Custom hook to check if screen is tablet
export function useIsTablet() {
  const { width } = useScreenSize();
  return width >= breakpoints.md && width < breakpoints.lg;
}

// Custom hook to check if screen is desktop
export function useIsDesktop() {
  const { width } = useScreenSize();
  return width >= breakpoints.lg;
}
 