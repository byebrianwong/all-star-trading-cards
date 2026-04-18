import { useMemo, useState } from 'react';
import { CardGrid, SortControls, type SortMode } from '@/components/CardGrid';
import { CardModal } from '@/components/CardModal';
import { useCollection } from '@/hooks/useCollection';
import { RARITY_ORDER, SPORT_LABEL, type Athlete } from '@/data/types';

type OwnedAthlete = Athlete & { acquiredAt: number; count: number };

function sortAthletes(list: OwnedAthlete[], mode: SortMode): OwnedAthlete[] {
  const copy = [...list];
  switch (mode) {
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'rarity':
      return copy.sort((a, b) => {
        const diff = RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity];
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      });
    case 'sport':
      return copy.sort((a, b) => {
        const diff = SPORT_LABEL[a.sport].localeCompare(SPORT_LABEL[b.sport]);
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      });
    case 'recent':
    default:
      return copy.sort((a, b) => b.acquiredAt - a.acquiredAt);
  }
}

export default function CollectionPage() {
  const { ownedAthletes } = useCollection();
  const [sortMode, setSortMode] = useState<SortMode>('recent');
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const sorted = useMemo(() => sortAthletes(ownedAthletes, sortMode), [ownedAthletes, sortMode]);
  const focused = sorted.find((a) => a.id === focusedId) ?? null;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight">Your Collection</h1>
        <p className="text-ink-300 mt-2">Hover a card to tilt it. Click to focus.</p>
      </header>

      <SortControls value={sortMode} onChange={setSortMode} totalCount={sorted.length} />

      <CardGrid
        athletes={sorted}
        onCardClick={(a) => setFocusedId(a.id)}
        layoutIdPrefix="collection"
      />

      <CardModal
        athlete={focused}
        onClose={() => setFocusedId(null)}
        layoutIdPrefix="collection"
      />
    </div>
  );
}
