# AIGC Video Research · Chat Notes

This note preserves the reusable decisions from the product-research conversation. It is a summary, not a verbatim chat export.

## 1. Controlled AIGC Video Comparison

The goal is to compare several AI video products across the full experience: prompt entry, controls, generation process, output quality, and revision cost.

Use two prompt levels for the same creative brief:

- **Simple prompt:** tests the product's autonomous interpretation and creative decision-making.
- **Professional prompt:** tests instruction following, timing, continuity, camera direction, text rendering, sound, and negative constraints.

Keep the comparison fair:

- Use the same prompt, duration, aspect ratio, resolution, source assets, and default model where possible.
- Generate at least three samples per product and prompt level to reduce randomness.
- Record generation time, queue time, credit cost, failures, retries, and manual post-production required.
- Score instruction adherence, chronology, visual continuity, physical realism, image quality, motion, captions, sound, and controllability.

### Simple hamburger prompt

> Make a 20-second promotional-style video showing how a hamburger is made, from raw ingredients to the finished burger. Show the full process: ingredients, prep, cooking, assembling, and final hero shot. Make it premium, appetizing, and fast-paced. Use a 9:16 vertical format with English captions.

### Professional hamburger prompt structure

The professional version should retain the following controls without becoming repetitive:

- Exact duration and 9:16 format.
- Premium commercial food style, warm high-contrast lighting, realistic textures, and fast rhythmic editing.
- Fixed timeline: ingredients (0–3s), preparation (3–6s), cooking (6–11s), assembly (11–16s), hero shot (16–20s).
- Explicit ingredients and assembly order to test continuity.
- Camera language: overhead preparation shots, macro food close-ups, and a low-angle hero shot.
- English captions, commercial music, realistic cooking effects, and no voice-over.
- Negative constraints covering deformed hands, morphing or duplicated ingredients, unreadable text, flicker, abrupt cuts, and inconsistent product appearance.

## 2. Homepage Product Video Direction

For the referenced BYOMA Hydrating Milky Toner, the homepage video is a product-display hero, not an explainer or tutorial.

Brand interpretation:

- Youthful, energetic, optimistic, and science-led skin-barrier care.
- Bright and playful clinical styling rather than dark, traditional luxury.
- Coral-orange packaging and purple graphics remain the primary visual identity.

Recommended execution:

- 8-second seamless loop, 16:9 landscape, intended for a website hero banner.
- Preserve the reference bottle, proportions, color, logo, and packaging; do not regenerate printed text.
- Start with a macro detail, pull back to reveal the full bottle, add a subtle camera orbit, and finish in a centered hero composition.
- Keep the bottle and logo in the central mobile-safe area and leave negative space for HTML headline and CTA overlays.
- Do not ask the video model to generate page copy, buttons, claims, or other interface text.

### Layered background system

- **Foreground:** softly defocused translucent bubbles and curved glass-like forms.
- **Midground:** glossy milky-white liquid ribbons flowing around the base and behind the bottle.
- **Background:** translucent gel membranes inspired by the skin barrier, frosted acrylic blocks, water droplets, and restrained coral/purple geometry.
- **Surface:** pale glossy platform with subtle reflections and gentle ripples.
- Use different movement speeds to create parallax, while ensuring no element covers the product logo.

Avoid flowers, leaves, fruit, laboratory equipment, unrelated decoration, extra products, people, hands, visual clutter, packaging deformation, warped logos, flicker, or unnatural liquid motion.

## 3. Backlinks and New-Site SEO

A backlink is a link from another website to the target website. Search engines may treat relevant, trustworthy backlinks as evidence of authority, while the links can also generate referral traffic.

“Build a few dozen foundational links” for a new website means gradually establishing legitimate brand references, not buying or mass-producing links. Examples include official social profiles, reputable business listings, partner or distributor pages, industry associations, real product reviews, interviews, launch platforms, and relevant editorial coverage.

Important qualification: there is no required backlink quota. A smaller number of authentic, relevant links is preferable to large volumes of unrelated directory, forum, comment, or link-farm placements.

## 4. AI Video Workflow Idea · Memory Boundary

The user previously shared a Reddit post about turning AI video generation into a workflow and wanted to adapt that approach to the user's own product. The remembered blocker was the absence of a usable product API.

The current accessible chat does **not** contain the original Reddit URL, post text, workflow diagram, named tools, exact steps, or the specific product/API discussed. Those details must be recovered from the earlier task or supplied again before they are treated as project facts.
