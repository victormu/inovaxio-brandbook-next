---
version: alpha
name: Inovaxio-design-system
description: A dark, photography-first brand reference on a pure black canvas. Quicksand display headlines over Inter body, a single blue-to-cyan brand family (Action Blue #2E2EFE moving to Cyan #00C9D5) as the only accent, and near-invisible chrome so content and product imagery lead. No side-stripe accents, no gradient text, no decorative grids. One accent, generous space, semantic color. The site is a brand manual: every element documents what to do and what not to do.
colors:
  primary: "#2E2EFE"
  accent: "#3245FD"
  primary-text: "#7186FE"
  cyan: "#00C9D5"
  ink: "#FFFFFF"
  body: "#FFFFFF"
  body-muted: "#9096A2"
  body-faint: "#888E9B"
  canvas: "#000000"
  surface: "#121212"
  surface-2: "#1C1C1C"
  border: "rgba(255,255,255,0.08)"
  border-strong: "rgba(255,255,255,0.16)"
  success: "#26CC66"
  warning: "#E5B21A"
  error: "#E53333"
  on-primary: "#FFFFFF"
typography:
  display:
    fontFamily: "Quicksand, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.02em
  titulo:
    fontFamily: "Quicksand, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.025em
  subtitulo:
    fontFamily: "Quicksand, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.025em
  lead:
    fontFamily: "Inter, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: 0
  corpo:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  corpo-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0
  legenda:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: 0.14em
  mono:
    fontFamily: "monospace"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0.12em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 24px
  pill: 9999px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 40px
  section: 48px
  section-lg: 64px
  block: 96px
components:
  sidenav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body-muted}"
    typography: "{typography.corpo-sm}"
    width: 260px
    borderRight: "1px solid {colors.border}"
  mobile-topbar:
    backgroundColor: "rgba(10,10,10,0.85)"
    textColor: "{colors.ink}"
    height: 56px
    borderBottom: "1px solid {colors.border}"
  nav-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.subtitulo}"
    rounded: "{rounded.lg}"
    padding: 24px
    border: "1px solid {colors.border}"
  token-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.legenda}"
    rounded: "{rounded.lg}"
    padding: 12px
    border: "1px solid {colors.border}"
  copy-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.corpo}"
    rounded: "{rounded.lg}"
    padding: 16px 24px
    border: "1px solid {colors.border}"
  copy-block-highlight:
    backgroundColor: "rgba(46,46,254,0.08)"
    textColor: "{colors.ink}"
    typography: "{typography.lead}"
    rounded: "{rounded.lg}"
    border: "1px solid rgba(46,46,254,0.2)"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.legenda}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-secondary:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.body-muted}"
    typography: "{typography.legenda}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    border: "1px solid {colors.border}"
  download-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.corpo-sm}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
  photo-card:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.body-faint}"
    typography: "{typography.legenda}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
  checklist-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.corpo-sm}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    border: "1px solid {colors.border}"
  do-dont-card:
    backgroundColor: "rgba(255,255,255,0.02)"
    textColor: "{colors.body-muted}"
    typography: "{typography.corpo-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  search-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.corpo-sm}"
    rounded: "{rounded.pill}"
    padding: 12px 16px
    border: "1px solid {colors.border}"
  section-header:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.titulo}"
    borderBottom: "1px solid {colors.border}"
---

## Overview

The Inovaxio brandbook is a **dark, photography-first brand reference built on a pure black canvas**. It is a manual, not a marketing site: every screen documents a rule and, where it matters, the counter-rule (faca / nao faca). Chrome recedes so content and product imagery lead. Quicksand carries the headlines, Inter carries the reading, and a single blue-to-cyan brand family provides the only accent on the page.

Density is deliberately low. Sections stack with generous vertical rhythm (48 to 96px), content caps around 900px so paragraphs stay readable, and there is no decorative frame: no side-stripe accents, no gradient text, no decorative grid overlays. Depth comes from surface-color change (black canvas to near-black surface) and from restrained hover elevation on interactive cards, never from chrome for its own sake.

