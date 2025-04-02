import  { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrJTIwZGV2ZWxvcGVyJTIwc2V0dXB8ZW58MHx8fHwxNzQzMzYwNzA3fDA&ixlib=rb-4.0.3',
  className,
  width,
  height,
  loading = 'lazy'
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={handleError}
      // Pour WCAG 2.1 - Images d'accessibilité
      role={alt ? undefined : 'presentation'}
    />
  );
}
 