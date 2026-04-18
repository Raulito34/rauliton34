# Design System — Sun Art Center (선아트센터)

## 1. Visual Theme & Atmosphere

Sun Art Center's website is a digital white cube — a space where architecture recedes and art breathes. The design philosophy mirrors the physical gallery: walls exist to hold art, floors exist to guide visitors, and everything else disappears. The interface is invisible; the content is the experience.

The aesthetic sits at the intersection of Korean restraint and contemporary gallery culture. Rather than mimicking a museum database or an e-commerce store, the site feels like walking through a carefully curated space — each page is a room, each scroll reveals a new wall. The dominant impression is **stillness**: generous margins, unhurried typography, and photographs that occupy the full attention of the viewer.

The color system is deliberately monochromatic — warm off-white backgrounds (`#FAFAF8`) paired with near-black text (`#1A1A1A`). This is not sterile white; the warm ivory undertone recalls hanji (한지, traditional Korean paper) and the plaster walls of the gallery itself. A single accent — a warm charcoal (`#3A3A3A`) — provides subtle emphasis without competing with artwork. Color is reserved for the art in exhibition photographs; the interface never introduces chromatic competition.

Typography uses Jost for the brand identity (a geometric sans-serif with Futura DNA — architectural, precise) and Inter + Noto Sans KR for body text (optimized for screen readability in both Latin and Korean scripts). Headings are set light and large — weight 300 at generous sizes — creating an editorial atmosphere where type floats rather than shouts. The Korean body text in Noto Sans KR at weight 400 ensures perfect legibility for detailed rental information and exhibition descriptions.

**Key Characteristics:**
- Warm white cube: off-white (`#FAFAF8`) backgrounds that evoke gallery plaster and hanji
- Monochromatic palette — interface never competes with exhibition photography
- Light-weight, large typography — editorial, not commercial
- Full-bleed exhibition photography as hero moments
- Generous whitespace as a design element, not empty space
- Asymmetric layouts that mirror physical gallery wall arrangements
- Subtle dividers (1px, 10% opacity) — the thinnest possible structural lines
- Smooth scroll-triggered reveals — content appears as you walk through the space

## 2. Color Palette & Roles

### Primary
- **Gallery White** (`#FAFAF8`): Primary page background. Not pure white — a warm ivory that prevents screen fatigue and references natural gallery walls.
- **Ink Black** (`#1A1A1A`): Primary text color. Warmer than pure black, comfortable for extended reading of Korean and Latin text.

### Secondary
- **Warm Charcoal** (`#3A3A3A`): Secondary text, subheadings, emphasis elements. A restrained mid-tone.
- **Stone Gray** (`#6B6B6B`): Tertiary text — captions, metadata, dates, floor specs.
- **Mist Gray** (`#B0B0B0`): Disabled states, placeholder text, decorative elements at rest.

### Surface
- **Light Warm** (`#F2F1ED`): Alternate section backgrounds, card surfaces. Slightly darker than Gallery White for depth.
- **Deep Black** (`#111111`): Dark section backgrounds — used sparingly for contrast moments (hero, footer).
- **Soft Divide** (`rgba(26, 26, 26, 0.10)`): Divider lines — barely visible, structural only.

### Interactive
- **Action Black** (`#1A1A1A`): Primary button fill, active link underlines.
- **Action Hover** (`#3A3A3A`): Button hover state — softens from full black.
- **Focus Ring** (`#1A1A1A`): 2px solid outline for keyboard focus, offset 2px.

### Exhibition Accent (contextual)
- Exhibition pages may derive a single accent color from the featured artwork. This accent appears only in the exhibition detail page — never in navigation, footer, or other pages. Default: Ink Black.

## 3. Typography Rules

