import type { Meta, StoryObj } from '@storybook/react';
import { CardGrid } from './CardGrid';
import { ATHLETES } from '@/data/athletes';
import type { Athlete } from '@/data/types';

// CardGrid is the collection layer — many Cards laid out responsively, with a
// "×N" badge on duplicates and a dedicated empty state.
type Owned = Athlete & { acquiredAt: number; count: number };

// Fixed timestamps keep the "recent"-style ordering deterministic for snapshots.
const BASE = 1_700_000_000_000;

function own(list: Athlete[], counts: Record<string, number> = {}): Owned[] {
  return list.map((a, i) => ({
    ...a,
    acquiredAt: BASE + i * 1000,
    count: counts[a.id] ?? 1,
  }));
}

const STARTER_IDS = ['steph-curry', 'jerry-rice', 'patrick-mahomes', 'simone-biles'];
const starter = own(ATHLETES.filter((a) => STARTER_IDS.includes(a.id)));
const everything = own(ATHLETES, {
  'steph-curry': 3,
  'lebron-james': 2,
  'patrick-mahomes': 2,
});

const meta: Meta<typeof CardGrid> = {
  title: 'Collection/CardGrid',
  component: CardGrid,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '80rem', margin: '0 auto', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CardGrid>;

// The four-card starter collection a new player begins with.
export const Starter: Story = {
  args: { athletes: starter },
};

// Every athlete in the set, with a few duplicates to show the count badge.
export const FullCollection: Story = {
  args: { athletes: everything },
};

// Heavy duplicate counts — exercises the badge layout at one and two digits.
export const WithDuplicates: Story = {
  args: {
    athletes: own(
      ATHLETES.filter((a) =>
        ['steph-curry', 'michael-jordan', 'lebron-james', 'tom-brady'].includes(a.id),
      ),
      { 'steph-curry': 4, 'michael-jordan': 2, 'lebron-james': 12 },
    ),
  },
};

// No cards collected yet — the empty state.
export const Empty: Story = {
  args: { athletes: [] },
};
