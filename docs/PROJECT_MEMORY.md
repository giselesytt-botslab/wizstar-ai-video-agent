# Wizstar Seedance 2.5 Page · Project Memory

This document records the current approved page state so the project can be edited directly from source without relying on a previous chat or a generated build.

## Identity

- Project: Wizstar Seedance 2.5 AI video landing page
- Source directory: `/Users/giselezhang/Documents/Codex/2026-08-27/new-chat-3`
- Page route: `/ai-model/seedance-2-5`
- Intended production URL: `https://wizstar.com/ai-model/seedance-2-5`
- Current local preview: `http://localhost:3001/ai-model/seedance-2-5`
- Cloudflare/OpenAI Sites project binding: `.openai/hosting.json`

## Page Order

1. Header and official Wizstar navigation
2. Hero workspace for Reference, Keyframe, and Text modes
3. Two-row Seedance 2.5 showcase rail
4. Core feature summary
5. Five sticky feature chapters
6. Three-step workflow section
7. Use-case cards
8. Practical tips
9. Seedance 2.5 Blog articles
10. FAQ, testimonials, final CTA, and footer

## Source Ownership

- `app/page.tsx`: page copy, section order, feature cards, Blog cards, FAQ, structured data, and CTA constants.
- `app/site-header.tsx`: header navigation, dropdown menus, logo destination, sign-in destination, and official-site links.
- `app/landing-interactions.tsx`: Hero mode controls, `SoundVideo`, showcase data, two-row rail, synchronized dragging, infinite looping, hover enlargement, and audio toggles.
- `app/globals.css`: all visual styling, responsive behavior, spacing, card stacking, video framing, and section transitions.
- `public/assets/`: runtime assets served from the same origin as the page.
- `materials/source/`: original source material.
- `materials/optimized/`: delivery/compressed material.
- `docs/`: factual claims, asset records, page blueprint, handoff, and this project memory.

## Current Interaction Contract

- Showcase has two continuous rows and six video positions, with duplicate loop items to avoid an empty tail.
- Dragging either row synchronizes the other row.
- Hover enlarges a showcase video; the expanded video has no added blue frame or shadow.
- Showcase sound buttons are hidden until hover/focus and live in the video's upper-right corner.
- Hero, showcase, and feature videos autoplay muted, loop, and expose a clickable sound toggle.
- Feature chapters use desktop sticky stacking and return to normal flow on smaller screens.
- Chapter 04 uses `surreal-world.mp4` as a landscape 16:9 video.
- Chapter 05 uses `lipstick-commerce.mp4` as a portrait video without side letterboxing.
- The Hero title is the long-tail phrase `Seedance 2.5 AI Video Generator with Audio Online`, intentionally displayed across two lines.

## Media Map

- Hero and Chapter 01: `public/assets/seedance-showcase-01.mp4`
- Showcase rail: `public/assets/seedance-showcase-02.mp4`, `showcase-architecture.mp4`, `showcase-perfume-ad.mp4`, `seedance-hero-main.mp4`, `showcase-food-making.mp4`, `showcase-character-consistency.mp4`
- Chapter 02 output: `public/assets/reference-dungeon-result.mp4`
- Chapter 03 output: `public/assets/keyframe-football-result.mp4`
- Chapter 04 output: `public/assets/user-videos/surreal-world.mp4`
- Chapter 05 output: `public/assets/user-videos/lipstick-commerce.mp4`
- Official Wizstar logo: `public/assets/wizstar-logo.png`
- Seedance model mark: `public/assets/seedance-model-mark.svg`
- Blog covers: `public/assets/blog/seedance-marketing-teams.png`, `seedance-explained.png`, `seedance-brand-workflows.png`

## Official Destinations

- Reference to Video: `https://wizstar.com/tools/ai_video_generator?tab=reference2video&model=seedance2.5`
- Keyframe to Video: `https://wizstar.com/tools/ai_video_generator?tab=keyframe2video&model=seedance2.5`
- Text to Video: `https://wizstar.com/tools/ai_video_generator?tab=text2video&model=seedance2.5`
- Wizstar Agents: `https://wizstar.com/home`
- Blog: `https://wizstar.com/blog`
- Header and footer destinations are defined in `app/site-header.tsx` and `app/page.tsx`.

## Visual Constraints To Preserve

- Do not reintroduce outer borders around the showcase hover layer.
- Do not add divider lines or hard color bands between page parts.
- Do not change the five-card sticky relationship when editing an individual chapter.
- Do not crop supplied portrait or landscape videos to a different orientation.
- Keep text and sound controls inside their own media regions.
- Scope CSS changes to the relevant class or section ID because `app/globals.css` contains layered overrides.

## Editable Data Model

Showcase cards are data objects in `workShowcases` in `app/page.tsx`, each with `eyebrow`, `title`, `description`, `tags`, `tone`, `src`, and `alt`. Feature media is declared directly in the five `.feature-row` articles. CTA URLs are constants near the top of `app/page.tsx`. Blog cards are the three articles in the `insights` section.

## Publishing State

The source is complete and editable. The current preview is local; no production deployment or public DNS change has been made in this project. Production ownership remains with the Wizstar site repository and its deployment credentials.
