# Seedance 2.5 Page · Product Handoff

## Preview

- Same machine: `http://localhost:3001/ai-model/seedance-2-5`
- Same local network: `http://172.26.94.217:3001/ai-model/seedance-2-5`
- Intended production route: `https://wizstar.com/ai-model/seedance-2-5`

The preview is a local development server. It is not a public deployment; use the production route only after the Wizstar web team mounts this page in the official site.

## What Is Ready

- Responsive Seedance 2.5 landing page with Hero, showcase rail, feature chapters, workflows, FAQ, Blog, CTA, and footer.
- Two-row infinite showcase rail with synchronized manual dragging and hover enlargement.
- Local video assets with autoplay muted by default and per-video sound controls.
- Current approved user videos:
  - `public/assets/user-videos/surreal-world.mp4` — Text to Video feature (04)
  - `public/assets/user-videos/lipstick-commerce.mp4` — Wizstar Agents feature (05)
- Blog cards use local covers and link to real Wizstar Seedance 2.5 articles.

## Where Product Can Edit

- `app/page.tsx`: Hero copy, section copy, card labels, Blog entries, FAQ, and the order of sections.
- `app/page.tsx` constants at the top: `referenceUrl`, `keyframeUrl`, `textUrl`, and `canonicalUrl`.
- `app/site-header.tsx`: header navigation, dropdown destinations, sign-in link, and official-site links.
- `app/landing-interactions.tsx`: Hero controls, video behavior, showcase data, drag/loop behavior, and sound buttons.
- `app/globals.css`: layout, spacing, responsive breakpoints, card treatment, and video framing. Scope visual changes to the relevant class or section ID.
- `public/assets/`: runtime images, videos, logos, and Blog covers. Keep original files in `materials/source/` and optimized delivery files in `materials/optimized/`.

## Official-Site Integration

1. Mount the page at `/ai-model/seedance-2-5` in the Wizstar web application.
2. Copy or serve the contents of `public/assets/` from the same origin so `/assets/...` URLs remain valid.
3. Keep the CTA destinations in `app/page.tsx` unless the production router changes them:
   - Reference to Video: `https://wizstar.com/tools/ai_video_generator?tab=reference2video&model=seedance2.5`
   - Keyframe to Video: `https://wizstar.com/tools/ai_video_generator?tab=keyframe2video&model=seedance2.5`
   - Text to Video: `https://wizstar.com/tools/ai_video_generator?tab=text2video&model=seedance2.5`
   - Wizstar Agents: `https://wizstar.com/home`
   - Blog: `https://wizstar.com/blog`
4. Update the canonical URL and indexing policy only in the production deployment. Preview builds should remain `noindex`.
5. Confirm authentication, credit display, and tool routing in the production environment before launch.

## Local Development

```bash
pnpm install
pnpm dev
```

Open `/ai-model/seedance-2-5` on the port printed by the server. The project requires Node.js `>=22.13.0` and pnpm.

## Change Guardrails

- Do not replace approved video framing, sticky feature-card behavior, or the two-row rail without product approval.
- Replace media by changing the `src` value or the matching file in `public/assets/`; do not rename unrelated assets.
- Use real, approved product claims and links. Record new claims in `docs/PRODUCT_FACTS.md`.
- Before production, compress large videos, verify same-origin asset URLs, and check the page at desktop and mobile widths.
