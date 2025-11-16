"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

const OptimizedImage = ({ src, alt, className, priority, fill }: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "duration-700 ease-in-out",
            isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"
          )}
          onLoad={() => setIsLoading(false)}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      className={cn(
        "duration-700 ease-in-out",
        isLoading ? "scale-110 blur-lg" : "scale-100 blur-0",
        className
      )}
      onLoad={() => setIsLoading(false)}
      priority={priority}
    />
  );
};

export default OptimizedImage;
