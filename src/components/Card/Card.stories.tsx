import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { ATHLETES } from '@/data/athletes';
import type { Athlete } from '@/data/types';

const stephCurry = ATHLETES.find((a) => a.id === 'steph-curry')!;
const jerryRice = ATHLETES.find((a) => a.id === 'jerry-rice')!;
const mahomes = ATHLETES.find((a) => a.rarity === 'rare')!;
const commonAthlete: Athlete = { ...ATHLETES[0], rarity: 'common' };

const meta: Meta<typeof Card> = {
  title: 'Card/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Common: Story = {
  args: {
    athlete: commonAthlete,
    size: 'md',
  },
};

export const Rare: Story = {
  args: {
    athlete: mahomes,
    size: 'md',
  },
};

export const Legendary: Story = {
  args: {
    athlete: jerryRice,
    size: 'md',
  },
};

export const Mythic: Story = {
  args: {
    athlete: stephCurry,
    size: 'md',
  },
};

export const Hover: Story = {
  args: {
    athlete: stephCurry,
    size: 'md',
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const Flipped: Story = {
  args: {
    athlete: stephCurry,
    size: 'md',
    flipped: true,
  },
};

export const AllRarities: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', padding: '2rem' }}>
      <Card athlete={commonAthlete} size="md" interactive={false} />
      <Card athlete={mahomes} size="md" interactive={false} />
      <Card athlete={jerryRice} size="md" interactive={false} />
      <Card athlete={stephCurry} size="md" interactive={false} />
    </div>
  ),
};