### Font Families
- **Brand / Display**: `Jost`, fallbacks: `Futura, Century Gothic, sans-serif`
- **Body (Latin)**: `Inter`, fallbacks: `Helvetica Neue, Arial, sans-serif`
- **Body (Korean)**: `Noto Sans KR`, fallbacks: `Apple SD Gothic Neo, Malgun Gothic, sans-serif`
- **Combined stack**: `Inter, Noto Sans KR, sans-serif` (browser selects per glyph)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Brand Logo | Jost | 18px (1.125rem) | 400 | 1.00 | 3px | `text-transform: uppercase`, tracked wide |
| Display Hero | Jost | 64px (4.00rem) | 300 | 1.10 | -0.5px | Light weight, cinematic. Mobile: 40px |
| Section Number | Jost | 14px (0.875rem) | 400 | 1.00 | 2px | `text-transform: uppercase`, "01", "02" |
| Section Title | Jost | 36px (2.25rem) | 300 | 1.20 | 0.5px | `text-transform: uppercase`. Mobile: 28px |
| Page Title | Jost | 48px (3.00rem) | 300 | 1.15 | 0px | Subpage hero. Mobile: 32px |
| Sub-heading | Inter / Noto Sans KR | 20px (1.25rem) | 500 | 1.50 | 0px | Section intros, key info |
| Body | Inter / Noto Sans KR | 16px (1.00rem) | 400 | 1.70 | 0px | Standard reading text |
| Body Small | Inter / Noto Sans KR | 14px (0.875rem) | 400 | 1.60 | 0px | Captions, metadata |
| Spec Label | Inter | 12px (0.75rem) | 500 | 1.00 | 1.5px | `text-transform: uppercase`, "120㎡ · 3.0M" |
| Nav Link | Jost | 14px (0.875rem) | 400 | 1.00 | 1px | `text-transform: uppercase` |
| Nav Sub | Noto Sans KR | 14px (0.875rem) | 400 | 1.50 | 0px | Dropdown Korean menu items |
| Button | Inter | 14px (0.875rem) | 500 | 1.00 | 0.5px | `text-transform: uppercase` |
| Footer | Inter / Noto Sans KR | 13px (0.8125rem) | 400 | 1.60 | 0px | Footer body text |
| Micro | Inter | 11px (0.6875rem) | 400 | 1.40 | 0.5px | Copyright, fine print |

### Principles
- **Light over bold**: Display headings use weight 300 (light) — a gallery whispers, it doesn't shout. Bold (700) appears only in rare emphasis moments.
- **Bilingual harmony**: Korean text (Noto Sans KR) and Latin text (Inter) share similar x-heights and cap-heights, ensuring mixed-language paragraphs feel unified.
- **Tracked brand, tight body**: Jost headings use positive letter-spacing (wide, architectural), while Inter/Noto body text uses default tracking (compact, readable).
- **Scale generously**: The jump from body (16px) to display (64px) is dramatic — this creates a clear hierarchy where content-level text is functional and display-level text is experiential.

## 4. Component Stylings

### Buttons

**Primary (CTA)**
- Background: `#1A1A1A` (Ink Black)
- Text: `#FAFAF8` (Gallery White)
- Padding: 14px 32px
- Radius: 0px (sharp rectangle — gallery precision)
- Border: none
- Font: Inter 14px, weight 500, uppercase, 0.5px tracking
- Hover: background → `#3A3A3A`, transition 300ms ease
- Active: background → `#111111`
- Focus: 2px solid `#1A1A1A`, offset 2px
- Use: "대관 신청", "문의하기", primary actions

**Secondary (Outline)**
- Background: transparent
- Text: `#1A1A1A`
- Padding: 14px 32px
- Radius: 0px
- Border: 1px solid `#1A1A1A`
- Hover: background → `#1A1A1A`, text → `#FAFAF8`, transition 300ms ease
- Use: "자세히 보기", "전시 목록", secondary actions

**Text Link**
- Text: `#1A1A1A`
- Decoration: underline, `underline-offset: 4px`
- Hover: color → `#6B6B6B`, transition 200ms
- Use: Inline links, "View all", "Learn more"

**Ghost (on dark backgrounds)**
- Background: transparent
- Text: `#FAFAF8`
- Border: 1px solid `rgba(250, 250, 248, 0.4)`
- Hover: background → `rgba(250, 250, 248, 0.1)`, border → `rgba(250, 250, 248, 0.8)`
- Use: CTAs on hero images, dark sections

