'use client';

import { m as motion, MotionConfig, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { useMotionPreferences } from '@/components/animations/use-motion-preferences';

const stages = [['01','Listen & observe','We learn how you use the space, what you value and what needs to change. A clear brief gives every later decision a reason.'],['02','Shape the plan','We develop layouts, mood and material direction together, then resolve the details that make a home feel effortless.'],['03','Make it real','We coordinate trusted makers, contractors and suppliers, keeping communication open from site work to installation.'],['04','Settle in','The final layer is personal: art, objects, lighting and small adjustments that make the space feel like yours.']];

export function DesignProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 78%', 'end 35%'] });
  const { prefersReducedMotion, isMobile } = useMotionPreferences();
  const enterX = prefersReducedMotion ? 0 : isMobile ? 7 : 20;
  return <MotionConfig reducedMotion="user"><section ref={sectionRef} className="section"><div className="container process-grid">
    <motion.div initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: prefersReducedMotion ? 0 : .5 }}><span className="eyebrow">Our way of working</span><h2 className="display section-title">A thoughtful<br />way forward.</h2><p className="section-copy">Good projects need room for discovery, and a steady hand to bring the details together. We keep the process collaborative and the decisions clear.</p></motion.div>
    <div className="process-list"><motion.div className="process-list__progress" aria-hidden="true" style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }} />{stages.map(([number, title, copy], index) => <motion.article className="process-item" key={number} initial={{ opacity: prefersReducedMotion ? 1 : 0, x: enterX }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .45 }} transition={{ duration: prefersReducedMotion ? 0 : isMobile ? .35 : .5, delay: prefersReducedMotion || isMobile ? 0 : index * .09 }}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></motion.article>)}</div>
  </div></section></MotionConfig>;
}