The system is expressed at two volumes. The **site UI** (this reference) is the digital layer: tokens, components, motion. The **brand content** it presents is a graphic manual: logo rules, print CMYK and Pantone, an editorial grid, a typographic hierarchy in points. This DESIGN.md governs the first: how to build the interface consistently.

**Key Characteristics:**
- Pure black canvas (`{colors.canvas}`) with near-black surfaces (`{colors.surface}`, `{colors.surface-2}`) for cards and rows.
- One accent family: Action Blue (`{colors.primary}`) moving to Cyan (`{colors.cyan}`). No second brand color. On dark backgrounds, text uses the lighter `{colors.primary-text}` for contrast.
- Quicksand (display) + Inter (body). Tight tracking on display, generous leading on body.
- Hairline borders (`{colors.border}`) do the separating. Elevation is surface change plus a soft hover lift, not stacked shadows.
- Full do / nao faca grammar via `{component.do-dont-card}`: green check for the correct application, red cross for the banned one.
- Fixed left sidebar on desktop; a fixed top bar plus off-canvas drawer on mobile.
- Zero travessao (em-dash) anywhere in visible copy: it is a hard brand rule, on the site and in this document.

## Colors

> **Source of truth:** `styles/tokens.css`. Colors are defined in HSL there; the hex values below are the resolved equivalents. Never inline a hex in a component; always reference the CSS custom property.

