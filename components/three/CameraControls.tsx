'use client';

import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function CameraControls({ scrollTarget }: { scrollTarget?: string }) {
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    if (!scrollTarget) return;
    const target = document.querySelector(scrollTarget);
    if (!target) return;

    const media = gsap.matchMedia();
    media.add({
      isMobile: '(max-width: 760px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      const { isMobile, reduceMotion } = context.conditions as { isMobile: boolean; reduceMotion: boolean };
      if (reduceMotion) return;

      const animation = gsap.to(camera.position, {
        x: isMobile ? 6.72 : 7.2,
        y: isMobile ? 3.98 : 3.55,
        z: isMobile ? 7.25 : 6.75,
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: 'top bottom',
          end: 'bottom top',
          scrub: isMobile ? 0.25 : 0.65,
          invalidateOnRefresh: true,
        },
      });
      return () => animation.scrollTrigger?.kill();
    });

    return () => media.revert();
  }, [camera, scrollTarget]);

  return <OrbitControls makeDefault target={[0, 1.4, 0]} enableDamping dampingFactor={0.075} enablePan={false} enableRotate enableZoom minDistance={5.7} maxDistance={13} minPolarAngle={0.22} maxPolarAngle={Math.PI * 0.49} rotateSpeed={0.55} zoomSpeed={0.65} />;
}
