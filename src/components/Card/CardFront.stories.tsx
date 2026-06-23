import type { Meta, StoryObj, Decorator } from '@storybook/react';
import { CardFront } from './CardFront';
import { ATHLETES } from '@/data/athletes';
import type { Athlete } from '@/data/types';

// CardFront is the "text section" of a card — the rarity badge, portrait,
// name/team, stat grid, ability box and flavor text. It fills its parent, so
// every story renders it inside a frame the size of a medium Card.
const find = (id: string) => ATHLETES.find((a) => a.id === id)!;

const common: Athlete = { ...find('patrick-mahomes'), rarity: 'common' };
const rare = find('patrick-mahomes');
const legendary = find('jerry-rice');
const mythic = find('steph-curry');
const noJersey = find('serena-williams'); // tennis — no jersey number

const FRAME_W = '18rem';
const FRAME_H = '26rem';

// Applied per-story (not at meta level) so the Gallery can frame its own cards.
const framed: Decorator = (Story) => (
  <div style={{ width: FRAME_W, height: FRAME_H }} className="rounded-[22px] shadow-card overflow-hidden">
    <Story />
  </div>
);

const meta: Meta<typeof CardFront> = {
  title: 'Card/CardFront',
  component: CardFront,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CardFront>;

export const Common: Story = {
  args: { athlete: common },
  decorators: [framed],
};

export const Rare: Story = {
  args: { athlete: rare },
  decorators: [framed],
};

export const Legendary: Story = {
  args: { athlete: legendary },
  decorators: [framed],
};

export const Mythic: Story = {
  args: { athlete: mythic },
  decorators: [framed],
};

// No jersey number — the header collapses to just the rarity/sport block.
export const NoJerseyNumber: Story = {
  args: { athlete: noJersey },
  decorators: [framed],
};

// All four rarities side by side — frames each card itself.
export const Gallery: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {[common, rare, legendary, mythic].map((athlete) => (
        <div
          key={athlete.rarity}
          style={{ width: FRAME_W, height: FRAME_H }}
          className="rounded-[22px] shadow-card overflow-hidden"
        >
          <CardFront athlete={athlete} />
        </div>
      ))}
    </div>
  ),
};
