import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { ATHLETES } from '@/data/athletes';

// Whole-app stories. App owns the router and reads the collection from
// localStorage (via useCollection), so each story is wrapped in a MemoryRouter
// and seeds/clears localStorage in `beforeEach` to stay deterministic.
const STORAGE_KEY = 'all-stars:collection-v1';
const BASE = 1_700_000_000_000;

function seed(ids: string[], counts: Record<string, number> = {}) {
  const entries = ids.map((athleteId, i) => ({
    athleteId,
    acquiredAt: BASE + i * 1000,
    count: counts[athleteId] ?? 1,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries }));
}

const meta: Meta<typeof App> = {
  title: 'App/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  // Start every story from a clean collection (App falls back to the starter
  // set when storage is empty) so snapshots don't leak state between stories.
  beforeEach: async () => {
    localStorage.removeItem(STORAGE_KEY);
    return () => localStorage.removeItem(STORAGE_KEY);
  },
  decorators: [
    (Story, context) => (
      <MemoryRouter initialEntries={[(context.parameters.route as string) ?? '/']}>
        <div style={{ width: '100%' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof App>;

// Default landing: the four-card starter collection on the Collection route.
export const Collection: Story = {
  parameters: { route: '/' },
};

// A fuller collection: every athlete, with a few duplicates to show the badge.
export const FullCollection: Story = {
  parameters: { route: '/' },
  beforeEach: async () => {
    seed(
      ATHLETES.map((a) => a.id),
      { 'steph-curry': 3, 'lebron-james': 2, 'patrick-mahomes': 2 },
    );
    return () => localStorage.removeItem(STORAGE_KEY);
  },
};

// The Packs route — standard vs. premium pack selection.
export const Packs: Story = {
  parameters: { route: '/packs' },
};
