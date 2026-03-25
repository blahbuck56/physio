import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export default function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 375
  );

  useEffect(() => {
    let raf;
    const handleResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return {
    width,
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
    isWide: width >= breakpoints.xl,
    is2xl: width >= breakpoints['2xl'],
    breakpoint:
      width >= breakpoints['2xl'] ? '2xl' :
      width >= breakpoints.xl ? 'xl' :
      width >= breakpoints.lg ? 'lg' :
      width >= breakpoints.md ? 'md' : 'sm',
  };
}