### Brand & Accent
- **Action Blue** (`{colors.primary}` - #2E2EFE): The single brand-level interactive color. Primary buttons, active nav, the left accent of the brand mark, focus intent. It is the one "this is Inovaxio, click here" signal.
- **Accent Blue** (`{colors.accent}` - #3245FD): A near-sibling of Action Blue used inside gradients and hover transitions. Digital-only distinction from primary; on print they share a Pantone family.
- **Cyan** (`{colors.cyan}` - #00C9D5): The far end of the brand gradient and the focus-ring color (`:focus-visible` outline). Also the eyebrow color on section headers. It is a partner to blue, never a second competing accent.
- **Primary Text** (`{colors.primary-text}` - #7186FE): A lighter blue used whenever the brand blue must be TEXT on the black canvas. Action Blue (#2E2EFE) fails contrast as body text on black (2.9:1); this lighter blue clears WCAG AA (about 6.7:1). Use it for active nav labels, eyebrows-as-text, and inline blue copy on dark.

### Surface
- **Canvas** (`{colors.canvas}` - #000000): The base. The whole app sits on pure black.
- **Surface** (`{colors.surface}` - #121212): Cards, the sidebar, copy blocks, download cards. The default raised surface.
- **Surface 2** (`{colors.surface-2}` - #1C1C1C): Hover fills, secondary buttons, image-placeholder backgrounds, table header rows. One micro-step lighter than Surface.

### Text
- **Ink** (`{colors.ink}` - #FFFFFF): Every headline and primary body line on the dark canvas.
- **Body Muted** (`{colors.body-muted}` - #9096A2): Secondary copy, descriptions, inactive nav. About 6.7:1 on black.
- **Body Faint** (`{colors.body-faint}` - #888E9B): Tertiary copy, captions, sub-item links, spec-table labels. Held at ~6.7:1 on black. Do not go fainter; the fainter gray that once shipped failed contrast.

### Status
- **Success** (`{colors.success}` - #26CC66): The "faca" / correct state (checklist checked, do-cards).
- **Warning** (`{colors.warning}` - #E5B21A): Attention states.
- **Error** (`{colors.error}` - #E53333): The "nao faca" / avoid state, and the red-tinted "Evitar" chips.

### Hairlines & Borders
- **Border** (`{colors.border}` - white at 8%): The universal hairline. Card edges, row dividers, table lines, sidebar separator. It reads as a whisper on black, not a hard line.
- **Border Strong** (`{colors.border-strong}` - white at 16%): The stronger hairline, used on the skip-link and checkbox outlines.

### Brand Gradient
`{gradient.brand-h}` runs Action Blue to Cyan (`linear-gradient(90deg, #2E2EFE, #00C9D5)`). It is used sparingly and only as a fill: the color-usage proportion bar, the download-card preview, the DoDontCard nothing. **Never as text** (`background-clip: text` is banned) and never as a decorative page background. Atmosphere is meant to come from real photography, not CSS gradients.

## Typography

### Font Family
- **Display**: `Quicksand, sans-serif` (via next/font). Rounded geometric sans. Every headline, nav label, and brand wordmark.
- **Body / UI**: `Inter, sans-serif` (via next/font). The reading and UI voice: paragraphs, captions, tables, form fields.
- **Mono**: system `monospace` for numeric labels, tokens, and index numbers.

### Hierarchy

The brand's graphic hierarchy (documented in the site's Tipografia section, in points) maps to these UI tokens:

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display}` | 48px | 700 | 1.0 | -0.02em | Home hero; the tightest Quicksand cadence. Graphic: 48 to 72 pt |
| `{typography.titulo}` | 36px | 700 | 1.15 | -0.025em | Page headers (`{component.section-header}` level 1). Graphic: 24 to 36 pt |
| `{typography.subtitulo}` | 24px | 600 | 1.15 | -0.025em | Section subheads (`{component.section-header}` level 2), nav-block titles. Graphic: 18 to 24 pt |
| `{typography.lead}` | 18px | 400 | 1.75 | 0 | Hero subcopy, highlight copy blocks |
| `{typography.corpo}` | 16px | 400 | 1.6 | 0 | Default paragraph. Graphic: 10 to 12 pt |
| `{typography.corpo-sm}` | 14px | 400 | 1.35 | 0 | UI text, table cells, card body |
| `{typography.legenda}` | 12px | 400 | 1.6 | 0 | Captions, button text |
| `{typography.label}` | 12px | 600 | 1.0 | 0.14em | The `.label` eyebrow: uppercase, wide-tracked, cyan or faint |
| `{typography.mono}` | 12px | 500 | 1.0 | 0.12em | Index numbers, tokens, kickers |

### Principles

- **Quicksand for display, Inter for reading. The boundary is unbreakable.** Titles are Quicksand; body is Inter. Never the reverse, never a third family.
- **Tight tracking on display.** Headlines carry `-0.02 to -0.025em`. The tracking floor is respected so letters never touch.
- **Generous leading on body.** Body runs 1.6, lead runs 1.75. The reading pace is part of the brand; do not tighten it below 1.6.
- **The weight ladder is 400 / 500 / 600 / 700.** Body is 400, medium UI is 500, subheads are 600, display and page titles are 700.
- **Emphasis stays in-family.** To stress a word in a headline, change weight, not font. Never inject a serif or a second sans for effect.
- **Fallbacks are defined.** When Quicksand and Inter are unavailable (Office, e-mail, system), Quicksand falls back to Verdana, Inter to Arial/Helvetica.

## Layout

### Spacing System
- **Base unit:** 4px, on a 4/8 rhythm. Tokens: `{spacing.xxs}` 4 - `{spacing.xs}` 8 - `{spacing.sm}` 12 - `{spacing.md}` 16 - `{spacing.lg}` 24 - `{spacing.xl}` 32 - `{spacing.xxl}` 40 - `{spacing.section}` 48 - `{spacing.section-lg}` 64 - `{spacing.block}` 96.
- **Content padding:** `{spacing.section}` top / `{spacing.xl}` sides on desktop; tightens to `{spacing.md}` sides on mobile, with a top offset that clears the 56px fixed mobile bar.
- **Section rhythm:** blocks separate by `{spacing.section-lg}` (64px) to `{spacing.block}` (96px). Cards pad `{spacing.lg}` to `{spacing.section}`.
- **Grid gutter:** `{spacing.md}` (16px) between cards.

### Grid & Container
- **Shell:** CSS Grid, `260px 1fr`. Fixed sidebar plus a single content column.
- **Content max width:** `900px` (`--content-max`), left-aligned. Paragraphs additionally cap at 60 to 65ch for readability.
- **Card grids:** `repeat(auto-fit, minmax(200-280px, 1fr))`. They reflow without manual breakpoints and collapse to one column on narrow screens.
- **Mobile:** single column. The sidebar leaves the grid (becomes a fixed drawer), so content spans full width.

### Whitespace Philosophy
Space is the pedestal. Sections open with real air and never crowd. The one place density is intentional is a spec table or a token wall, where the data itself is the point. Elsewhere, when a section feels tight, add space before adding chrome.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, hairline border only | Cards, rows, tables, nav at rest |
| Hover lift | `translateY(-1 to -2px)` + soft tinted shadow | `{component.nav-block}`, `{component.token-chip}`, download button on hover |
| Active press | `scale(0.97)` | Every button and chip on `:active` |
| Drawer | `{shadow.lg}` | The mobile nav drawer over its backdrop |
| Glow (rare) | `{glow.primary}` blue glow | Reserved; used only where a brand moment truly needs it |

**Shadow philosophy.** Depth is primarily surface change: black canvas to `{colors.surface}` card. Interactive cards earn a soft lift on hover (a `translateY` plus a shadow tinted to the background, never pure black). Do not pair a 1px border with a large soft drop shadow on the same element (the "ghost card" tell). Pick the hairline border at rest; let the shadow appear only on hover.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed brand blocks, section dividers |
| `{rounded.sm}` | 4px | Checkboxes, focus outline radius, small swatches |
| `{rounded.md}` | 8px | Buttons, small callouts, chips |
| `{rounded.lg}` | 12px | Cards: nav-block, token-chip, copy-block, download-card, do-dont-card |
| `{rounded.xl}` | 16px | The brand-blue positioning block on the home page |
| `{rounded.xxl}` | 24px | Reserved for larger feature surfaces |
| `{rounded.pill}` | 9999px | Search input, clear button, circular controls |

**Shape lock.** Cards are 12px. Buttons are 8px. The search field and circular controls are pill. Do not mix radii within a family. Do not exceed 16px on a standard card (over-rounding is a tell).

## Components

### Navigation

**`sidenav`** - Fixed left sidebar, `260px`, background `{colors.surface}`, hairline right border. Brand mark at top (blue rounded-square symbol + "INOVAXIO" wordmark in solid white, plus "Brandbook 2026" label). Then five expandable groups. The active group label uses `{colors.primary-text}`; inactive uses `{colors.body-muted}`. Sub-items are faint; the current page sub-item upgrades to `{colors.primary-text}` with a solid `{colors.primary}` left border and weight 500.

**`mobile-topbar`** - At <= 768px the sidebar leaves the grid. A fixed 56px bar appears with the brand mark and a hamburger. Background is near-black at 85% with backdrop-blur.

**Drawer** - The hamburger opens the `{component.sidenav}` as an off-canvas drawer (`translateX`) over a dimmed backdrop. Closes on route change, Escape, or backdrop tap; body scroll locks while open.

### Buttons

**`button-primary`** - Background `{colors.primary}`, text white, `{rounded.md}`, padding 8x16. The download action and any primary commit. Hover brightens and lifts; `:active` is `scale(0.97)`.

**`button-secondary`** - Background `{colors.surface-2}`, muted text, hairline border, `{rounded.md}`. The copy button on `{component.copy-block}` (with a copy/check icon that swaps on success). Hover raises the fill and text to full contrast.

### Cards & Containers

**`nav-block`** - Home directory card. Surface, hairline, `{rounded.lg}`, 24px padding. A small mono index (`01` to `05`) top-left, a link arrow top-right that slides on hover, the section title (Quicksand 600), then the sub-item list. Hover lifts the whole card and tints the number and arrow to `{colors.primary-text}`. No colored left stripe.

**`token-chip`** - Copyable color token. Swatch on top, label and hex below. Click copies the CSS var or hex; the hex flips to a success "Copiado" and a live region announces it. Hover adds a blue-tinted glow and a 1px lift; `:active` presses.

**`copy-block`** and **`copy-block-highlight`** - Copyable brand phrases. Default is Surface + hairline; highlight is a blue-tinted fill (`rgba(46,46,254,0.08)`) with a blue-tinted border, larger Quicksand text. A secondary copy button sits at the top-right. Never a colored left stripe; the tint carries the emphasis.

**`download-card`** - Asset download. A preview panel (`{colors.surface-2}`, file extension in mono when no image) over a body row with name, description, a mono format badge, and a `{component.button-primary}` "Baixar". No decorative dot grid in the preview.

**`photo-card`** - Approved photography with a captioned brand attribute. Uses the `.img-placeholder` pattern until real images land.

**`checklist-item`** - A labeled checkbox row. The real `<input>` is visually hidden but kept in the accessibility tree and tab order; a custom box renders the check. Checked state tints the row `{colors.success}` and strikes the label.

**`do-dont-card`** - The brand rule card. A very subtle tinted panel (green for faca, red for nao faca), an image slot, a badge with a check or cross icon, and the rule caption. Full border, never a side stripe. This is the core "manual" vocabulary, used across Logo proibicoes and Aplicacoes da marca.

**`section-header`** - Page and section heading. Level 1 renders an `<h1>` (Quicksand 700, `{typography.titulo}`) with an optional cyan `.label` eyebrow, a bottom hairline, and optional description. Level 2 renders an `<h2>` at `{typography.subtitulo}` with no eyebrow and lighter spacing. Eyebrows are rationed: at most one per page.

### Inputs

**`search-input`** - Pill-shaped field, Surface fill, hairline border, leading search glyph, trailing pill clear button when filled. On the home page it filters the section directory and announces the result count via a live region. The `:focus-visible` cyan ring applies (the inline `outline: none` was removed).

## Do's and Don'ts

### Do
- Use the blue-to-cyan family (`{colors.primary}` to `{colors.cyan}`) as the ONLY accent. On dark text, switch to `{colors.primary-text}` for contrast.
- Separate with the hairline `{colors.border}`; let surface change (canvas to `{colors.surface}`) carry section rhythm.
- Reserve `{rounded.pill}` for search and circular controls, `{rounded.lg}` for cards, `{rounded.md}` for buttons.
- Use `scale(0.97)` on `:active` and a small `translateY` lift on hover for interactive cards.
- Keep body at `{typography.corpo}` (16px / 1.6) and never tighten leading below 1.6.
- Give every rule a `{component.do-dont-card}`: green check for the right way, red cross for the banned way.
- Ration eyebrows to at most one per page; the section's place on the page already categorizes it.
- Honor `prefers-reduced-motion`: all transitions collapse to near-instant.

### Don't
- Don't add a second accent color. One family carries every interactive cue.
- Don't use a colored side-stripe (`border-left` > 1px) as an accent on cards or callouts. Use a full border, a tint, a leading icon, or nothing.
- Don't use gradient text (`background-clip: text`). Emphasis is weight or size; the wordmark is solid white.
- Don't ship a decorative grid or dot-pattern background. A grid diagram is allowed only where the section IS documenting the grid.
- Don't pair a 1px border with a big soft drop shadow at rest (ghost card). Border at rest, shadow on hover.
- Don't over-round; cards top out at 16px.
- Don't put an eyebrow above every section, and never repeat the same eyebrow down a page.
- Don't use a travessao (em-dash) in any visible copy. Use a period, comma, colon, or parentheses. This is non-negotiable.

## Responsive Behavior

### Breakpoints
The system uses a single structural breakpoint at **768px**, plus fluid `auto-fit` grids that reflow continuously above it.

| Name | Width | Key Changes |
|---|---|---|
| Mobile | <= 768px | Sidebar leaves the grid; fixed 56px top bar + hamburger drawer appear. Single content column, `{spacing.md}` side padding, top offset clears the bar. Two-column grids collapse to one via `.stack-mobile`. CopyBlock stacks text over button. |
| Desktop | > 768px | Fixed `260px` sidebar + content column. Content caps at `900px`, left-aligned. Card grids reflow via `auto-fit`. |

### Touch Targets
- Minimum 44 x 44px on interactive controls. The hamburger is 40px, the clear button 24px inside a larger tap row.
- Nav sub-items are full-width tap rows in the drawer.

### Collapsing Strategy
- **Sidebar:** fixed rail on desktop; off-canvas drawer (with backdrop, Escape, scroll-lock) on mobile.
- **Two-column grids** (verbal linguagem, fundamentos dimensoes, visual samples): `.stack-mobile` forces one column under 768px.
- **Tables** (color spec, fallbacks, formats): wrapped in `overflow-x: auto`; they scroll rather than break the page width.
- **Spec rows** (type scale, grid specs): stack to a single column under 768px.

### Image Behavior
- Real assets are inserted last; until then, the `.img-placeholder` pattern shows a labeled dashed panel (`IMG -- ...`).
- PhotoCards reserve aspect ratio (square / landscape / portrait) so nothing shifts when images arrive.

## Iteration Guide

1. Work one component at a time. Reference its YAML key directly (`{component.nav-block}`, `{component.do-dont-card}`).
2. Never inline a hex or size; use `{token.refs}` that map to the CSS custom properties in `styles/tokens.css`.
3. Components are named exports (no default exports). Section-heavy pages compose small section components (see `components/sections/visual/*`), each under 800 lines.
4. Document default and active/pressed states. Hover is a lift, active is `scale(0.97)`.
5. Quicksand 600/700 for display, Inter 400 for body. The boundary does not move.
6. Every rule gets a faca and, where it exists, a nao faca. That is the manual's core pattern.
7. When emphasis is needed, change surface (canvas to surface, or a blue tint) before adding chrome.
8. Re-read visible copy before shipping: zero travessao, no repeated eyebrows, contrast holds on black.

## Known Gaps

- **Light is a band, not a theme.** The manual is dark-canvas by default and alternates bands (`.ctx-light`, `.ctx-light-dim`, `.ctx-navy`) exactly as the institutional site does: black, white, #F4F4F7, #080830. There is no user-facing light/dark toggle.
- **Every topic is a full-viewport panel.** A chapter opens with a full-screen cover (number, name, table of contents), each topic fills at least one viewport with its title sticky on the left, and the chapter closes with a link into the next one. This replaced the document-with-margins layout in the 2026-09-17 round.
- **Chapters 04 and 05** still use the pre-redesign internal layout. They have the new cover and chapter-end link, but their topics are not panels yet.
- **Real imagery** is pending. All product, logo, and application mockups are `IMG --` placeholders for Victor to replace; only the placeholder frame is specified.
- **Print color proofing** is unresolved by design: CMYK and Pantone are documented as industry-standard conversions and flagged for a physical proof before any large run.
- **Error and empty states** exist for search (empty result) and copy (success) but are not yet a full family; forms beyond search are undocumented.
- **Motion is CSS-only.** framer-motion is available in the project but the shipped interactions are CSS transitions; richer scroll motion is not specified here.
- **The graphic brand grid** (12-column editorial, A4 / social / slide formats) lives in the site content, not in this UI token set; this DESIGN.md governs the site's own layout, which is the two-column shell.
