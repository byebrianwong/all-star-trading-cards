import type { Athlete, Rarity } from '@/data/types';

export type PackType = 'standard' | 'premium';

const WEIGHTS: Record<PackType, Record<Rarity, number>> = {
  standard: { common: 60, rare: 28, legendary: 10, mythic: 2 },
  premium: { common: 20, rare: 40, legendary: 30, mythic: 10 },
};

// Ordered high → low so fallback walks to lower rarities when a bucket is empty.
const RARITY_DESC: Rarity[] = ['mythic', 'legendary', 'rare', 'common'];

function groupByRarity(pool: Athlete[]): Record<Rarity, Athlete[]> {
  const groups: Record<Rarity, Athlete[]> = {
    common: [],
    rare: [],
    legendary: [],
    mythic: [],
  };
  for (const a of pool) {
    groups[a.rarity].push(a);
  }
  return groups;
}

function pickRarityByWeight(weights: Record<Rarity, number>): Rarity {
  const total = RARITY_DESC.reduce((sum, r) => sum + weights[r], 0);
  let roll = Math.random() * total;
  for (const r of RARITY_DESC) {
    roll -= weights[r];
    if (roll <= 0) return r;
  }
  return 'common';
}

export function pullCard(pool: Athlete[], packType: PackType = 'standard'): Athlete {
  if (pool.length === 0) {
    throw new Error('pullCard: pool is empty');
  }
  const groups = groupByRarity(pool);
  let chosen = pickRarityByWeight(WEIGHTS[packType]);

  // Fall back to the next lower rarity when empty.
  const startIdx = RARITY_DESC.indexOf(chosen);
  for (let i = startIdx; i < RARITY_DESC.length; i++) {
    const r = RARITY_DESC[i];
    if (groups[r].length > 0) {
      chosen = r;
      break;
    }
  }

  // If even the lowest was empty, walk upward as last resort.
  if (groups[chosen].length === 0) {
    for (let i = RARITY_DESC.length - 1; i >= 0; i--) {
      const r = RARITY_DESC[i];
      if (groups[r].length > 0) {
        chosen = r;
        break;
      }
    }
  }

  const bucket = groups[chosen];
  const idx = Math.floor(Math.random() * bucket.length);
  return bucket[idx];
}
