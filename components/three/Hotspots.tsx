'use client';

import { Html } from '@react-three/drei';
import type { CSSProperties } from 'react';
import type { Vector3Tuple } from 'three';

export type InteriorHotspotId = 'sofa' | 'coffee-table' | 'pendant-light' | 'marble-floor' | 'wall-panel' | 'indoor-plant';
export type InteriorHotspotData = {
  id: InteriorHotspotId;
  position: Vector3Tuple;
  title: string;
  material: string;
  finish: string;
  application: string;
};

export const INTERIOR_HOTSPOTS: InteriorHotspotData[] = [
  { id: 'sofa', position: [2.35, 1.05, -1.28], title: 'The Three-Seat Sofa', material: 'Textured linen · solid oak', finish: 'Soft, natural weave', application: 'Made for lounging' },
  { id: 'coffee-table', position: [2.55, 0.72, -0.35], title: 'The Coffee Table', material: 'Smoked oak · walnut', finish: 'Hand-oiled', application: 'Living room furniture' },
  { id: 'pendant-light', position: [2.3, 2.15, 0.95], title: 'The Pendant Light', material: 'Linen · blackened metal', finish: 'Diffused warm light', application: 'Dining, ambient lighting' },
  { id: 'marble-floor', position: [0.55, 0.12, 0.05], title: 'Calacatta Marble', material: 'Natural Italian marble', finish: 'Polished', application: 'Flooring / surfaces' },
  { id: 'wall-panel', position: [2.65, 1.35, -1.84], title: 'Smoked Oak Wall Panel', material: 'Oak veneer · timber battens', finish: 'Matte, brushed grain', application: 'Living-room feature wall' },
  { id: 'indoor-plant', position: [4.12, 1.45, -0.48], title: 'Indoor Olive Tree', material: 'Live olive · clay planter', finish: 'Hand-finished terracotta', application: 'Natural accent / greenery' },
];

type HotspotsProps = {
  activeId: InteriorHotspotId | null;
  onSelect: (id: InteriorHotspotId) => void;
};

export function Hotspots({ activeId, onSelect }: HotspotsProps) {
  return (
    <group position={[-2, 0, 0]}>
      {INTERIOR_HOTSPOTS.map((hotspot, index) => (
        <Html key={hotspot.id} position={hotspot.position} center distanceFactor={8} zIndexRange={[20, 0]}>
          <button
            className={`interior-hotspot${activeId === hotspot.id ? ' is-active' : ''}`}
            type="button"
            aria-label={`View ${hotspot.title} details`}
            aria-pressed={activeId === hotspot.id}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onSelect(hotspot.id)}
            style={{ '--hotspot-delay': `${index * 180}ms` } as CSSProperties}
          >
            <span className="interior-hotspot__pulse" aria-hidden="true" />
            <span className="interior-hotspot__dot" aria-hidden="true" />
          </button>
        </Html>
      ))}
    </group>
  );
}
