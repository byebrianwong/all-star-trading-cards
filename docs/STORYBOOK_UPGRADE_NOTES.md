# Storybook 8 → 10 upgrade notes

Written live while upgrading a working Storybook 8.6.18 setup (React 18 + Vite 5 + Tailwind 3 + Framer Motion + `@storybook/addon-a11y` + `@chromatic-com/storybook`) to the latest Storybook (10.3.5). Intended as candid feedback for the Storybook team on where the path friction is for AI agents (and humans) attempting this upgrade cold.

**Total time:** ~4 minutes of execution, ~90% of which was `npm install`. No code changes required in stories or components.

## Starting state

```
storybook                    ^8.6.18
@storybook/react-vite        ^8.6.18
@storybook/addon-essentials  ^8.6.14
@storybook/addon-a11y        ^8.6.18
@storybook/blocks            ^8.6.14
@chromatic-com/storybook     ^3.2.7
chromatic                    ^16.3.0
```

`npm view storybook version` → `10.3.5` at time of upgrade.

Two config files:
- `.storybook/main.ts` — stories glob, addons array, `typescript.reactDocgen`.
- `.storybook/preview.tsx` — imports `../src/index.css`, `backgrounds` parameter with `{ default, values: [...] }`, `MotionConfig reducedMotion` decorator keyed on `isChromatic()`.

Stories: 2 components (`Card`, `RarityBadge`), 13 stories total, all CSF3 (`meta.component` + named exports). Nothing imported from `@storybook/blocks`.

## What ran automatically

`npx storybook@latest upgrade --yes` ran three codemods:

1. **`addon-globals-api`** — rewrote `backgrounds` parameter in `preview.tsx` from the old `{ default, values }` shape to the new globals-aware `{ options }` + `initialGlobals.backgrounds.value` shape.
2. **`consolidated-imports`** — no user-code changes needed (we didn't import from the dropped legacy packages), but the codemod still ran green.
3. **`remove-essential-addons`** — removed `@storybook/addon-essentials` from the addons array and installed + added `@storybook/addon-docs` in its place.

Also bumped:
- `storybook` 8.6.18 → 10.3.5
- `@storybook/react-vite` 8.6.18 → 10.3.5
- `@storybook/addon-a11y` 8.6.18 → 10.3.5
- `@chromatic-com/storybook` 3.2.7 → 5.1.2

## Friction points

### 1. `@storybook/blocks` was left behind, but incompatible

The upgrade flagged this via `storybook doctor`:

> `@storybook/blocks@8.6.14 which depends on ^8.6.14` — incompatible with Storybook 10.3.5.

But:
- The codemod **did not remove it** from `package.json` automatically.
- The doctor's suggested action is vague: "*Please consider updating your packages or contacting the maintainers*."
- The linked issue (storybook/32836) is an "Incompatible Packages" meta-tracker rather than a clear action item for this specific case.

For an agent, the correct resolution isn't obvious. In fact there is no `@storybook/blocks@10.x` — the package was **merged into core** (`import { Meta, Canvas, ... } from 'storybook/blocks'`). The correct action is `npm uninstall @storybook/blocks`, but nothing in the output says that in plain words.

**Suggested improvement:** when `storybook doctor` detects `@storybook/blocks` specifically, print a bespoke message like:

> `@storybook/blocks` has been merged into core `storybook` in v10. Remove it with `npm uninstall @storybook/blocks` and update imports to `from 'storybook/blocks'`.

Or offer an explicit automigration that removes it (after scanning for imports).

### 2. Nothing told me my Storybook dev server was ready in a machine-readable way

Running `storybook dev` prints a start banner, but there's no stable stdout signal ("ready on port N") that an automated harness can listen for. I had to resort to:

```bash
curl -s http://localhost:6006/index.json | python3 -c "..."
```

...to confirm stories were being served. The first-render HTML is returned well before stories are compiled, so HTTP 200 on `/` isn't enough. A machine-readable `ready` log line would make this much more reliable for agents spinning up Storybook in CI or preview harnesses.

### 3. The `backgrounds` parameter migration preserves meaning but feels terse

The codemod rewrote:

```ts
// before
backgrounds: {
  default: 'ink',
  values: [{ name: 'ink', value: '#05060a' }],
}
```

to:

```ts
// after
backgrounds: { options: { ink: { name: 'ink', value: '#05060a' } } }
// plus a new top-level:
initialGlobals: { backgrounds: { value: 'ink' } }
```

Functionally correct, but:
- The object-keyed `options` map loses the intuitive `values: [...]` shape that made it obvious this was a list.
- There's no inline comment or link to the rationale. The link to the MIGRATION.md entry is in the terminal output, but it doesn't survive into the rewritten file. A `// @see storybook/MIGRATION.md#viewportbackgrounds-...` comment on the rewritten block would help future readers.

### 4. `@chromatic-com/storybook` major bump 3 → 5 with no changelog surfaced

The upgrade bumped `@chromatic-com/storybook` across **two majors** (3.2.7 → 5.1.2) silently. No breaking-change note, no link to Chromatic's changelog, nothing in the upgrade output indicating that a non-Storybook dependency just made a huge jump. This is a third-party package but it's surfaced as part of the Storybook toolchain.

**Suggested improvement:** surface major-version bumps on any Storybook-ecosystem package (including `@chromatic-com/*`) with an explicit prompt or at least a grouped summary at the end of the upgrade.

### 5. Reasonable things the codemod handled cleanly (credit where due)

- `addon-essentials` → `addon-docs` swap was perfectly automatic. Zero manual action.
- React 18 + Vite 5 combo worked unmodified.
- All 13 existing stories rendered without a single code change.
- axe-core (for `addon-a11y`) showed up in the built bundle as expected — a11y still works post-upgrade.
- Tailwind CSS imported via `preview.tsx` still applies to story canvases.
- Framer Motion decorator + `isChromatic()` motion-reduction still works.

## Post-upgrade state

```
storybook                    ^10.3.5
@storybook/react-vite        ^10.3.5
@storybook/addon-a11y        ^10.3.5
@storybook/addon-docs        ^10.3.5     (new — replaces addon-essentials)
@chromatic-com/storybook     ^5.1.2      (major bump from 3.x)
chromatic                    ^16.3.0     (unchanged)
```

Removed: `@storybook/addon-essentials`, `@storybook/blocks` (manual).

Verified working:
- `npm run build-storybook` → succeeds, 15 entries built (13 stories + 2 auto-docs).
- `npm run storybook` → dev server serves all 15 entries on port 6006.
- `npm run build` → app production build unaffected.
- `@storybook/addon-a11y` axe-core bundle present in the built output.

## tl;dr for the Storybook team

**What worked great:** CSF3 stories needed zero changes. Three automigrations ran silently and correctly. Total human intervention was one `npm uninstall`.

**What would improve the agent experience:**
1. When `@storybook/blocks` is detected post-upgrade, tell the user (or agent) *exactly* what to do instead of pointing to a generic tracking issue.
2. Emit a stable machine-readable "Storybook ready on :6006" log line so automation can reliably proceed without resorting to polling `/index.json`.
3. When non-Storybook packages in the ecosystem (e.g., `@chromatic-com/storybook`) get bumped across majors, flag it explicitly in the upgrade summary.
4. Leave a `@see` comment on codemod-rewritten parameters pointing to the relevant MIGRATION.md entry.
