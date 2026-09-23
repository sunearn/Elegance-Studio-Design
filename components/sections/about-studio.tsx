'use client';

import Link from 'next/link';
import { EditorialImage } from '@/components/media/EditorialImage';
import { m as motion, MotionConfig, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useMotionPreferences } from '@/components/animations/use-motion-preferences';

export function AboutStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const { prefersReducedMotion, isMobile } = useMotionPreferences();
  const parallaxY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : isMobile ? [8, -8] : [28, -28]);
  return <MotionConfig reducedMotion="user"><section ref={sectionRef} className="section about-panel"><div className="container about-layout">
    <div className="about-image-frame"><motion.div className="about-image"  style={{ y: parallaxY }} initial={{ opacity: prefersReducedMotion ? 1 : 0, scale: prefersReducedMotion ? 1 : isMobile ? 1.02 : 1.045 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: prefersReducedMotion ? 0 : isMobile ? .45 : .75 }}><EditorialImage src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85" alt="Sunlit living room with pale stone, natural oak and layered neutral furnishings" sizes="(max-width: 640px) calc(100vw - 40px), 48vw" quality={70} /></motion.div></div>
    <motion.div className="about-copy" initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : isMobile ? 8 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: prefersReducedMotion ? 0 : .6 }}><span className="eyebrow">A small studio, a considered practice</span><h2 className="display section-title">Design for living,<br />not just looking.</h2><p>Elegance Design Studio is an independent design studio founded in Pune. We make homes that feel composed without feeling staged: layered, light-aware spaces shaped around the people who live in them.</p><p>Our work brings architecture, craft and everyday rituals into one conversation. We stay close to each project, collaborate with skilled local makers and believe the most enduring rooms leave space for life to happen.</p><div className="stats"><div className="stat"><strong>10+</strong><span>Years in practice</span></div><div className="stat"><strong>32</strong><span>Homes completed</span></div><div className="stat"><strong>1:1</strong><span>Studio attention</span></div></div><Link href="/studio" className="text-link">Meet the studio <span>↗</span></Link></motion.div>
  </div></section></MotionConfig>;
}

