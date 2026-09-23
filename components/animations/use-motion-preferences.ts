'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useMotionPreferences() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return { prefersReducedMotion, isMobile };
}
