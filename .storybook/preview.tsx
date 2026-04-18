import React from 'react';
import type { Preview } from '@storybook/react';
import { MotionConfig } from 'framer-motion';
import isChromatic from 'chromatic/isChromatic';
import '../src/index.css';

if (isChromatic() && typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--no-motion', '1');
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        ink: { name: 'ink', value: '#05060a' }
      }
    },
  },

  decorators: [
    (Story) => (
      <MotionConfig reducedMotion={isChromatic() ? 'always' : 'never'}>
        <div
          className="bg-ink-950 text-ink-100"
          style={{
            padding: '2rem',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Story />
        </div>
      </MotionConfig>
    ),
  ],

  initialGlobals: {
    backgrounds: {
      value: 'ink'
    }
  }
};

export default preview;
