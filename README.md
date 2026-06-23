# All-Stars Trading Cards

A small React app that showcases digital trading cards for 22 iconic athletes across 11 sports — built as a visual-polish demo for **Storybook** and **Chromatic**.

Cards tilt on hover, morph into a focused modal when clicked, and new cards drop out of animated booster packs with rarity-weighted pulls. Every interesting surface is covered by a Storybook story, and every PR runs Chromatic visual + accessibility checks on CI.

Published Storybook: https://chromatic.com → project `all-star-trading-cards`

## Stack

- **React 18** + **TypeScript** + **Vite 5**
- **Tailwind 3** for styling, **Framer Motion** for physics
- **React Router 6** for the two routes (`/` collection, `/packs` openings)
- **Storybook 10** with `@storybook/addon-a11y` and `@chromatic-com/storybook`
- **Chromatic** for visual regression + accessibility testing on every PR via GitHub Actions

## Getting started

```bash
npm install
npm run dev         # app on http://localhost:5173
npm run storybook   # stories on http://localhost:6006
```

Node 22 (see `.tool-versions` if you use asdf).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server for the app |
| `npm run build` | Type-check + app production build |
| `npm run storybook` | Storybook dev server on port 6006 |
| `npm run build-storybook` | Static Storybook output to `storybook-static/` |
| `npm run chromatic` | Upload latest Storybook to Chromatic (needs `CHROMATIC_PROJECT_TOKEN`) |

## Project layout

```
src/
  components/
    Card/           # the hero component — tilt, foil, flip, rarity badge
    CardGrid/       # responsive grid + sort controls
    CardModal/      # layoutId-driven focus modal
    BoosterPack/    # sealed pack + tear/flash/reveal sequence
  data/
    athletes.ts     # 22 seeded athletes
    types.ts        # Sport, Rarity, Athlete
  hooks/
    useCollection.ts # localStorage-backed collection
    useTilt.ts       # pointer → rotateX/Y via Framer springs
  lib/
    pullCard.ts     # rarity-weighted pack pull logic
  pages/
    CollectionPage.tsx
    PacksPage.tsx
.storybook/         # config
docs/
  STORYBOOK_UPGRADE_NOTES.md  # notes from the 8 → 10 upgrade
```

## Key interactions

- **3D tilt** — pointer position drives `rotateX/Y` through Framer Motion springs; a conic-gradient foil layer tracks the pointer angle, intensified per rarity.
- **Focus modal** — shared `layoutId` between grid card and modal card so the transition morphs the same element into the centered overlay. Grid stays visible and blurred behind it.
- **Booster pack** — state machine: `idle → tearing → flashing → revealing → revealed`. Rarity-scaled flash duration and particle burst (4/8/14/20 particles for common/rare/legendary/mythic). Pulled card is added to the collection via `useCollection`.
- **Collection persistence** — `useCollection` hook reads/writes to `localStorage`; new users get 4 starter cards.

## Roster (22)

Basketball: Stephen Curry, Michael Jordan, LeBron James, Kobe Bryant
Football: Jerry Rice, Tom Brady, Patrick Mahomes
Baseball: Babe Ruth, Shohei Ohtani, Jackie Robinson
Soccer: Lionel Messi, Cristiano Ronaldo, Pelé, Mia Hamm
Tennis: Serena Williams, Roger Federer
Hockey: Wayne Gretzky
Gymnastics: Simone Biles
Boxing: Muhammad Ali
Swimming: Michael Phelps
Track & Field: Usain Bolt
Golf: Tiger Woods

## Chromatic setup

- Addon registered in `.storybook/main.ts`.
- `chromatic.config.json` points at the `build-storybook` script.
- `.github/workflows/chromatic.yml` runs on every push and PR, uploads the Storybook, and Chromatic reports three GitHub checks: **Storybook Publish**, **UI Tests** (visual), and **UI Review**.
- With `@storybook/addon-a11y` installed, every story also runs axe-core — tests carry both `VISUAL` and `ACCESSIBILITY` kinds.

Token is stored as a GitHub Actions secret (`CHROMATIC_PROJECT_TOKEN`) — no plaintext in the repo.
