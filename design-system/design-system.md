# Arqivea Design System

This document is the working Markdown version of the Arqivea design system.

[View the original PDF](./Arqivea Design System.pdf)

## 1. Design standard

### 1.1 System goals
- Provide a unified visual and interactive language for Discovery, Route Planner, and Footprint across multiple museums.
- Balance an academic / archival feel with moments of playful, narrative energy in Footprint and sharing flows.
- Use a small, consistent set of colors and components that scale from low-fidelity prototypes to production UI in Next.js.
- Meet WCAG 2.1 Level AA color contrast requirements: at least 4.5:1 for body text and 3:1 for large text and UI elements.

### 1.2 Design principles
1. **Calm canvas, vivid stories**  
   Keep the overall UI quiet and neutral (soft whites and greys) and let artwork details, footprints, and share cards carry the visual drama.

2. **Information first, narrative second**  
   Prioritize clear information structure (search, filters, lists, route details, maps) and layer narratives and anecdotes in clearly defined secondary areas.

3. **List + overlay to keep the flow**  
   Favor list + overlay / modal patterns over hard page transitions so users can explore artworks, details, and routes without losing context.

4. **Routes as collections, footprints as memories**  
   Route flows emphasize clarity and efficiency; Footprint and sharing flows emphasize personal memory, travel, and achievement with warmer visual accents.

### 1.3 Accessibility standard
- For body text, ensure foreground vs background contrast ratio ≥ 4.5:1 (WCAG AA).
- For large text (≥ 18 px regular or ≥ 14 px bold) and essential UI icons / shapes, ensure contrast ratio ≥ 3:1.
- Do not rely on color alone to convey meaning; always pair color with iconography and/or text.

## 2. Design tokens

This system is semantic-first: components reference semantic tokens such as `color-text-primary` and `color-bg-page` instead of raw hex values.

### 2.1 Color tokens

#### 2.1.1 Background & surface

| Token name | Description | HEX |
|---|---|---|
| color-bg-page | Global page background | #F4F4F2 |
| color-surface-default | Default card / panel background | #E8E8E8 |
| color-surface-soft-warm | Soft warm background (stories, hints, empty states) | #F6F7D3 |
| color-surface-soft-cool | Soft cool background / Footprint main background | #CAE4DB |

#### 2.1.2 Text

| Token name | Description | HEX |
|---|---|---|
| color-text-primary | Primary body text / main headings | #333333 |
| color-text-secondary | Secondary text / meta information | #495464 |
| color-text-strong | Emphasis, links, key numerical values | #333C4A |
| color-text-inverse | Text on dark surfaces (buttons, banners) | #F4F4F2 |
| color-text-muted | Disabled text, placeholders, weak dividers | #BBBFCA |

#### Guidance
- Use `color-text-primary` for most body copy and key headings.
- Use `color-text-secondary` for metadata (dates, “3 stops”, durations) and helper text.
- Use `color-text-strong` for emphasis and interactive text (links), preferably with additional affordances such as underline or hover states.
- Use `color-text-muted` only for non-essential information.

#### 2.1.3 Actions & functional colors

| Token name | Description | HEX |
|---|---|---|
| color-action-primary | Primary actions (CTAs, primary links) | #495464 |
| color-action-primary-text | Text on primary actions | #F4F4F2 |
| color-action-primary-hover | Hover state for primary actions | #495464 with adjusted lightness |

#### 2.1.4 Emotive colors

| Token name | Description | HEX |
|---|---|---|
| color-footprint-bg | Footmap background / footprint cards | #CAE4DB |
| color-footprint-highlight | Route lines, map markers, key labels | #00303F |
| color-share-highlight | Sharing accents (badges, share chips, card strips) | #CDAC81 |

Emotive colors are shared across Discovery, Route Planner, and Footprint, but used with different densities. Discovery and Route Planner keep a predominantly neutral, functional look; Footprint concentrates accent colors on completed routes and share artifacts, not on structural chrome.

##### Usage across features

