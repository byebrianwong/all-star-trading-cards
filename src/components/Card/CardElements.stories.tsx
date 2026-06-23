import type { Meta, StoryObj, Decorator } from '@storybook/react';
import { Portrait, StatGrid, AbilityBox } from './CardElements';
import { ATHLETES } from '@/data/athletes';
import type { Athlete } from '@/data/types';

// Isolated showcases for the individual building blocks of a CardFront — the
// portrait medallion, the stat grid and the ability box — each rendered on its
// own rather than buried inside a full card.
const find = (id: string) => ATHLETES.find((a) => a.id === id)!;
const mahomes = find('patrick-mahomes');
const curry = find('steph-curry');
const rice = find('jerry-rice');
const serena = find('serena-williams');

// The stat grid and ability box use translucent panels meant to sit on a card's
// color gradient, so those stories render on a representative gradient swatch.
const swatch =
  (athlete: Athlete): Decorator =>
  (Story) => (
    <div
      className="w-72 rounded-2xl p-5"
      style={{
        background: `linear-gradient(135deg, ${athlete.accentColor} 0%, ${athlete.secondaryColor} 100%)`,
      }}
    >
      <Story />
    </div>
  );

const meta: Meta = {
  title: 'Card/Elements',
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj;

// The portrait medallion is self-contained — it carries its own gradient.
export const PortraitMedallion: Story = {
  render: () => (
    <Portrait initials={curry.initials} accentColor={curry.accentColor} secondaryColor={curry.secondaryColor} />
  ),
};

// The same medallion across a range of athlete color pairs.
export const PortraitColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      {[mahomes, curry, rice, serena].map((a) => (
        <Portrait key={a.id} initials={a.initials} accentColor={a.accentColor} secondaryColor={a.secondaryColor} />
      ))}
    </div>
  ),
};

export const Stats: Story = {
  decorators: [swatch(curry)],
  render: () => <StatGrid stats={curry.stats} className="w-full" />,
};

export const Ability: Story = {
  decorators: [swatch(rice)],
  render: () => <AbilityBox ability={rice.ability} className="w-full" />,
};

// All three blocks stacked on one swatch — a CardFront taken apart.
export const AllElements: Story = {
  decorators: [swatch(curry)],
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Portrait initials={curry.initials} accentColor={curry.accentColor} secondaryColor={curry.secondaryColor} />
      <StatGrid stats={curry.stats} className="w-full" />
      <AbilityBox ability={curry.ability} className="w-full" />
    </div>
  ),
};
