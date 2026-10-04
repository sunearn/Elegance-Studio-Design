'use client';

import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Object3D } from 'three';
import type { DirectionalLight, HemisphereLight, PointLight } from 'three';
import type { RefObject } from 'react';
import { Hotspots, INTERIOR_HOTSPOTS, type InteriorHotspotId } from './Hotspots';
import { SceneLoading } from './SceneLoading';
import { PottedOliveTree } from './InteriorModel';
import './interior-scene.css';
import './floorplan-reveal.css';

gsap.registerPlugin(ScrollTrigger);

const VISIBLE_PARTS = new Set([
  '000-flat-floor-4m', '001-flat-floor-4m', '002-flat-floor-4m', '003-flat-wall-window-4m', '004-flat-wall-4m', '005-flat-wall-4m', '006-flat-wall-4m', '007-flat-wall-4m', '008-flat-wall-door-4m',
  '010-rug-wool-large', '012-table-lamp-dome', '018-floor-lamp-drum', '024-sofa-three-seat', '025-rug-round-jute', '026-coffee-table-rect', '027-armchair-lounge', '028-side-table-round', '029-table-lamp-dome',
  '030-floor-lamp-arc', '031-bookcase-5-shelf', '032-console-table', '033-pouffe-round', '034-dining-table-6seat', '035-dining-chair-timber',
  '036-dining-chair-timber', '037-dining-chair-upholstered', '038-dining-bench', '039-pendant-lamp-dome', '040-desk-writing', '041-desk-task-chair', '042-wall-sconce',
]);
const WALL_PARTS = new Set(['003-flat-wall-window-4m', '004-flat-wall-4m', '005-flat-wall-4m', '006-flat-wall-4m', '007-flat-wall-4m', '008-flat-wall-door-4m']);
const FURNITURE_PARTS = [...VISIBLE_PARTS].filter((name) => !name.includes('floor') && !WALL_PARTS.has(name));

function shouldRenderRevealPart(name: string) {
  const normalized = name.toLowerCase();
  if (!normalized) return false;
  if (['guide', 'grid', 'shadow', 'reference', 'helper', 'backdrop', 'plane'].some((token) => normalized.includes(token))) {
    return false;
  }
  if (VISIBLE_PARTS.has(name)) return true;
  return /(?:flat-floor|flat-wall|sofa|rug|coffee-table|armchair|table-lamp|floor-lamp|bookcase|console|pouffe|dining|wall-sconce|desk|bench|pendant|chair|door)/i.test(normalized);
}

type LightRefs = { ambient: RefObject<HemisphereLight | null>; key: RefObject<DirectionalLight | null>; pendant: RefObject<PointLight | null> };

