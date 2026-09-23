'use client';

import type { LightingOption, RoomConfiguration } from './configurator-state';
const options: LightingOption[] = ['Warm', 'Neutral', 'Cool'];
export function LightingSelector({ lighting, onSelect }: { lighting: LightingOption; onSelect: (key: keyof RoomConfiguration, value: string) => void }) {
  return <div className="config-group"><div className="config-group__title"><span>03</span><h3>Atmosphere</h3></div><fieldset className="config-choice-group"><legend>LIGHTING</legend><div className="config-pills config-pills--lighting">
    {options.map((item) => <button key={item} type="button" className={`config-pill${lighting === item ? ' is-selected' : ''}`} aria-pressed={lighting === item} onClick={() => onSelect('lighting', item)}><i className={`lighting-dot lighting-dot--${item.toLowerCase()}`} />{item}</button>)}
  </div></fieldset></div>;
}