### Cards

**Exhibition Card**
- Background: transparent (no card background)
- Image: 4:5 aspect ratio, `object-fit: cover`, grayscale at rest
- Image hover: color transition 600ms ease, subtle scale(1.02)
- Title: Jost 20px, weight 300, uppercase
- Meta: Inter 13px, weight 400, Stone Gray
- Spacing: 16px gap between image and text
- Divider: none — whitespace separates cards

**Space Floor Card**
- Layout: asymmetric — image 60% width, text 40%, alternating sides
- Floor label: Jost 120px, weight 200, `opacity: 0.06` — massive faded background numeral
- Name: Jost 28px, weight 300, uppercase
- Specs: Inter 12px, weight 500, uppercase, tracked — "250㎡ (75평) · 천장고 2.6M"
- Image: grayscale → color on hover, 800ms transition
- Link: underline text link "상세 보기 →"

**News Item**
- Layout: horizontal — date left, title right
- Date: Inter 13px, Stone Gray, fixed width
- Title: Noto Sans KR 16px, weight 400, Ink Black
- Divider: 1px solid `rgba(26, 26, 26, 0.10)` between items
- Hover: title shifts right 4px, transition 200ms

### Navigation

**Desktop Header**
- Position: fixed, top 0
- Background: `rgba(250, 250, 248, 0.92)` with `backdrop-filter: blur(20px)`
- Height: 72px
- Logo: "SUN ART CENTER" — Jost 18px, weight 400, 3px tracking, Ink Black
- Links: Jost 14px, weight 400, uppercase, 1px tracking
- Dropdown: `#FAFAF8` background, `box-shadow: 0 4px 20px rgba(0,0,0,0.08)`
- Dropdown items: Noto Sans KR 14px, weight 400
- Active indicator: 2px underline beneath active link
- Transition: background opacity changes on scroll

**Mobile Header**
- Height: 64px
- Logo: left-aligned, smaller (16px)
- Toggle: "Index" / "Close" text button (not hamburger icon)
- Mobile menu: full-screen overlay, `#FAFAF8` background
- Menu items: Jost 32px, weight 300, uppercase, centered

### Footer
- Background: `#111111` (Deep Black)
- Text: `rgba(250, 250, 248, 0.7)` — softened white
- Layout: 4-column grid → stacked on mobile
- Logo: Gallery White, same treatment as header
- Links: `rgba(250, 250, 248, 0.5)`, hover → `#FAFAF8`
- Divider: 1px solid `rgba(250, 250, 248, 0.1)`
- Copyright: Micro size (11px), `rgba(250, 250, 248, 0.4)`

### Image Treatment
- Exhibition photos: full-bleed or 4:5 ratio, grayscale at rest (CSS `filter: grayscale(100%)`), transition to full color on hover (600ms ease)
- Space photos: asymmetric placement (60-80% viewport width), grayscale → color
- Hero images: full-viewport width, contained height (70vh max), with optional dark gradient overlay for text legibility
- Frame: optional `img-frame` class — adds 1px solid `rgba(26,26,26,0.1)` border for portfolio-style framing
- All images: `object-fit: cover`, lazy-loaded with fade-in animation

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 120, 160px
- Section spacing: 120px (desktop), 80px (tablet), 64px (mobile)
- Component internal spacing: 16-32px
- Text block max-width: 640px (for optimal Korean reading line length)

### Grid & Container
- Max content width: 1280px, centered with auto margins
- Horizontal padding: 48px (desktop), 24px (tablet), 20px (mobile)
- Homepage grid: single-column sections, each a distinct "room"
- Exhibition grid: 2 columns (desktop), 1 column (mobile), 32px gap
- Spaces: asymmetric — image and text alternate sides per floor, offset from center
- News: single-column list, full-width dividers

### Whitespace Philosophy
- **Whitespace is the wall**: In a physical gallery, blank walls give art room to exist. Similarly, generous padding (80-120px between sections) allows each content block to command full attention.
- **Asymmetry over symmetry**: Perfect centering feels corporate. Slightly off-center layouts (image 60% left, text 40% right, then reversed) create the organic rhythm of a gallery walkthrough.
- **Vertical pacing**: Each homepage section scrolls into view as a separate "room." The transition between rooms is pure whitespace — a visual corridor between galleries.

