import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Card } from '@/components/Card/Card';
import type { Athlete, Rarity } from '@/data/types';
import { RARITY_LABEL, SPORT_LABEL } from '@/data/types';

interface CardModalProps {
  athlete: (Athlete & { acquiredAt?: number; count?: number }) | null;
  onClose: () => void;
  layoutIdPrefix?: string;
}

const RARITY_ACCENT: Record<Rarity, string> = {
  common: 'text-rarity-common',
  rare: 'text-rarity-rare',
  legendary: 'text-rarity-legendary',
  mythic: 'text-rarity-mythic',
};

const RARITY_GLOW_BG: Record<Rarity, string> = {
  common: 'from-rarity-common/10',
  rare: 'from-rarity-rare/20',
  legendary: 'from-rarity-legendary/25',
  mythic: 'from-rarity-mythic/30',
};

function formatDate(ts: number | undefined): string | null {
  if (!ts) return null;
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(ts));
  } catch {
    return null;
  }
}

export function CardModal({ athlete, onClose, layoutIdPrefix }: CardModalProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const prefix = layoutIdPrefix ?? 'card';

  useEffect(() => {
    if (!athlete) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [athlete]);

  useEffect(() => {
    if (!athlete) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [athlete, onClose]);

  useEffect(() => {
    if (athlete && closeRef.current) {
      const id = requestAnimationFrame(() => closeRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    return;
  }, [athlete]);

  return (
    <AnimatePresence>
      {athlete && (
        <motion.div
          key="card-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${athlete.name} card details`}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink-950/70 px-4 py-8 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Rarity aura */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`pointer-events-none absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial ${RARITY_GLOW_BG[athlete.rarity]} via-transparent to-transparent blur-3xl`}
            style={{
              backgroundImage: `radial-gradient(circle at center, var(--tw-gradient-from) 0%, transparent 60%)`,
            }}
          />

          {/* Close button */}
          <motion.button
            ref={closeRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.1 }}
            className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink-800/80 text-ink-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_-8px_rgba(0,0,0,0.8)] backdrop-blur transition hover:border-white/20 hover:bg-ink-700/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            aria-label="Close card details"
          >
            <X className="h-5 w-5" aria-hidden />
          </motion.button>

          <div
            className="relative flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card */}
            <div className="relative shrink-0">
              <Card
                athlete={athlete}
                layoutId={`${prefix}-${athlete.id}`}
                interactive={false}
                size="lg"
              />
            </div>

            {/* Side panel — desktop only */}
            <motion.aside
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="hidden w-full max-w-sm md:block"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800/80 to-ink-900/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md">
                {/* inner highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <div className="flex items-center gap-2">
                  <span className="font-mono uppercase tracking-widest text-[10px] text-ink-300">
                    Dossier
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-ink-100">
                  {athlete.name}
                </h2>
                <p className="mt-1 font-mono uppercase tracking-widest text-[10px] text-ink-300">
                  {athlete.team} &middot; {SPORT_LABEL[athlete.sport]} &middot; {athlete.era}
                </p>

                <p className="mt-5 font-display text-lg italic leading-snug text-ink-100/90">
                  &ldquo;{athlete.flavorText}&rdquo;
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-ink-950/40 px-4 py-3">
                    <span className="font-mono uppercase tracking-widest text-[10px] text-ink-300">
                      Rarity
                    </span>
                    <span
                      className={`font-display text-sm font-semibold ${RARITY_ACCENT[athlete.rarity]}`}
                    >
                      This is a {RARITY_LABEL[athlete.rarity]} card
                    </span>
                  </div>

                  {formatDate(athlete.acquiredAt) && (
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-ink-950/40 px-4 py-3">
                      <span className="font-mono uppercase tracking-widest text-[10px] text-ink-300">
                        Collected
                      </span>
                      <span className="font-mono text-xs tabular-nums text-ink-100">
                        {formatDate(athlete.acquiredAt)}
                      </span>
                    </div>
                  )}

                  {typeof athlete.count === 'number' && athlete.count > 1 && (
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-ink-950/40 px-4 py-3">
                      <span className="font-mono uppercase tracking-widest text-[10px] text-ink-300">
                        Copies
                      </span>
                      <span className="font-mono text-xs tabular-nums text-ink-100">
                        &times;{athlete.count}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 rounded-xl border border-white/5 bg-ink-950/40 p-4">
                  <div className="font-mono uppercase tracking-widest text-[10px] text-ink-300">
                    Signature ability
                  </div>
                  <div className="mt-1.5 font-display text-sm font-semibold text-ink-100">
                    {athlete.ability.name}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-ink-300">
                    {athlete.ability.description}
                  </p>
                </div>
              </div>
            </motion.aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
