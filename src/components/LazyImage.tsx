import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  showSkeleton?: boolean;
  priority?: boolean;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoadCallback?: () => void;
  onErrorCallback?: () => void;
}

/**
 * LazyImage - High-performance Image Component
 * - Native lazy loading (`loading="lazy"`, `decoding="async"`)
 * - Dynamic loading state with shimmer skeleton placeholder
 * - Blur-up smooth fade-in transition
 * - IntersectionObserver viewport detection for offscreen images
 * - Automatic error fallback handling
 * - Referrer policy protection
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallbackSrc = "https://placehold.co/600x400/1e293b/ffffff?text=Image",
  className,
  containerClassName,
  showSkeleton = true,
  priority = false,
  aspectRatio,
  objectFit = "cover",
  onLoadCallback,
  onErrorCallback,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for lazy mounting
  useEffect(() => {
    if (priority || isInView) return;

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: "200px 0px" } // Preload 200px before entering viewport
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    } else {
      setIsInView(true);
    }
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoadCallback) onLoadCallback();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    if (onErrorCallback) onErrorCallback();
  };

  const currentSrc = hasError ? fallbackSrc : src;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden inline-block",
        aspectRatio ? "" : "w-full h-full",
        containerClassName
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Shimmer Loading Skeleton */}
      {showSkeleton && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse z-0 rounded-inherit"
          aria-hidden="true"
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
        </div>
      )}

      {/* Actual Image */}
      {isInView && (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-all duration-500 ease-out",
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
            objectFit === "fill" && "object-fill",
            isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.02] blur-xs",
            className
          )}
          {...rest}
        />
      )}
    </div>
  );
};

export default LazyImage;
