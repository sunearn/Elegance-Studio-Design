'use client';

import type { RoomConfiguration, SofaOption } from './configurator-state';
const sofas: { name: SofaOption; color: string }[] = [
  { name: 'Cream', color: '#e5dfd3' }, { name: 'Beige', color: '#b5a48c' },
  { name: 'Grey', color: '#888783' }, { name: 'Brown', color: '#725c4a' },
];
export function FurnitureSelector({ sofa, onSelect }: { sofa: SofaOption; onSelect: (key: keyof RoomConfiguration, value: string) => void }) {
  return <div className="config-group"><div className="config-group__title"><span>02</span><h3>Furniture</h3></div><fieldset className="config-choice-group"><legend>SOFA</legend><div className="config-swatches">
    {sofas.map((item) => <button key={item.name} className={`config-swatch${sofa === item.name ? ' is-selected' : ''}`} type="button" onClick={() => onSelect('sofa', item.name)} aria-pressed={sofa === item.name} title={item.name}><i style={{ background: item.color }} /><span>{item.name}</span></button>)}
  </div></fieldset></div>;
}
