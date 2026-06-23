import { useState } from 'react';
import type { Meta, StoryObj, Decorator } from '@storybook/react';
import { SortControls, type SortMode } from './SortControls';

// SortControls is the collection toolbar — the count "pill" on the left and the
// segmented sort control box on the right. It spreads to fill its row, so each
// story frames it in a fixed-width container the way the page does.
const row: Decorator = (Story) => (
  <div style={{ width: '46rem', maxWidth: '100%' }}>
    <Story />
  </div>
);

const meta: Meta<typeof SortControls> = {
  title: 'Collection/SortControls',
  component: SortControls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [row],
  argTypes: {
    value: { control: 'radio', options: ['recent', 'rarity', 'sport', 'name'] },
    totalCount: { control: 'number' },
  },
  args: {
    value: 'recent',
    totalCount: 12,
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SortControls>;

export const Recent: Story = {
  args: { value: 'recent' },
};

export const Rarity: Story = {
  args: { value: 'rarity' },
};

export const Sport: Story = {
  args: { value: 'sport' },
};

export const Name: Story = {
  args: { value: 'name' },
};

// A large collection — shows the count pill with a higher tally.
export const ManyCards: Story = {
  args: { value: 'rarity', totalCount: 248 },
};

// Fully interactive — click a mode and the active pill follows.
export const Interactive: Story = {
  render: (args) => {
    const [mode, setMode] = useState<SortMode>(args.value);
    return <SortControls {...args} value={mode} onChange={setMode} />;
  },
};
