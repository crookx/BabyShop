import React, { useMemo, useCallback, useRef, useEffect } from 'react';

export const useInfiniteLoader = (callback, options = {}) => {
  const observer = useRef(null);
  
  return useCallback(node => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    }, options);

    if (node) observer.current.observe(node);
  }, [callback, options]);
};

export const useVirtualization = (items, itemHeight, containerHeight) => {
  return useMemo(() => {
    const totalHeight = items.length * itemHeight;
    const visibleItems = Math.ceil(containerHeight / itemHeight);
    const overscanCount = Math.floor(visibleItems / 2);

    return {
      totalHeight,
      visibleItems,
      overscanCount,
      getVisibleRange: (scrollTop) => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(
          startIndex + visibleItems + overscanCount,
          items.length
        );
        return {
          startIndex: Math.max(0, startIndex - overscanCount),
          endIndex
        };
      }
    };
  }, [items.length, itemHeight, containerHeight]);
};

export const useDebouncedCallback = (callback, delay = 150) => {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
};

export const useResizeObserver = (elementRef) => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const observer = React.useRef(null);

  React.useEffect(() => {
    const element = elementRef.current;
    observer.current = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    if (element) {
      observer.current.observe(element);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [elementRef]);

  return dimensions;
};