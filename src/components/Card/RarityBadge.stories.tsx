import type { Meta, StoryObj } from '@storybook/react';
import { RarityBadge } from './RarityBadge';

const meta: Meta<typeof RarityBadge> = {
  title: 'Card/RarityBadge',
  component: RarityBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rarity: {
      control: 'select',
      options: ['common', 'rare', 'legendary', 'mythic'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RarityBadge>;

export const Common: Story = {
  args: { rarity: 'common', size: 'sm' },
};

export const Rare: Story = {
  args: { rarity: 'rare', size: 'sm' },
};

export const Legendary: Story = {
  args: { rarity: 'legendary', size: 'sm' },
};

export const Mythic: Story = {
  args: { rarity: 'mythic', size: 'sm' },
};

export const Medium: Story = {
  args: { rarity: 'mythic', size: 'md' },
};

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <RarityBadge rarity="common" size="sm" />
        <RarityBadge rarity="rare" size="sm" />
        <RarityBadge rarity="legendary" size="sm" />
        <RarityBadge rarity="mythic" size="sm" />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <RarityBadge rarity="common" size="md" />
        <RarityBadge rarity="rare" size="md" />
        <RarityBadge rarity="legendary" size="md" />
        <RarityBadge rarity="mythic" size="md" />
      </div>
    </div>
  ),
};
