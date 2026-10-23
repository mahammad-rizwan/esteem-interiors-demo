# Esteem Interiors & Consultants: Website (Design Selection Build)

A React + Vite, frontend-only home page with **8 switchable design themes** and **8 downloadable logo concepts**, built for client selection.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve dist/
```

> Vite is pinned to v6 because Windows Application Control on this machine blocks Vite 8's native `rolldown` binary.

## Reviewing themes & logos

- **Design Studio** (bottom-right pill): ‹ › cycles the themes, and clicking it opens the panel with the Themes and Logos tabs.
- "Use each theme's matching logo" pairs logo N with theme N. Untick it to mix and match.
- Each selection is saved in the URL (`?theme=emerald&logo=crest`). **Share this combo** copies the link for the client.
- The **Brand identity** section near the bottom lists all 8 logos, with SVG/PNG downloads in colour, reverse and icon-only versions.

| # | Theme | Hero layout | Paired logo |
|---|-------|-------------|-------------|
| 1 | Noir & Gold | Cinematic full-bleed slider | Aurum Monogram |
| 2 | Blueprint | Drafting-table split with dimension lines | Blueprint Frame |
| 3 | Terracotta | Arched windows + rotating badge | Heritage Arch |
| 4 | Concrete | Massive type + hazard ticker | Brickwork E |
| 5 | Scandi Oak | Calm centred type + staggered mosaic | Single Line Home |
| 6 | Emerald Heritage | Framed full-bleed + seal | Heritage Crest |
| 7 | Monochrome Editorial | Magazine cover | Editorial Wordmark |
| 8 | Midnight Copper | Glass card over slider | Isometric Cube |

## Project structure

```
src/data/content.js           all copy (from esteeminteriors.in)
src/data/themes.js            the 8 theme definitions
src/data/logos.generated.js   generated: inline logo SVG
src/components/               Nav, Hero (8 variants), Sections, LogoShowcase, Studio
src/styles/base.css           layout & components
src/styles/themes.css         theme tokens, personalities, hero styles
public/img/                   optimised WebP project photos
public/logos/                 generated logo files (SVG + PNG)
source-photos/                raw downloads from the client's Google Drive (not deployed)
scripts/                      build tooling (see below)
```

## Regenerating assets

```bash
node scripts/fetch-fonts.mjs   # download the TTFs used by the logos
node scripts/build-logos.mjs   # logos → public/logos + src/data/logos.generated.js
node scripts/build-images.mjs  # source-photos → public/img (edit PICKS to change selection)
```

Logo text is converted to vector outlines, so the SVG and PNG files render the same everywhere with no fonts installed.

## Notes for the client

- The current site gives two project counts: 500+ in About and FAQ, but 300+ in Why Choose Us. This build uses **500+**. Please confirm the right figure.
- The consultation form is frontend-only. It opens WhatsApp (+91 81473 67609) with the details pre-filled.
- The Facebook link is a placeholder because the current site has no page URL.
- Client brand names appear as text. Their logos were not reused.
