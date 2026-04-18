import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/components/Card/Card';
import type { Athlete } from '@/data/types';

interface CardGridProps {
  athletes: (Athlete & { acquiredAt: number; count: number })[];
  onCardClick?: (athlete: Athlete) => void;
  layoutIdPrefix?: string;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 240, damping: 24 },
  },
};

export function CardGrid({ athletes, onCardClick, layoutIdPrefix }: CardGridProps) {
  const prefix = layoutIdPrefix ?? 'card';

  if (athletes.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-ink-900/50 px-6 py-16 text-center">
        <span className="font-mono uppercase tracking-widest text-[10px] text-ink-300">
          Empty collection
        </span>
        <p className="font-display text-ink-100">No cards to show just yet.</p>
        <p className="text-sm text-ink-300">
          Open a pack to start building your lineup of all-time greats.
        </p>
      </div>
    );
  }

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid w-full justify-center gap-8"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))',
      }}
    >
      <AnimatePresence mode="popLayout">
        {athletes.map((athlete) => (
          <motion.li
            key={athlete.id}
            layout
            variants={item}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <Card
                athlete={athlete}
                layoutId={`${prefix}-${athlete.id}`}
                onClick={onCardClick ? () => onCardClick(athlete) : undefined}
                size="md"
              />
              {athlete.count > 1 && (
                <div
                  aria-label={`${athlete.count} copies`}
                  className="pointer-events-none absolute -right-2 -top-2 z-10 flex min-w-[2rem] items-center justify-center rounded-full border border-white/15 bg-ink-900/90 px-2 py-1 font-mono text-[11px] font-semibold tabular-nums text-ink-100 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur"
                >
                  <span className="text-ink-300">&times;</span>
                  <span className="ml-0.5">{athlete.count}</span>
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
