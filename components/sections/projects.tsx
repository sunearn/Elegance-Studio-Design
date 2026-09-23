'use client';

import Link from 'next/link';
import { EditorialImage } from '@/components/media/EditorialImage';
import { m as motion, MotionConfig } from 'framer-motion';
import { imageUrl } from '@/lib/content';
import { projects, type Project } from '@/lib/projects';
import { useMotionPreferences } from '@/components/animations/use-motion-preferences';
import './projects.css';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { prefersReducedMotion, isMobile } = useMotionPreferences();
  const enterY = prefersReducedMotion ? 0 : isMobile ? 9 : 22;
  return <MotionConfig reducedMotion="user"><motion.div className="project-card-motion" initial={{ opacity: prefersReducedMotion ? 1 : 0, y: enterY }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ duration: prefersReducedMotion ? 0 : isMobile ? .35 : .55, delay: isMobile ? 0 : index * .07 }}>
    <Link href={`/projects/${project.slug}`} className="project-link project-card project-card--editorial">
      <div className="project-image project-image--editorial">
        <motion.div className="project-image__visual" initial={{ scale: prefersReducedMotion ? 1 : isMobile ? 1.035 : 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: prefersReducedMotion ? 0 : isMobile ? .55 : .9, ease: [.2, .65, .25, 1] }}><EditorialImage src={imageUrl(project.heroImage, 1600)} alt={`${project.title}, ${project.style.toLowerCase()} interior in ${project.location}`} sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 960px) 45vw, 46vw" quality={70} /></motion.div>
        <span className="project-card__number">0{index + 1} / 06 <i /></span><span className="project-card__year">{project.year}</span>
        <span className="project-card__view">VIEW PROJECT <b>↗</b></span>
      </div>
      <motion.div className="project-meta project-meta--editorial" initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : isMobile ? 4 : 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: prefersReducedMotion ? 0 : .45, delay: isMobile ? 0 : .12 }}><div><h3 className="project-title">{project.title}</h3><span className="project-sub">{project.location}</span></div><span className="project-arrow">↗</span></motion.div>
      <div className="project-card__facts"><span>{project.area}</span><span>{project.style}</span></div>
    </Link>
  </motion.div></MotionConfig>;
}

export function Projects({ limit }: { limit?: number } = {}) {
  const items = limit ? projects.slice(0, limit) : projects;
  return <section className="section projects-section" id="selected-projects"><div className="container">
    <div className="section-head"><div><span className="eyebrow">Selected work · 2023—25</span><h2 className="display section-title">Rooms to return to.</h2></div><p className="section-copy">Each project begins with its own story. We listen closely, then make space for it to unfold in material, light and detail.</p></div>
    <div className="project-grid project-grid--editorial">{items.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
    {limit && <div className="index-line">A small selection of spaces, made with care.</div>}
  </div></section>;
}

