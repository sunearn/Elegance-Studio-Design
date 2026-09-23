'use client';

import { m as motion, MotionConfig } from 'framer-motion';
import { materials } from '@/lib/content';
import { useMotionPreferences } from '@/components/animations/use-motion-preferences';

export function MaterialLibrary() {
  const { prefersReducedMotion, isMobile } = useMotionPreferences();
  const revealX = prefersReducedMotion ? 0 : isMobile ? 7 : 24;
  return <MotionConfig reducedMotion="user"><section className="section material-wrap"><div className="container"><div className="section-head"><div><span className="eyebrow">Chosen for the way they age</span><h2 className="display section-title">A tactile point of view.</h2></div><p className="section-copy">We favour honest materials with a sense of place: surfaces that invite touch, wear in beautifully and reward a closer look.</p></div><div className="material-grid">{materials.map((material, index) => <motion.article className="material-card" key={material.name} initial={{ opacity: prefersReducedMotion ? 1 : 0, x: revealX }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .28 }} transition={{ duration: prefersReducedMotion ? 0 : isMobile ? .32 : .48, delay: prefersReducedMotion || isMobile ? 0 : index * .075 }}><motion.div className="swatch" style={{ background: material.tone }} aria-hidden="true" initial={{ scaleX: prefersReducedMotion ? 1 : .88, opacity: prefersReducedMotion ? 1 : .65 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: prefersReducedMotion ? 0 : .55, delay: prefersReducedMotion || isMobile ? 0 : index * .075 }} /><h3>{material.name}</h3><p>{material.origin}<br />{material.finish}</p></motion.article>)}</div></div></section></MotionConfig>;
}