### Border Radius Scale
- **0px**: Buttons, inputs, image containers — sharp edges evoke architectural precision
- **0px**: Cards — no rounded corners in the system
- Exception: Avatar/profile images may use `50%` (circle)

### Dividers
- Weight: 1px
- Color: `rgba(26, 26, 26, 0.10)` on light backgrounds, `rgba(250, 250, 248, 0.10)` on dark
- Usage: between navigation items, between list items, section separators
- Full-width (edge-to-edge within container) or text-width — never arbitrary widths

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, solid background | Default — nearly everything |
| Navigation Glass | `backdrop-filter: blur(20px)` on `rgba(250,250,248,0.92)` | Sticky header — floats above content |
| Dropdown | `box-shadow: 0 4px 20px rgba(0,0,0,0.08)` | Nav dropdown menus |
| Modal | `box-shadow: 0 8px 40px rgba(0,0,0,0.12)` + overlay `rgba(0,0,0,0.4)` | Admin modals, lightbox |
| Image Hover | `scale(1.02)` transform | Subtle lift on exhibition image hover |

**Shadow Philosophy**: A gallery is a flat, evenly-lit space. Shadows are minimal and diffused — never sharp, never dark. The only noticeable shadow is on dropdowns and modals, which need to float above content. Everything else lives on a single plane, separated by whitespace and dividers rather than elevation.

## 7. Do's and Don'ts

### Do
- Use Jost weight 300 for display text — the lightness IS the brand
- Maintain grayscale-to-color image transitions — they create a "gallery at first glance, alive on closer look" experience
- Use `#FAFAF8` (not pure white) for backgrounds — warmth matters
- Apply generous section spacing (120px desktop) — let content breathe
- Keep buttons sharp (0px radius) — architectural, precise, gallery-like
- Use 1px dividers at 10% opacity — barely there, structurally essential
- Display floor specs in uppercase tracked labels — "250㎡ · 천장고 2.6M"
- Write bilingual content with Korean primary, English secondary

### Don't
- Don't use bold weights (700+) for headings — this is an editorial space, not a billboard
- Don't introduce chromatic accent colors — the interface is monochromatic; color belongs to art
- Don't use rounded corners on rectangular elements — sharpness is the brand
- Don't add decorative icons or emoji to UI elements — minimalism means removal
- Don't use card backgrounds or container borders — whitespace is the container
- Don't display text over exhibition images without gradient overlay — respect the artwork
- Don't use animations longer than 800ms — subtlety, not spectacle
- Don't use shadows on cards or buttons — flatness is intentional
- Don't mention Sun Gallery in any context — brand separation is absolute

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, collapsed nav, 20px padding |
| Tablet | 640-1024px | 2-column grids begin, 24px padding |
| Desktop | 1024-1280px | Full layout, asymmetric spaces |
| Large Desktop | >1280px | Max-width container, centered with generous margins |

### Touch Targets
- Buttons: minimum 48px height (14px text + 14px×2 padding + border)
- Nav links: 48px minimum touch height
- Cards: entire card is tappable (link wraps image + text)
- List items: 56px minimum row height

### Collapsing Strategy
- Display hero: 64px → 40px on mobile, maintain weight 300
- Section titles: 36px → 28px on mobile
- Space floor layout: asymmetric side-by-side → stacked (image full-width above, text below)
- Exhibition grid: 2-column → single column
- Navigation: horizontal links → "Index" toggle with full-screen overlay
- Footer: 4-column → stacked accordion sections
- Section spacing: 120px → 80px → 64px

