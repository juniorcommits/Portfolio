import  { useEffect, useState } from 'react';
import { useScreenSize, breakpoints } from './ResponsiveUtils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  mobileSizes?: string;
  tabletSizes?: string;
  desktopSizes?: string;
  fadeIn?: boolean;
  priority?: boolean;
}

export default function ResponsiveImage({
  src,
  alt,
  className = '',
  mobileSizes = '100vw',
  tabletSizes = '50vw',
  desktopSizes = '33vw',
  fadeIn = true,
  priority = false,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { width } = useScreenSize();

  // Determine appropriate image size based on screen width
  const getImageSize = () => {
    if (width < breakpoints.md) {
      return mobileSizes;
    } else if (width < breakpoints.lg) {
      return tabletSizes;
    } else {
      return desktopSizes;
    }
  };

  // Fallback image in case of error
  const fallbackImage = "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxyZXNwb25zaXZlJTIwd2ViJTIwZGVzaWduJTIwcGF0dGVybnMlMjBtb2JpbGUlMjBkZXNrdG9wfGVufDB8fHx8MTc0MzQyOTE0MXww&ixlib=rb-4.0.3";

  // Handle image loading
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle image error
  const handleError = () => {
    setError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={error ? fallbackImage : src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          fadeIn && !isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-dark-300 animate-pulse" />
      )}
    </div>
  );
}
 