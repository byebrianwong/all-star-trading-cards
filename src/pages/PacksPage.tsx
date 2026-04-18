import { useState } from 'react';
import { motion } from 'framer-motion';
import { PackOpening } from '@/components/BoosterPack';
import { useCollection } from '@/hooks/useCollection';
import type { PackType } from '@/lib/pullCard';

export default function PacksPage() {
  const { addCard } = useCollection();
  const [packType, setPackType] = useState<PackType | null>(null);
  const [sessionKey, setSessionKey] = useState(0);

  if (packType) {
    return (
      <PackOpening
        key={sessionKey}
        packType={packType}
        onComplete={(athlete) => {
          addCard(athlete.id);
          setPackType(null);
          setSessionKey((k) => k + 1);
        }}
        onReset={() => setSessionKey((k) => k + 1)}
      />
    );
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight">Booster Packs</h1>
        <p className="text-ink-300 mt-2">Rip a pack to reveal a new card for your collection.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PackChoice
          label="Standard Pack"
          subtitle="One card. Mostly commons & rares."
          onSelect={() => setPackType('standard')}
        />
        <PackChoice
          label="Premium Pack"
          subtitle="One card. Legendary+ boosted."
          premium
          onSelect={() => setPackType('premium')}
        />
      </div>
    </div>
  );
}

function PackChoice({
  label,
  subtitle,
  premium,
  onSelect,
}: {
  label: string;
  subtitle: string;
  premium?: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-2xl border p-8 text-left transition ${
        premium
          ? 'border-rarity-legendary/40 bg-gradient-to-br from-rarity-legendary/10 via-rarity-mythic/10 to-ink-900 shadow-glow-legendary'
          : 'border-white/10 bg-gradient-to-br from-rarity-rare/10 via-ink-800 to-ink-900'
      }`}
    >
      <div className="font-mono uppercase tracking-widest text-[10px] text-ink-300 mb-3">
        {premium ? 'Premium' : 'Standard'}
      </div>
      <div className="font-display font-bold text-2xl tracking-tight">{label}</div>
      <p className="text-ink-300 mt-2 text-sm">{subtitle}</p>
      <div className={`mt-6 inline-flex items-center gap-2 font-mono uppercase tracking-widest text-xs ${premium ? 'text-rarity-legendary' : 'text-rarity-rare'}`}>
        Open →
      </div>
    </motion.button>
  );
}
