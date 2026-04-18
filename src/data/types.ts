export type Sport =
  | 'basketball'
  | 'football'
  | 'baseball'
  | 'soccer'
  | 'hockey'
  | 'tennis'
  | 'gymnastics'
  | 'boxing'
  | 'swimming'
  | 'track'
  | 'golf';

export type Rarity = 'common' | 'rare' | 'legendary' | 'mythic';

export interface Ability {
  name: string;
  description: string;
}

export interface Stat {
  label: string;
  value: number | string;
}

export interface Athlete {
  id: string;
  name: string;
  team: string;
  sport: Sport;
  era: string;
  rarity: Rarity;
  jerseyNumber?: string;
  accentColor: string;
  secondaryColor: string;
  initials: string;
  stats: Stat[];
  ability: Ability;
  flavorText: string;
}

export const RARITY_ORDER: Record<Rarity, number> = {
  common: 0,
  rare: 1,
  legendary: 2,
  mythic: 3,
};

export const RARITY_LABEL: Record<Rarity, string> = {
  common: 'Common',
  rare: 'Rare',
  legendary: 'Legendary',
  mythic: 'Mythic',
};

export const SPORT_LABEL: Record<Sport, string> = {
  basketball: 'Basketball',
  football: 'Football',
  baseball: 'Baseball',
  soccer: 'Soccer',
  hockey: 'Hockey',
  tennis: 'Tennis',
  gymnastics: 'Gymnastics',
  boxing: 'Boxing',
  swimming: 'Swimming',
  track: 'Track & Field',
  golf: 'Golf',
};