### Image Behavior
- Exhibition cards: maintain 4:5 ratio at all breakpoints
- Space photos: maintain aspect ratio, full-width on mobile (no longer 60%)
- Hero: full-width always, height adjusts (70vh desktop, 50vh mobile)
- Grayscale filter: disabled on mobile (always show color) — touch devices lack hover
- Lazy loading with `opacity: 0 → 1` fade-in (400ms)

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: Gallery White (`#FAFAF8`)
- Alt background: Light Warm (`#F2F1ED`)
- Dark sections: Deep Black (`#111111`)
- Text primary: Ink Black (`#1A1A1A`)
- Text secondary: Warm Charcoal (`#3A3A3A`)
- Text tertiary: Stone Gray (`#6B6B6B`)
- Dividers: `rgba(26, 26, 26, 0.10)`
- Nav glass: `rgba(250, 250, 248, 0.92)` + blur(20px)

### Example Component Prompts

- "Create a hero section: full-width image (70vh height, object-fit cover) with bottom gradient overlay (transparent to rgba(0,0,0,0.4)). Overlay text: Jost 64px weight 300, white, line-height 1.10. Ghost button below: transparent bg, 1px solid rgba(250,250,248,0.4), 14px 32px padding, 0px radius. Background: #FAFAF8."

- "Build the navigation: fixed, 72px height, background rgba(250,250,248,0.92) with backdrop-filter blur(20px). Logo 'SUN ART CENTER' in Jost 18px weight 400, letter-spacing 3px, uppercase, #1A1A1A. Nav links Jost 14px weight 400, uppercase, 1px tracking. Dropdown: #FAFAF8 bg, shadow 0 4px 20px rgba(0,0,0,0.08)."

- "Design an exhibition card: no card background. Image at 4:5 ratio, grayscale filter at rest, transition to color on hover (600ms). Below: 16px gap, title in Jost 20px weight 300 uppercase, artist + dates in Inter 13px Stone Gray (#6B6B6B). No border, no shadow."

- "Create a space floor section: asymmetric layout — image 60% width left, text 40% right. Floor number as Jost 120px weight 200 at 6% opacity, positioned behind text. Space name in Jost 28px weight 300 uppercase. Specs in Inter 12px weight 500, uppercase, 1.5px tracking: '250㎡ (75평) · 천장고 2.6M'. Text link '상세 보기 →' with underline offset 4px."

- "Build the footer: #111111 background. 4-column grid. Logo in Gallery White. Text at rgba(250,250,248,0.7). Links at 50% opacity, hover to full. 1px divider at rgba(250,250,248,0.10). Copyright in 11px at 40% opacity."

### Iteration Guide
1. Start with `#FAFAF8` background — warm, not sterile
2. All display type in Jost weight 300 — lightness is the brand identity
3. Monochromatic only — no accent colors in the interface
4. Sharp corners (0px radius) on all rectangular elements
5. Grayscale images → color on hover — the gallery awakening effect
6. 120px section spacing on desktop — generous, unhurried
7. Asymmetric layouts for Spaces — mirror the physical walkthrough experience
8. 1px dividers at 10% opacity — barely there, but structurally essential
9. Navigation glass effect — `rgba(250,250,248,0.92)` + `blur(20px)`
10. Never mention Sun Gallery — brand separation is absolute

### Website Page Structure

| Page | Path | Content Focus |
|------|------|--------------|
| Home | `/` | Hero, current exhibitions, 5 spaces overview, recent notices |
| About | `/about` | Center introduction, greeting, architecture, location |
| Exhibition | `/exhibition` | Current/upcoming/past exhibitions, filterable |
| Spaces | `/spaces` | 5 floors (B1F–4F), asymmetric layout per floor |
| Rental | `/rental` | Procedure, pricing, application, status calendar |
| News | `/news` | Notices and news, categorized |
| Contact | `/contact` | Form, map, hours, phone |

### Space Data Reference

| Floor | Name | Area | Ceiling Height |
|-------|------|------|---------------|
| B1F | B1전시관 | 250㎡ (75평) | 2.6M |
| 1F | 1전시관 | 120㎡ (35평) | 3.0M |
| 2F | 2전시관 | 250㎡ (75평) | 2.6M |
| 3F | 3전시관 | 250㎡ (75평) | 2.6M |
| 4F | 4전시관 | 70㎡ (20평) | 4.3M |