function RevealRoom({ onReadyChange, lights }: { onReadyChange: (ready: boolean) => void; lights: LightRefs }) {
  const { scene } = useGLTF('/models/luxury-living-room.glb');
  const room = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((part: Object3D) => {
      if (!('isMesh' in part) || !part.isMesh) return;
      const meshName = part.name || part.parent?.name || '';
      const shouldRender = shouldRenderRevealPart(meshName);
      part.visible = shouldRender;
      if (!shouldRender) return;
      if (WALL_PARTS.has(meshName) || meshName.includes('flat-wall')) { part.userData.revealScaleY = part.scale.y; part.scale.y = 0.001; }
      else if (FURNITURE_PARTS.includes(meshName) || /sofa|rug|coffee-table|armchair|table-lamp|floor-lamp|bookcase|console|pouffe|dining|wall-sconce|desk|bench|pendant|chair|door/i.test(meshName)) { part.userData.revealScale = { x: part.scale.x, y: part.scale.y, z: part.scale.z }; part.scale.setScalar(0.001); }
      part.castShadow = true; part.receiveShadow = true;
    });
    return clone;
  }, [scene]);

  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const section = document.getElementById('floorplan-reveal');
    const sceneLayer = document.getElementById('floorplan-scene-layer');
    const planLayer = document.getElementById('floorplan-plan-layer');
    if (!section || !sceneLayer || !planLayer) return;

    const walls = room.children.filter((part) => WALL_PARTS.has(part.name));
    const furniture = room.children.filter((part) => FURNITURE_PARTS.includes(part.name));
    const wallScale = walls.map((part) => part.userData.revealScaleY as number);
    const furnitureScale = furniture.map((part) => part.userData.revealScale as { x: number; y: number; z: number });
    const ambient = lights.ambient.current;
    const key = lights.key.current;
    const pendant = lights.pendant.current;
    const phases = gsap.utils.toArray<HTMLElement>('.floorplan-reveal__phase');
    if (phases.length === 0) return;
    gsap.set(sceneLayer, { autoAlpha: 0 });
    gsap.set(planLayer, { autoAlpha: 1 });
    gsap.set(phases, { autoAlpha: 0, y: 5 });
    gsap.set(phases[0], { autoAlpha: 1, y: 0 });

    const media = gsap.matchMedia();
    media.add({ mobile: '(max-width: 760px)', reduceMotion: '(prefers-reduced-motion: reduce)' }, (context) => {
      const { mobile, reduceMotion } = context.conditions as { mobile: boolean; reduceMotion: boolean };
      if (reduceMotion) {
        gsap.set(sceneLayer, { autoAlpha: 1 });
        gsap.set(planLayer, { autoAlpha: 0 });
        gsap.set(phases, { autoAlpha: 0 });
        gsap.set(phases[phases.length - 1], { autoAlpha: 1 });
        walls.forEach((part, index) => { part.scale.y = wallScale[index]; });
        furniture.forEach((part, index) => { part.scale.set(furnitureScale[index].x, furnitureScale[index].y, furnitureScale[index].z); });
        if (ambient) ambient.intensity = 1.1;
        if (key) key.intensity = 2.2;
        if (pendant) pendant.intensity = 5;
        camera.position.set(6.5, 4.1, 7.5); camera.lookAt(0, 1.1, 0);
        onReadyChange(true);
        invalidate();
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: mobile ? '+=1350' : '+=2550',
          scrub: mobile ? 0.45 : 0.8,
          pin: '.floorplan-reveal__stage',
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => { onReadyChange(self.progress >= 0.965); invalidate(); },
        },
        onUpdate: invalidate,
      });
      timeline.to(sceneLayer, { autoAlpha: 1, duration: 0.12 }, 0.08)
        .to(planLayer, { autoAlpha: 0, scale: 0.88, rotateX: 18, y: -14, duration: 0.18, ease: 'power2.in' }, 0.22)
        .to(walls, { scaleY: (index) => wallScale[index], duration: 0.22, stagger: 0.025, ease: 'power2.out' }, 0.19)
        .to(ambient, { intensity: 1.1, duration: 0.18 }, 0.63)
        .to(key, { intensity: 2.2, duration: 0.16 }, 0.66)
        .to(pendant, { intensity: 5, duration: 0.1 }, 0.7)
        .to(camera.position, { x: 6.5, y: 4.1, z: 7.5, duration: 0.25, ease: 'power1.inOut', onUpdate: () => { camera.lookAt(0, 1.1, 0); invalidate(); } }, 0.7);
      furniture.forEach((part, index) => {
        const targetScale = furnitureScale[index];
        timeline.to(part.scale, { x: targetScale.x, y: targetScale.y, z: targetScale.z, duration: mobile ? 0.13 : 0.18, ease: 'power2.out' }, 0.42 + index * (mobile ? 0.006 : 0.012));
      });
      phases.forEach((phase, index) => {
        if (index > 0) timeline.to(phase, { autoAlpha: 1, y: 0, duration: 0.04 }, 0.08 + index * 0.19);
        if (index < phases.length - 1) timeline.to(phase, { autoAlpha: 0, y: -4, duration: 0.04 }, 0.24 + index * 0.19);
      });
      return () => { timeline.scrollTrigger?.kill(); timeline.kill(); };
    });
    return () => media.revert();
  }, [camera, invalidate, onReadyChange, room, lights.ambient, lights.key, lights.pendant]);

  return <group position={[-2, 0, 0]}><primitive object={room} dispose={null} /><PottedOliveTree /></group>;
}

function SceneReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => { onReady(); }, [onReady]);
  return null;
}

export function RevealCanvas({ onReadyChange, activeId, onSelect }: { onReadyChange: (ready: boolean) => void; activeId: InteriorHotspotId | null; onSelect: (id: InteriorHotspotId) => void }) {
  const [ready, setReady] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const markSceneLoaded = useCallback(() => setSceneLoaded(true), []);
  const [lowPower, setLowPower] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 760px), (pointer: coarse)').matches);
  const ambientRef = useRef<HemisphereLight>(null);
  const keyRef = useRef<DirectionalLight>(null);
  const pendantRef = useRef<PointLight>(null);
  const updateReady = useCallback((next: boolean) => setReady((current) => current === next ? current : next), []);
  const activeHotspot = INTERIOR_HOTSPOTS.find((item) => item.id === activeId);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px), (pointer: coarse)');
    const update = () => setLowPower(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => { onReadyChange(ready); }, [onReadyChange, ready]);

  return <div className="floorplan-reveal__scene" id="floorplan-scene-layer">
    <Canvas frameloop="demand" dpr={lowPower ? 1 : [1, 1.2]} shadows={!lowPower} camera={{ position: [8, 6.2, 10.8], fov: 39, near: 0.1, far: 40 }} gl={{ antialias: !lowPower, alpha: true, powerPreference: 'low-power' }} aria-label="Interior emerging from a floor plan">
      <color attach="background" args={['#ded8ce']} />
      <hemisphereLight ref={ambientRef} args={['#fff3dd', '#625a4d', 0.04]} />
      <directionalLight ref={keyRef} castShadow={!lowPower} position={[3.5, 7, 4]} intensity={0} color="#ffe2ba" shadow-mapSize-width={lowPower ? 384 : 768} shadow-mapSize-height={lowPower ? 384 : 768} shadow-camera-near={0.1} shadow-camera-far={20} />
      <pointLight ref={pendantRef} position={[0.3, 2.8, 0.95]} intensity={0} distance={5} decay={2} color="#ffd49a" />
      <Suspense fallback={null}>
        <Environment files="/models/studio_small_03_1k.hdr" environmentIntensity={0.3} />
        <RevealRoom onReadyChange={updateReady} lights={{ ambient: ambientRef, key: keyRef, pendant: pendantRef }} />
        <SceneReadySignal onReady={markSceneLoaded} />
        {ready && <Hotspots activeId={activeId} onSelect={onSelect} />}
      </Suspense>
      <OrbitControls makeDefault enabled={ready} target={[0, 1.1, 0]} enableDamping dampingFactor={0.08} enablePan={false} enableRotate minDistance={5.7} maxDistance={13} />
    </Canvas>
    {!sceneLoaded && <SceneLoading label="Building the room" className="floorplan-reveal__loading" />}
    {activeHotspot && ready && <aside className="interior-scene__info-panel" role="dialog" aria-labelledby="reveal-info-title"><div className="interior-scene__info-head"><span className="interior-scene__info-kicker">ELEGANCE · MATERIAL STUDY</span><button type="button" className="interior-scene__info-close" onClick={() => onSelect(activeHotspot.id)} aria-label="Close details">×</button></div><h3 id="reveal-info-title">{activeHotspot.title}</h3><dl><div><dt>Material</dt><dd>{activeHotspot.material}</dd></div><div><dt>Finish</dt><dd>{activeHotspot.finish}</dd></div><div><dt>Application</dt><dd>{activeHotspot.application}</dd></div></dl></aside>}
  </div>;
}









