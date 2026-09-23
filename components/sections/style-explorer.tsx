'use client';

import { AnimatePresence, m as motion, MotionConfig } from 'framer-motion';
import { useRef, useState } from 'react';
import { imageUrl } from '@/lib/content';
import { EditorialImage } from '@/components/media/EditorialImage';
import { interiorStyles } from '@/lib/interior-styles';
import './style-explorer.css';

export function StyleExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const selected = interiorStyles[selectedIndex];

  const moveTrack = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.72, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="style-explorer-section" aria-labelledby="style-explorer-heading">
        <div className="style-explorer__inner">
          <div className="style-explorer__heading">
            <div><span className="eyebrow">A starting point, not a rulebook</span><h2 id="style-explorer-heading" className="display">Find your feeling.</h2></div>
            <div className="style-explorer__intro"><p>A few sensibilities we return to. Choose a direction; we’ll help make it entirely your own.</p><div className="style-explorer__arrows"><button type="button" onClick={() => moveTrack(-1)} aria-label="Scroll styles left">←</button><button type="button" onClick={() => moveTrack(1)} aria-label="Scroll styles right">→</button></div></div>
          </div>

          <div className="style-explorer__track" ref={trackRef} role="tablist" aria-label="Interior design styles">
            {interiorStyles.map((style, index) => <button key={style.name} id={`style-tab-${index}`} type="button" role="tab" aria-selected={selectedIndex === index} aria-controls="style-details" className={`style-explorer__card${selectedIndex === index ? ' is-selected' : ''}`} onClick={() => setSelectedIndex(index)}>
              <EditorialImage src={imageUrl(style.image, 1200)} alt="" sizes="(max-width: 640px) 82vw, (max-width: 960px) 46vw, 32vw" quality={70} className="style-explorer__image" />
              <span className="style-explorer__card-index">0{index + 1} <i /></span>
              <span className="style-explorer__card-copy"><span>{style.descriptor}</span><strong>{style.name}</strong></span>
              <span className="style-explorer__card-action" aria-hidden="true">{selectedIndex === index ? 'SELECTED' : 'EXPLORE'} <b>↗</b></span>
            </button>)}
          </div>
          <div className="style-explorer__track-note"><span>SELECT A SENSIBILITY</span><span>DRAG OR SCROLL TO EXPLORE&nbsp; →</span></div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={selected.name} id="style-details" role="tabpanel" aria-labelledby={`style-tab-${selectedIndex}`} className="style-explorer__details" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
              <div className="style-explorer__detail-intro"><span className="eyebrow">THE ELEGANCE EDIT · 0{selectedIndex + 1}</span><h3 className="display">{selected.name}</h3><p>{selected.description}</p></div>
              <div className="style-explorer__specs">
                <div className="style-explorer__spec"><h4>Recommended palette</h4><ul className="style-explorer__palette">{selected.palette.map((tone) => <li key={tone.name}><i style={{ backgroundColor: tone.color }} /><span>{tone.name}</span></li>)}</ul></div>
                <div className="style-explorer__spec"><h4>Materials</h4><p>{selected.materials.join(' · ')}</p></div>
                <div className="style-explorer__spec"><h4>Furniture</h4><p>{selected.furniture}</p></div>
                <div className="style-explorer__spec"><h4>Lighting</h4><p>{selected.lighting}</p></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </MotionConfig>
  );
}