- **Discovery**
  - Keep the page and cards neutral (`color-bg-page`, `color-surface-default`).
  - Use accent colors only for small, local elements:
    - Artwork detail overlay: a thin top border or divider in `color-surface-soft-warm` or `color-share-highlight`.
    - Filter / tag selected states: background in `color-surface-soft-warm` or `color-footprint-bg`, text in `color-text-strong`.
  - Never tint large page sections with accent colors; artworks themselves provide the main visual color.

- **Route Planner**
  - Use neutrals for the overall layout; introduce accents in route-specific UI:
    - Summary bar for the current route: optional soft background using `color-surface-soft-warm` to indicate an active plan.
    - Time and distance pills between museums: background `color-footprint-bg` to visually connect planning with footprints.
    - Route status labels: Planning uses neutral greys; Completed uses `color-share-highlight` as background with `color-text-strong` text.

- **Footprint**
  - Keep the page background neutral (`color-bg-page`) to stay consistent with other sections.
  - Use `color-footprint-bg` primarily for the world map / footprint map container and specific footprint cards, with `color-footprint-highlight` for route lines and markers.
  - Left-hand route list remains neutral (`color-surface-default` + greys), using `color-share-highlight` only on completion / shared badges.
  - The visual share card is where accent colors can be richest, while the surrounding modal chrome stays neutral.

### 2.2 Spacing, radius, elevation (v1)

You can start with a minimal but consistent token set and expand later.

#### 2.2.1 Spacing
- `space-4 = 4px`
- `space-8 = 8px`
- `space-12 = 12px`
- `space-16 = 16px`
- `space-24 = 24px`
- `space-32 = 32px`

Typical usage:
- Inner padding of components: 8 / 12 / 16
- Gaps between components in a section: 16 / 24
- Vertical rhythm between page sections: 24 / 32

#### 2.2.2 Radius
- `radius-sm = 4px` — tags, small buttons
- `radius-md = 8px` — cards, medium containers
- `radius-lg = 16px` — large containers, modals

#### 2.2.3 Elevation / shadows
- `shadow-none` — flat surfaces, basic cards
- `shadow-soft` — subtle elevation for hover states and tooltips
- `shadow-strong` — modals and high-priority overlays

### 2.3 Typography tokens

#### 2.3.1 Font families
- `font-family-base`: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- `font-family-display` (optional): Reserved for brand marks, logotype, and occasional large titles once the brand typeface is defined

#### 2.3.2 Primitive typography tokens

**Font weights**
- `font-weight-regular = 400`
- `font-weight-medium = 500`
- `font-weight-semibold = 600`

**Font sizes**
- `font-size-12`
- `font-size-14`
- `font-size-16`
- `font-size-20`
- `font-size-24`
- `font-size-32`

**Line heights**
- `line-height-tight = 1.2`
- `line-height-normal = 1.4`
- `line-height-relaxed = 1.6`

#### 2.3.3 Semantic text styles

| Token name | Usage | Spec (example) |
|---|---|---|
| type-heading-xl | Page titles (“Route Planner”, “Archive”) | base family, 32px, lh 1.2, weight semibold, text-primary |
| type-heading-l | Section titles (“Your routes: 2”) | 24px, lh 1.3, weight semibold, text-primary |
| type-heading-m | Card titles (route names, artwork titles) | 18–20px, lh 1.3, weight medium, text-primary |
| type-body | Body copy (academic notes, stories) | 16px, lh 1.6, weight regular, text-primary |
| type-body-small | Secondary body / helper text | 14px, lh 1.5, weight regular, text-secondary |
| type-caption | Metadata (dates, stops count, status) | 12–13px, lh 1.4, weight regular, text-secondary |
| type-button | Button text | 14–16px, lh 1.2, weight medium, text-inverse or text-strong |

## 3. Component standard

### 3.1 Global component rules
- Components must use semantic tokens only (`color-bg-page`, `color-text-primary`, `color-action-primary`, etc.); no hard-coded hex values inside component definitions.
- Each interactive component must define a full state matrix: `default / hover / active / disabled / focus`, and show it in documentation.
- Visual state changes should primarily use contrast and lightness shifts rather than introducing many new hues.
- Focus states must be clearly visible, for example via a consistent focus ring token based on `color-text-strong`.

