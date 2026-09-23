export type WallOption = 'Ivory' | 'Beige' | 'Charcoal' | 'Textured';
export type FloorOption = 'Oak' | 'Walnut' | 'Marble' | 'Concrete';
export type SofaOption = 'Cream' | 'Beige' | 'Grey' | 'Brown';
export type LightingOption = 'Warm' | 'Neutral' | 'Cool';
export type StyleOption = 'Minimal' | 'Modern' | 'Japandi' | 'Luxury';

export type RoomConfiguration = {
  wall: WallOption;
  floor: FloorOption;
  sofa: SofaOption;
  lighting: LightingOption;
  style: StyleOption;
};

export type ConfigurationAction = { type: 'select'; key: keyof RoomConfiguration; value: string };

export const INITIAL_CONFIGURATION: RoomConfiguration = {
  wall: 'Ivory',
  floor: 'Oak',
  sofa: 'Cream',
  lighting: 'Warm',
  style: 'Japandi',
};

export function configurationReducer(state: RoomConfiguration, action: ConfigurationAction): RoomConfiguration {
  if (action.type !== 'select') return state;
  return { ...state, [action.key]: action.value } as RoomConfiguration;
}
