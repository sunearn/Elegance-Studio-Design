'use client';

import type { RoomConfiguration } from './configurator-state';
import { MaterialSelector } from './MaterialSelector';
import { FurnitureSelector } from './FurnitureSelector';
import { LightingSelector } from './LightingSelector';

type ConfigPanelProps = {
  configuration: RoomConfiguration;
  onSelect: (key: keyof RoomConfiguration, value: string) => void;
  onGenerate: () => void;
  generated: boolean;
};

export function ConfigPanel({ configuration, onSelect, onGenerate, generated }: ConfigPanelProps) {
  return (
    <aside className="config-panel" aria-label="Room configuration options">
      <div className="config-panel__heading"><span className="config-panel__step">01 / 05</span><span className="config-panel__status"><i /> CONFIGURE YOUR ROOM</span></div>
      <MaterialSelector wall={configuration.wall} floor={configuration.floor} style={configuration.style} onSelect={onSelect} />
      <FurnitureSelector sofa={configuration.sofa} onSelect={onSelect} />
      <LightingSelector lighting={configuration.lighting} onSelect={onSelect} />
      <div className="config-summary">
        <span className="config-summary__eyebrow">YOUR SPACE</span>
        <div className="config-summary__row"><span>Selected materials</span><strong>{configuration.wall} walls · {configuration.floor} floor</strong></div>
        <div className="config-summary__row"><span>Selected furniture</span><strong>{configuration.sofa} sofa</strong></div>
        <div className="config-summary__row"><span>Selected lighting</span><strong>{configuration.lighting}</strong></div>
        <div className="config-summary__row"><span>Selected style</span><strong>{configuration.style}</strong></div>
      </div>
      <button className="config-generate" onClick={onGenerate} type="button">
        <span>{generated ? 'SPACE CONFIGURATION SAVED' : 'GENERATE MY SPACE'}</span><span aria-hidden="true">↗</span>
      </button>
      <p className="config-panel__note" aria-live="polite">{generated ? 'Your selection is ready to share with our studio.' : 'Your choices update the room in real time.'}</p>
    </aside>
  );
}


