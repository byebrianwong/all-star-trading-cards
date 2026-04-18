import { useCallback, useEffect, useState } from 'react';
import { ATHLETES } from '@/data/athletes';
import type { Athlete } from '@/data/types';

const STORAGE_KEY = 'all-stars:collection-v1';
const STARTER_IDS = ['steph-curry', 'jerry-rice', 'patrick-mahomes', 'simone-biles'];

export interface CollectionEntry {
  athleteId: string;
  acquiredAt: number;
  count: number;
}

interface StoredState {
  entries: CollectionEntry[];
}

function loadState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredState;
  } catch {
    // ignore
  }
  const now = Date.now();
  return {
    entries: STARTER_IDS.map((id, i) => ({
      athleteId: id,
      acquiredAt: now - (STARTER_IDS.length - i) * 1000,
      count: 1,
    })),
  };
}

export function useCollection() {
  const [state, setState] = useState<StoredState>(() => loadState());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const ownedAthletes: (Athlete & { acquiredAt: number; count: number })[] = state.entries
    .map((e) => {
      const a = ATHLETES.find((x) => x.id === e.athleteId);
      if (!a) return null;
      return { ...a, acquiredAt: e.acquiredAt, count: e.count };
    })
    .filter((x): x is Athlete & { acquiredAt: number; count: number } => x !== null);

  const addCard = useCallback((athleteId: string) => {
    setState((prev) => {
      const existing = prev.entries.find((e) => e.athleteId === athleteId);
      if (existing) {
        return {
          entries: prev.entries.map((e) =>
            e.athleteId === athleteId ? { ...e, count: e.count + 1, acquiredAt: Date.now() } : e,
          ),
        };
      }
      return {
        entries: [...prev.entries, { athleteId, acquiredAt: Date.now(), count: 1 }],
      };
    });
  }, []);

  const reset = useCallback(() => setState(loadState()), []);

  return { ownedAthletes, addCard, reset };
}
