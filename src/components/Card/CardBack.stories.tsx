import type { Meta, StoryObj, Decorator } from '@storybook/react';
import { CardBack } from './CardBack';

// CardBack is the shared "circle design" reverse face — the holo emblem, the
// nested frames and the All-Stars wordmark. It takes no props and fills its
// parent, so every story renders it inside a card-sized frame.
const frame =
  (size: { w: string; h: string }): Decorator =>
  (Story) => (
    <div
      style={{ width: size.w, height: size.h }}
      className="rounded-[22px] shadow-card overflow-hidden"
    >
      <Story />
    </div>
  );

const SM = { w: '14rem', h: '20rem' };
const MD = { w: '18rem', h: '26rem' };
const LG = { w: '20rem', h: '28rem' };

const meta: Meta<typeof CardBack> = {
  title: 'Card/CardBack',
  component: CardBack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CardBack>;

export const Default: Story = {
  decorators: [frame(MD)],
};

export const Small: Story = {
  decorators: [frame(SM)],
};

export const Large: Story = {
  decorators: [frame(LG)],
};

// The reverse face at every Card size, framed side by side.
export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {[SM, MD, LG].map((size) => (
        <div
          key={size.w}
          style={{ width: size.w, height: size.h }}
          className="rounded-[22px] shadow-card overflow-hidden"
        >
          <CardBack />
        </div>
      ))}
    </div>
  ),
};
