import type { Meta, StoryObj } from '@storybook/react';
import { Pack } from './Pack';

const meta: Meta<typeof Pack> = {
  title: 'BoosterPack/Pack',
  component: Pack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    packType: { control: 'radio', options: ['standard', 'premium'] },
    interactive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Pack>;

export const Standard: Story = {
  args: { packType: 'standard' },
};

export const Premium: Story = {
  args: { packType: 'premium' },
};

// Non-interactive packs render in the tear/reveal sequence (no hover, no click).
export const NonInteractive: Story = {
  args: { packType: 'premium', interactive: false },
};

export const BothPacks: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '3rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <Pack packType="standard" interactive={false} />
      <Pack packType="premium" interactive={false} />
    </div>
  ),
};
