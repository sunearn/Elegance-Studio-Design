'use client';

import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { CameraControls } from './CameraControls';
import { Hotspots, INTERIOR_HOTSPOTS, type InteriorHotspotId } from './Hotspots';
import { InteriorModel } from './InteriorModel';
import { SceneLoading } from './SceneLoading';
import { INITIAL_CONFIGURATION, type RoomConfiguration } from '@/components/configurator/configurator-state';

function SceneReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => { onReady(); }, [onReady]);
  return null;
}

const lighting = {
  Warm: { key: '#ffd6a0', ambient: '#fff0d7', intensity: 2.2 },
  Neutral: { key: '#fff5e7', ambient: '#f4f0e8', intensity: 2 },
  Cool: { key: '#c9dcf0', ambient: '#e4edf5', intensity: 1.9 },
};
const styleSettings = {
  Minimal: { background: '#e2ded6', environment: 0.28 }, Modern: { background: '#d9d8d4', environment: 0.38 },
  Japandi: { background: '#ded8ce', environment: 0.38 }, Luxury: { background: '#d5cabc', environment: 0.5 },
};

type SceneCanvasProps = { configuration?: RoomConfiguration; showHotspots?: boolean; scrollTarget?: string };

export function SceneCanvas({ configuration = INITIAL_CONFIGURATION, showHotspots = true, scrollTarget }: SceneCanvasProps) {
  const [activeId, setActiveId] = useState<InteriorHotspotId | null>(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const markSceneLoaded = useCallback(() => setSceneLoaded(true), []);
  const [lowPower, setLowPower] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px), (pointer: coarse)');
    const update = () => setLowPower(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const activeHotspot = INTERIOR_HOTSPOTS.find((hotspot) => hotspot.id === activeId);
  const light = lighting[configuration.lighting];
  const style = styleSettings[configuration.style];

  return <div className="interior-scene__stage">
    <Canvas className="interior-scene__canvas" shadows={!lowPower} dpr={lowPower ? 1 : [1, 1.35]} camera={{ position: [7.3, 4.5, 8.4], fov: 39, near: 0.1, far: 40 }} gl={{ antialias: !lowPower, alpha: false, powerPreference: 'low-power' }} aria-label="Interactive three-dimensional living room">
      <color attach="background" args={[style.background]} />
      <ambientLight intensity={1.05} color={light.ambient} />
      <hemisphereLight args={[light.ambient, '#625a4d', 1.1]} />
      <directionalLight castShadow={!lowPower} position={[3.5, 7, 4]} intensity={light.intensity} color={light.key} shadow-mapSize-width={lowPower ? 512 : 1024} shadow-mapSize-height={lowPower ? 512 : 1024} shadow-camera-near={0.1} shadow-camera-far={20} />
      <directionalLight position={[-4, 3, -3]} intensity={0.65} color={configuration.lighting === 'Cool' ? '#b6cce3' : '#c6a981'} />
      <Suspense fallback={null}>
        <Environment files="/models/studio_small_03_1k.hdr" environmentIntensity={style.environment} />
        <InteriorModel configuration={configuration} />
        {showHotspots && <Hotspots activeId={activeId} onSelect={setActiveId} />}
        <SceneReadySignal onReady={markSceneLoaded} />
      </Suspense>
      <CameraControls scrollTarget={scrollTarget} />
    </Canvas>
    {!sceneLoaded && <SceneLoading label="Preparing the interior" className="interior-scene__loading-overlay" />}
    {activeHotspot && showHotspots && <aside className="interior-scene__info-panel" aria-labelledby="interior-hotspot-title" role="dialog">
      <div className="interior-scene__info-head"><span className="interior-scene__info-kicker">ELEGANCE · MATERIAL STUDY</span><button type="button" className="interior-scene__info-close" onClick={() => setActiveId(null)} aria-label="Close details">×</button></div>
      <h3 id="interior-hotspot-title">{activeHotspot.title}</h3>
      <dl><div><dt>Material</dt><dd>{activeHotspot.material}</dd></div><div><dt>Finish</dt><dd>{activeHotspot.finish}</dd></div><div><dt>Application</dt><dd>{activeHotspot.application}</dd></div></dl>
    </aside>}
  </div>;
}

