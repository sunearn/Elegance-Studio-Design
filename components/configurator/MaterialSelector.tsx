'use client';

import type { RoomConfiguration, WallOption, FloorOption, StyleOption } from './configurator-state';

const walls: { name: WallOption; color: string }[] = [
  { name: 'Ivory', color: '#e8e1d5' }, { name: 'Beige', color: '#bcae98' }, { name: 'Charcoal', color: '#44433f' },
  { name: 'Textured', color: 'repeating-linear-gradient(135deg,#d9d1c3 0 3px,#c7bcac 3px 4px)' },
];
const floors: { name: FloorOption; color: string }[] = [
  { name: 'Oak', color: '#aa8865' }, { name: 'Walnut', color: '#674d3d' },
  { name: 'Marble', color: 'linear-gradient(135deg,#eeeae2,#b9b4ac)' }, { name: 'Concrete', color: '#9c9a94' },
];
const styles: StyleOption[] = ['Minimal', 'Modern', 'Japandi', 'Luxury'];
type Props = Pick<RoomConfiguration, 'wall' | 'floor' | 'style'> & { onSelect: (key: keyof RoomConfiguration, value: string) => void };

export function MaterialSelector({ wall, floor, style, onSelect }: Props) {
  return <div className="config-group"><div className="config-group__title"><span>01</span><h3>Materials & style</h3></div>
    <fieldset className="config-choice-group"><legend>WALL</legend><div className="config-swatches">{walls.map((item) => <button key={item.name} className={`config-swatch${wall === item.name ? ' is-selected' : ''}`} type="button" onClick={() => onSelect('wall', item.name)} aria-pressed={wall === item.name} title={item.name}><i style={{ background: item.color }} /><span>{item.name}</span></button>)}</div></fieldset>
    <fieldset className="config-choice-group"><legend>FLOOR</legend><div className="config-swatches">{floors.map((item) => <button key={item.name} className={`config-swatch${floor === item.name ? ' is-selected' : ''}`} type="button" onClick={() => onSelect('floor', item.name)} aria-pressed={floor === item.name} title={item.name}><i style={{ background: item.color }} /><span>{item.name}</span></button>)}</div></fieldset>
    <fieldset className="config-choice-group"><legend>STYLE</legend><div className="config-pills">{styles.map((item) => <button key={item} type="button" className={`config-pill${style === item ? ' is-selected' : ''}`} aria-pressed={style === item} onClick={() => onSelect('style', item)}>{item}</button>)}</div></fieldset>
  </div>;
}
