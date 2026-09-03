---
name: Ethereal Commerce
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#414848'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#727878'
  outline-variant: '#c1c8c7'
  surface-tint: '#476363'
  primary: '#032121'
  on-primary: '#ffffff'
  primary-container: '#1a3636'
  on-primary-container: '#829f9f'
  inverse-primary: '#aecccc'
  secondary: '#6f5b3d'
  on-secondary: '#ffffff'
  secondary-container: '#f6dcb5'
  on-secondary-container: '#736041'
  tertiary: '#2e170b'
  on-tertiary: '#ffffff'
  tertiary-container: '#462b1e'
  on-tertiary-container: '#b89180'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cae8e8'
  primary-fixed-dim: '#aecccc'
  on-primary-fixed: '#022020'
  on-primary-fixed-variant: '#304b4b'
  secondary-fixed: '#f9dfb8'
  secondary-fixed-dim: '#dcc39e'
  on-secondary-fixed: '#261903'
  on-secondary-fixed-variant: '#554427'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#e8bdaa'
  on-tertiary-fixed: '#2d160a'
  on-tertiary-fixed-variant: '#5e4032'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is rooted in high-end minimalism, prioritizing clarity and breathability to allow product photography to serve as the primary visual driver. It targets a discerning audience that values professional reliability and sophisticated aesthetics.

The visual style is **Modern Minimalism**. It utilizes expansive white space to reduce cognitive load and create an atmosphere of luxury and calm. UI elements are secondary to content, employing a refined structural grid and a restrained color application to ensure the user's journey is frictionless and focused.

## Colors

The palette is anchored by a deep forest green (`#1A3636`), used sparingly for primary actions and key brand moments to signify stability and premium quality. 

- **Primary:** Deep Forest Green for high-priority CTAs and brand identity.
- **Secondary:** Muted Champagne for soft accents or secondary interactive elements.
- **Neutral:** A range of grays from off-white (`#F8F9FA`) for backgrounds to light borders (`#E5E7EB`).
- **Typography:** Pure black (`#000000`) for headlines to ensure maximum legibility and authority, with a dark slate gray for secondary body text.

## Typography

This design system uses a dual-font strategy to balance character with utility. **Manrope** provides a modern, geometric feel for headings, creating a distinct hierarchy. **Inter** is utilized for all body and UI text due to its exceptional legibility and systematic performance.

Headings should use tight letter-spacing to appear more "locked-in" and editorial. Labels and small metadata should use slightly increased letter-spacing to maintain readability at smaller scales.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop, centered within the viewport at a maximum width of 1280px. This ensures a consistent reading experience on ultra-wide monitors.

A 12-column grid is employed with generous 24px gutters. Vertically, the system follows an 8px rhythmic scale. High-level sections (e.g., Hero to Featured Products) should use 80px to 120px of vertical padding to maintain the minimalist aesthetic and emphasize product groups.

## Elevation & Depth

Depth is communicated through **Tonal Layers** and **Ambient Shadows**. 

1. **Surface:** The base layer is pure white or the primary neutral.
2. **Container:** Subtle shifts to light gray define card backgrounds or sidebars.
3. **Shadows:** Use extremely soft, diffused shadows with a low opacity (e.g., `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05)`). Shadows should only appear on floating elements like dropdowns, modals, or hovered product cards to provide a tactile "lift" without cluttering the interface.

## Shapes

The shape language is defined as **Rounded**, utilizing a base radius of 8px (0.5rem) for most components.

- **Standard (8px):** Primary buttons, input fields, and small UI cards.
- **Large (16px):** Main product image containers and promotional banners.
- **Extra Large (24px):** Large modal containers and search overlays.

The rounding is intentional—soft enough to feel approachable, but sharp enough to maintain a professional, architectural edge.

## Components

### Buttons
- **Primary:** Solid Forest Green background, white text. No border. High-contrast hover state (slight darken).
- **Secondary:** Ghost style. Transparent background with a thin 1px black border.
- **Tertiary:** Text-only with a subtle underline or arrow icon for "Shop All" links.

### Input Fields
- Use 1px light gray borders. On focus, the border transitions to black. Place labels above the field in `label-sm` for clarity.

### Product Cards
- Image-first approach. Product titles use `headline-md`. Price is clearly stated in `body-lg` bold. Subtle hover effect: transition the card shadow or slightly scale the image.

### Chips & Tags
- Used for categories or stock status (e.g., "New Arrival", "Limited Edition"). Use the secondary Champagne color for a soft, premium highlight.

### Progress & Loading
- Minimalist thin bars or subtle skeleton screens to maintain the clean aesthetic during transitions.