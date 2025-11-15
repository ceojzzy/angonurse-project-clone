import { ImgHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  webpSrc?: string;
  className?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  webpSrc, 
  className,
  loading = "lazy",
  ...props 
}: OptimizedImageProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <picture>
      {webpSrc && !imageError && (
        <source srcSet={webpSrc} type="image/webp" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={cn("transition-opacity duration-300", className)}
        onError={() => setImageError(true)}
        {...props}
      />
    </picture>
  );
};