### 3.2 Key base components

#### 3.2.1 Button (Primary / Secondary / Ghost)
- **Purpose:** Trigger main actions (add to route, create route, share).
- **Variants:** Primary, Secondary, Ghost.
- **Anatomy:** container, label, optional leading / trailing icon.

**Color tokens**
- Primary: `background = color-action-primary`, `text = color-action-primary-text`
- Disabled: `background = color-surface-default`, `text = color-text-muted`

**States**
- Hover: use `color-action-primary-hover`
- Active: slightly darker than primary
- Focus: add a visible outline using `color-text-strong`

#### 3.2.2 Tag / Chip
- **Purpose:** Artwork tags (Spain / Modern / Oil), filters, route status labels.
- **Variants:** default, selected, disabled.

**Color tokens**
- Default: `bg = color-surface-default`, `text = color-text-secondary`
- Selected: `bg = color-surface-soft-cool` or `color-surface-soft-warm`, `text = color-text-strong`

#### 3.2.3 Card
- **Purpose:** Route cards, footprint cards, artwork list items.
- **Anatomy:** container, title area, meta area (date, stops, status), optional actions (Share).

**Color tokens**
- Standard card: `bg = color-surface-default`, `title = color-text-primary`, `meta = color-text-secondary`
- Footprint card: `bg = color-footprint-bg`, `title = color-footprint-highlight` or `color-text-primary`

**Interaction**
- Hover adds `shadow-soft` and optional border emphasis.

#### 3.2.4 Overlay / Modal
- **Purpose:** Artwork details, “Share your visit” dialog.
- **Layout:** centered fixed-width container over a semi-transparent scrim.

**Color tokens**
- Scrim: black with ~40–60% opacity
- Container: `bg = color-surface-default`, `title/body = color-text-primary`, `secondary info = color-text-secondary`

#### 3.2.5 Stepper / Route Wizard
- **Purpose:** Multi-step route creation (fill details → select artworks → review & confirm).
- **Anatomy:** step indicators, connecting lines, content area, Prev / Next buttons.

**Color tokens**
- Current step: `color-action-primary`
- Completed steps: `color-text-secondary` / muted accent

#### 3.2.6 Map Panel (City map & floor plan)
- **Purpose:** Show between-museum routes on a city map and in-museum floor plans.
- **Anatomy:** base map, route paths, markers, side list.

**Color tokens**
- Route line and active markers: `color-footprint-highlight`
- Background: `color-footprint-bg` (for Footprint view) or neutral background for planning view

## 4. Page patterns

Page patterns describe how components are composed into layout templates for key flows.

### 4.1 Discovery — List + overlay
- **Layout**
  - Top: search bar + filter area (optional soft cool background)
  - Middle: artwork cards grid / list (`color-surface-default`)
  - Interaction: clicking a card opens an Artwork Detail Overlay instead of full-page navigation

- **Key components**
  - Search
  - Filter chips
  - Artwork card
  - Artwork detail overlay
  - “Add to route planner” button

### 4.2 Route Planner — Sidebar + content + map / floor plan
- **Layout**
  - Left: routes list (cards)
  - Center: current route’s stops list (museum segments, artworks)
  - Right: city map or floor plan (Map Panel)

- **Color usage**
  - Page bg = `color-bg-page`, cards bg = `color-surface-default`
  - Selected museum / artwork may use `color-surface-soft-cool` or `color-surface-soft-warm` as highlight

### 4.3 Footprint — Completed routes + world map + sharing
- **Layout**
  - Left: completed routes list with Share actions (cards)
  - Right: world map Footmap (`bg = color-footprint-bg`, routes = `color-footprint-highlight`)

- **Share flow**
  - “Share” opens a modal showing a visual card (route illustration) plus a text block; primary CTA button uses `color-action-primary`

- **Visual intent**
  - Reserve `color-footprint-bg` and `color-share-highlight` mostly for this area to make Footprint feel like a distinct personal archive

## Appendix

### Accessibility Check Result

The original visual accessibility check and palette selections are preserved in the PDF version of this document.

[Open the PDF version](./Arqivea Design System.pdf)