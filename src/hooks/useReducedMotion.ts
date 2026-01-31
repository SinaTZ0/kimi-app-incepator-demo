import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export function useAnimationConfig() {
  const reducedMotion = useReducedMotion();

  return {
    // Reduce animation durations and distances for accessibility
    duration: reducedMotion ? 0.1 : 0.8,
    stagger: reducedMotion ? 0 : 0.08,
    distance: reducedMotion ? '10vw' : '55vw',
    scale: reducedMotion ? 1 : 0.98,
    opacity: reducedMotion ? 1 : 0,
    
    // Disable complex effects
    enableParticles: !reducedMotion,
    enableCursor: !reducedMotion,
    enableAmbient: !reducedMotion,
  };
}
