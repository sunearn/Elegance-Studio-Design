'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m as motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useMotionPreferences } from '@/components/animations/use-motion-preferences';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { prefersReducedMotion, isMobile } = useMotionPreferences();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : isMobile ? 16 : 42]);
  const reveal = (delay: number) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : isMobile ? 9 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: prefersReducedMotion ? 0 : isMobile ? 0.55 : 0.8, delay: prefersReducedMotion ? 0 : delay, ease: 'easeOut' as const },
  });

  return (
    <section ref={sectionRef} className="cinematic-hero" aria-labelledby="hero-title">
      <motion.div className="cinematic-hero__image-motion" style={{ y: imageY }} initial={{ opacity: prefersReducedMotion ? 1 : 0, scale: prefersReducedMotion ? 1 : 1.035 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: prefersReducedMotion ? 0 : isMobile ? .65 : 1.1 }} aria-hidden="true">
        <Image
          className="cinematic-hero__image"
          src="/arcea-interior-hero.webp"
          alt=""
          fill
          preload
          quality={75}
          sizes="100vw"
        />
      </motion.div>
      <div className="cinematic-hero__veil" aria-hidden="true" />

      <div className="cinematic-hero__content">
        <motion.p className="cinematic-hero__eyebrow" {...reveal(0.12)}>
          <span className="cinematic-hero__rule" aria-hidden="true" />
          Interior architecture · Mumbai & beyond
        </motion.p>
        <h1 id="hero-title" className="cinematic-hero__title display">
          <motion.span className="cinematic-hero__title-line" {...reveal(0.2)}>SPACES THAT</motion.span>
          <motion.span className="cinematic-hero__title-line cinematic-hero__title-line--second" {...reveal(0.34)}>DEFINE YOU.</motion.span>
        </h1>
        <motion.p className="cinematic-hero__description" {...reveal(0.47)}>
          Thoughtfully designed interiors where architecture, functionality and emotion come together.
        </motion.p>
        <motion.div className="cinematic-hero__actions" {...reveal(0.58)}>
          <Link href="/projects" className="cinematic-hero__button cinematic-hero__button--light">
            Explore projects <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/contact" className="cinematic-hero__button cinematic-hero__button--outline">
            Start your project <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#selected-projects"
        className="cinematic-hero__scroll"
        aria-label="Scroll to explore selected projects"
        {...reveal(0.82)}
      >
        <span className="cinematic-hero__scroll-line" aria-hidden="true" />
        <span>Scroll to explore</span>
      </motion.a>
      <span className="cinematic-hero__signature" aria-hidden="true">ELEGANCE DESIGN STUDIO&nbsp; · &nbsp;PUNE</span>
    </section>
  );
}






