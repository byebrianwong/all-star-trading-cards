import { Sparkles } from 'lucide-react';

export function CardBack() {
  return (
    <div className="relative w-full h-full rounded-[22px] overflow-hidden flex items-center justify-center bg-ink-900">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            repeating-linear-gradient(45deg, rgba(74,169,255,0.08) 0 2px, transparent 2px 8px),
            linear-gradient(140deg, #0a0c14 0%, #191d2d 50%, #10131e 100%)
          `,
        }}
      />
      <div className="absolute inset-3 rounded-[18px] border border-white/10" />
      <div className="absolute inset-6 rounded-[14px] border border-white/5" />
      <div className="relative flex flex-col items-center gap-3 text-ink-100">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rarity-legendary via-rarity-mythic to-rarity-rare p-0.5">
          <div className="w-full h-full rounded-full bg-ink-950 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-rarity-legendary" />
          </div>
        </div>
        <div className="text-center">
          <div className="font-display font-bold tracking-tight text-lg">All-Stars</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-300">Trading Cards</div>
        </div>
      </div>
    </div>
  );
}
