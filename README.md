# Wizstar · Seedance 2.5 landing page

Local, handoff-ready landing page. Structure: hero → creations → capabilities → workflows → how-to → use cases → FAQ → CTA.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Editing map

- `app/page.tsx` — copy, links, section order, placeholders
- `app/globals.css` — visual system and responsive layout
- `public/assets/` — runtime assets
- `materials/source/` — untouched source assets
- `materials/optimized/` — compressed delivery assets
- `materials/prompts/` — generation prompts
- `materials/references/` — screenshots and references
- `docs/PRODUCT_FACTS.md` — verified claims and boundaries
- `docs/ASSET_INVENTORY.md` — asset status
- `HANDOFF.md` — teammate handoff checklist
- `CHANGELOG.md` — human-readable history

## Collaboration rules

1. Use a branch for each meaningful change.
2. Never overwrite source media with compressed exports.
3. Record new claims in `docs/PRODUCT_FACTS.md` with source and date.
4. Use focused commits, such as `feat(hero): add approved launch video`.
5. Never commit API keys or put them in frontend code.

The current version is a complete responsive framework. Labelled visual areas are intentional placeholders until approved Seedance 2.5 media arrives. CTAs open the real Wizstar tool; no generation API is connected.
