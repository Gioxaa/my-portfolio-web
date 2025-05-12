import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, style }) => {
  // Get the file extension from the src (e.g., .png, .jpg)
  const getFileExtension = (path: string) => {
    return path.substring(path.lastIndexOf('.'));
  };

  // Create the different paths for smaller image sizes
  const getOptimizedPath = (original: string, suffix: string) => {
    const extension = getFileExtension(original);
    return original.replace(extension, `${suffix}${extension}`);
  };

  // Example: /images/poster/image.png → /images/poster/image-small.png
  const smallSrc = getOptimizedPath(src, '-small');
  const mediumSrc = getOptimizedPath(src, '-medium');
  
  return (
    <picture>
      {/* Small screens (up to 768px) */}
      <source media="(max-width: 768px)" srcSet={smallSrc} />
      
      {/* Medium screens (768px - 1200px) */}
      <source media="(max-width: 1200px)" srcSet={mediumSrc} />
      
      {/* Large screens (default) */}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy" 
        className={className} 
        style={style}
      />
    </picture>
  );
};

export default OptimizedImage; 