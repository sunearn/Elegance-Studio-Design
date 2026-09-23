'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import { SceneLoading } from '@/components/three/SceneLoading';
import dynamic from 'next/dynamic';
import { ConfigPanel } from './ConfigPanel';
import { configurationReducer, INITIAL_CONFIGURATION } from './configurator-state';
import './configurator.css';

const ConfiguratorScene = dynamic(
  () => import('@/components/three/SceneCanvas').then((module) => module.SceneCanvas),
  { ssr: false, loading: () => <SceneLoading label="Preparing your room" className="configurator__loading" /> },
);

export function RoomConfigurator() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [configuration, dispatch] = useReducer(configurationReducer, INITIAL_CONFIGURATION);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isNearViewport) return;
    if (!('IntersectionObserver' in window)) {
      const frame = setTimeout(() => setIsNearViewport(true), 0);
      return () => clearTimeout(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsNearViewport(true); observer.disconnect(); }
    }, { rootMargin: '240px 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, [isNearViewport]);
  const [generated, setGenerated] = useState(false);
  const select = (key: keyof typeof configuration, value: string) => {
    dispatch({ type: 'select', key, value });
    setGenerated(false);
  };

  return (
    <section ref={sectionRef} className="room-configurator" id="design-your-space" aria-labelledby="configurator-title">
      <div className="configurator__intro">
        <div><span className="eyebrow">A considered room, made yours</span><h2 className="display" id="configurator-title">Design your space.</h2></div>
        <p>Choose the finishes and atmosphere. Your room will take shape as you explore.</p>
      </div>
      <div className="configurator__layout">
        <div className="configurator__preview">
          <div className="configurator__preview-label"><span>ELEGANCE / LIVING ROOM 01</span><span>LIVE CONFIGURATION</span></div>
          {isNearViewport ? <ConfiguratorScene configuration={configuration} showHotspots={false} /> : <SceneLoading label="The room will be ready when you are" ready tone="sand" className="configurator__loading" />}
          <div className="configurator__preview-foot"><span>DRAG TO EXPLORE</span><span>01 — 05</span></div>
        </div>
        <ConfigPanel configuration={configuration} onSelect={select} onGenerate={() => setGenerated(true)} generated={generated} />
      </div>
    </section>
  );
}
