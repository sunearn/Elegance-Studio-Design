'use client';

import Link from 'next/link';
import { EditorialImage } from '@/components/media/EditorialImage';
import { m as motion, MotionConfig } from 'framer-motion';
import { imageUrl } from '@/lib/content';
import type { Project } from '@/lib/projects';
import './project-detail.css';

function FloorPlan({ project }: { project: Project }) {
  const labels = project.rooms.map((room) => room.name);
  return <div className="project-floorplan__drawing">
    <svg viewBox="0 0 680 390" role="img" aria-labelledby="floorplan-title floorplan-desc">
      <title id="floorplan-title">Illustrative room planning study for {project.title}</title>
      <desc id="floorplan-desc">A diagrammatic open-plan arrangement showing the relationship between {labels.join(', ')} and the central circulation route. Not to scale.</desc>
      <rect x="35" y="32" width="610" height="326" fill="#f0ece3" stroke="#514e46" strokeWidth="5" />
      <path d="M340 32V166M340 216V358M35 212H170M220 212H340M470 212H645M170 32V212M170 270V358M470 32V212M470 270V358" fill="none" stroke="#777166" strokeWidth="4" />
      <path d="M175 212a43 43 0 0 1 43 43M340 169a43 43 0 0 0 43 43M470 216a43 43 0 0 1 43 43M170 270a43 43 0 0 0 43-43" fill="none" stroke="#9b7959" strokeWidth="2" />
      <path d="M340 32V166M645 212H510" fill="none" stroke="#c6b9a5" strokeWidth="9" />
      <path d="M60 70h65M60 80h65M520 70h95M520 80h95M70 300h80M70 310h80" stroke="#c4bbaa" strokeWidth="2" />
      <text x="102" y="150" textAnchor="middle">{labels[0]}</text><text x="254" y="120" textAnchor="middle">Dining</text><text x="510" y="150" textAnchor="middle">{labels[1]}</text><text x="255" y="300" textAnchor="middle">Private rooms</text><text x="555" y="300" textAnchor="middle">{labels[2]}</text>
      <path d="M322 194h38m-10-10 10 10-10 10" fill="none" stroke="#9b7959" strokeWidth="2" />
    </svg>
  </div>;
}

export function ProjectDetail({ project, index }: { project: Project; index: number }) {
  const featureImage = project.rooms[1] ?? project.rooms[0];
  return <MotionConfig reducedMotion="user"><main className="project-detail">
    <section className="project-detail__hero" aria-label={`${project.title} project hero`}>
      <motion.div className="project-detail__hero-image" aria-hidden="true" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: [.2, .65, .25, 1] }}><EditorialImage src={imageUrl(project.heroImage, 2000)} alt="" sizes="100vw" quality={75} preload /></motion.div>
      <div className="project-detail__hero-meta"><span>ELEGANCE DESIGN STUDIO&nbsp; / &nbsp;SELECTED WORK</span><span>0{index + 1} — 06</span></div>
      <motion.div className="project-detail__hero-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .15, ease: [.22, 1, .36, 1] }}>
        <span>{project.location}&nbsp; · &nbsp;{project.year}</span><h1 className="display">{project.title}</h1><p>{project.style}</p>
      </motion.div>
      <span className="project-detail__hero-scroll">SCROLL TO EXPLORE&nbsp; ↓</span>
    </section>

    <section className="project-overview section"><div className="container project-overview__grid">
      <div><span className="eyebrow">The project</span><h2 className="display">A home in<br />its own rhythm.</h2><p>{project.summary}</p></div>
      <div className="project-overview__facts"><div><span>LOCATION</span><strong>{project.location}</strong></div><div><span>AREA</span><strong>{project.area}</strong></div><div><span>COMPLETED</span><strong>{project.year}</strong></div><div><span>DESIGN LANGUAGE</span><strong>{project.style}</strong></div></div>
    </div></section>

    <section className="project-concept"><div className="container project-concept__inner"><span className="eyebrow">Design concept</span><motion.p className="display" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .7 }}>{project.concept}</motion.p><span className="project-concept__rule" /></div></section>

    <section className="project-feature-image" ><EditorialImage src={imageUrl(featureImage.image, 1800)} alt={`${project.title}, ${featureImage.name.toLowerCase()} interior`} sizes="100vw" quality={70} className="project-feature-image__photo" /><div><span>{project.title}</span><span>{featureImage.name} / 01</span></div></section>

    <section className="project-rooms section"><div className="container"><div className="project-section-heading"><div><span className="eyebrow">A closer look</span><h2 className="display">Room by room.</h2></div><p>One clear design language, interpreted for the rituals and light of each space.</p></div>
      <div className="project-rooms__grid">{project.rooms.map((room, roomIndex) => <motion.figure key={room.name} className={`project-room project-room--${roomIndex + 1}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay: roomIndex * .08 }}><div className="project-room__image"><EditorialImage src={imageUrl(room.image, 1400)} alt={`${project.title}, ${room.name.toLowerCase()}: ${room.caption}`} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 46vw, 47vw" quality={70} /></div><figcaption><span>0{roomIndex + 1} / {room.name}</span><p>{room.caption}</p></figcaption></motion.figure>)}</div>
    </div></section>

    <section className="project-materials"><div className="container"><div className="project-section-heading"><div><span className="eyebrow">Selected with intention</span><h2 className="display">Material notes.</h2></div><p>Honest surfaces, chosen for how they feel and how they will live over time.</p></div>
      <div className="project-materials__grid">{project.materials.map((material, materialIndex) => <motion.article key={material.name} className="project-material" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .4, delay: materialIndex * .06 }}><div className="project-material__swatch" style={{ backgroundColor: material.tone }}><span>0{materialIndex + 1}</span></div><h3>{material.name}</h3><p>{material.origin}</p><span>{material.finish}</span></motion.article>)}</div>
    </div></section>

    <section className="project-floorplan section"><div className="container project-floorplan__layout"><div><span className="eyebrow">The plan, considered</span><h2 className="display">Space for<br />what matters.</h2><p>The planning study brings the principal rooms into a connected sequence while protecting quieter corners for retreat. This diagram is illustrative and not to scale.</p><div className="project-floorplan__legend"><span><i /> Shared living</span><span><i /> Private rooms</span><span><i /> Circulation</span></div></div><div><FloorPlan project={project} /><span className="project-floorplan__caption">{project.title}&nbsp; / &nbsp;DIAGRAMMATIC SPATIAL STUDY</span></div></div></section>

    <section className="project-story"><div className="project-story__image" ><EditorialImage src={imageUrl(project.rooms[0].image, 1600)} alt={`${project.title}, ${project.rooms[0].name.toLowerCase()} interior detail`} sizes="(max-width: 760px) 100vw, 50vw" quality={70} /></div><div className="project-story__copy"><span className="eyebrow">The design story</span><h2 className="display">Made to feel<br />like it belongs.</h2>{project.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<span className="project-story__credit">ELEGANCE DESIGN STUDIO&nbsp; · &nbsp;{project.location.toUpperCase()}</span></div></section>

    <section className="project-cta"><span className="eyebrow">Every project begins with a conversation</span><h2 className="display">Let’s make room<br />for your story.</h2><Link href={`/contact?project=${project.slug}`} className="project-cta__link">BEGIN YOUR PROJECT <span>↗</span></Link><Link href="/projects" className="project-cta__back">← &nbsp;Back to selected work</Link></section>
  </main></MotionConfig>;
}


