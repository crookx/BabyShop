import { useCallback, useEffect, useRef } from 'react';

export const useThrottledCallback = (callback, delay = 150) => {
  const timeoutRef = useRef(null);
  const lastCalledRef = useRef(0);

  return useCallback((...args) => {
    const now = Date.now();

    if (lastCalledRef.current && now - lastCalledRef.current < delay) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        lastCalledRef.current = now;
        callback(...args);
      }, delay);
    } else {
      lastCalledRef.current = now;
      callback(...args);
    }
  }, [callback, delay]);
};

export const useIntersectionLoader = (onIntersect, options = {}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    }, options);

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [onIntersect, options]);

  const setRef = useCallback((element) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (element) {
      observerRef.current.observe(element);
    }
  }, []);

  return setRef;
};

export const useDebouncedSearch = (callback, delay = 300) => {
  const timeoutRef = useRef(null);

  return useCallback((value) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(value);
    }, delay);
  }, [callback, delay]);
};

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handler = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
};