# Design System — MyDashboard

> **Status:** Active. This document reflects the current light warm-neutral design system.

## Visual Language

### Typography
- **Font stack:** Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Page title:** 30px, weight 600, letter-spacing -0.02em
- **Section title:** 16-18px, weight 600
- **Card title:** 14-16px, weight 500-600
- **Body:** 13-14px, weight 400
- **Navigation:** 13px, weight 500
- **KPI number:** 28px, weight 500
- **Small labels:** 11px, weight 600, uppercase, letter-spacing 0.05em
- **Table:** 12-13px

### Spacing scale
Base unit: 4px
- 4px (xs), 8px (sm), 12px, 16px (md), 20px (card), 24px (lg), 32px (xl), 48px (2xl)

### Border radius
- Small: 8px (inputs, chips)
- Medium: 12px (buttons, inline elements)
- Large: 16px (panels)
- Card: 18px (dashboard cards)
- Full: 9999px (badges, pills)

### Shadows
- Card: `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)`
- Card hover: `0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)`
- Float: `0 8px 24px rgba(0,0,0,0.10)`

### Icons
Lucide React, stroke-based, 1.5px stroke width. Consistent sizes: 14px (inline), 16px (navigation), 18px (KPI), 24px (empty states).

### Glassmorphism
- Surface: `rgba(255,255,255,0.55)`
- Blur: `blur(18px) saturate(140%)`
- Border: `1px solid rgba(255,255,255,0.65)`
- Radius: 18px

---

## Colors

### Background
| Token | Value | Usage |
|---|---|---|
| Background | `#F3F1EF` | Page background |
| Content BG | `#F5F4F2` | Main content area |
| Glass Surface | `rgba(255,255,255,0.55)` | Glass cards |
| Solid Surface | `#F8F8F7` | Forms, inputs |
| Dark Surface | `#171716` | Feature card anchor |

### Text
| Token | Value | Usage |
|---|---|---|
| Primary | `#172033` | Headings, body |
| Secondary | `#6F737A` | Subtitles, captions |
| Muted | `#9A9A9A` | Labels, hints |

### Accents
| Token | Value | Usage |
|---|---|---|
| Primary | `#C88D68` | Buttons, links, active states |
| Primary Hover | `#B07A5A` | Hover states |
| Soft Accent | `#D8C5B3` | Gradients, secondary elements |

### Semantic
| Token | Value | Usage |
|---|---|---|
| Success | `#6F9B7A` | Active status |
| Warning | `#C9A227` | Inactive, medium priority |
| Error | `#C25A3C` | Archived, high priority |
| Info | `#6B8E9B` | Focus rings, info states |

---

## Components

### Buttons
- Primary: accent filled, white text
- Secondary: glass with border
- Ghost: transparent, hover background
- Danger: glass with red border/text

### Inputs
- 40px height, 12px radius
- Solid surface background
- Accent focus ring (3px offset)
- Muted placeholder color

### Badges
- Pill shape, 9999px radius
- Semantic variants: success, warning, error, info, default

### Cards
- Glass surface, 18px radius, 24px padding
- Hover: lift 2px, accent top border
- Subtle shadow, glass border

### Filter panel
- Collapsible
- Glass background
- Multi-select checkboxes
- Clear-all action when filters active

### Empty state
- Centered icon + title + description
- Optional action button

### Selection toolbar
- Animated slide-down
- Count display + actions
- Light accent background

---

## Responsive Design

### Desktop (>= 1024px)
- Full sidebar (240px)
- 4-column KPI row
- 2-column dashboard grid
- Full table columns visible

### Tablet (768px - 1023px)
- Sidebar adapts
- 2-column KPI row
- Single-column dashboard
- Table horizontal scroll

### Mobile (< 768px)
- Sidebar hidden (bottom sheet)
- Single-column KPI
- Single-column cards
- Tables → card layout
- Touch targets >= 44px
- Backdrop blur reduced to 12px

---

## Accessibility

- All interactive elements keyboard accessible
- Visible focus states (2px accent outline)
- Semantic HTML (nav, main, table, th, button)
- Accessible labels on inputs
- Checkbox inputs with visual indicators
- `aria-live` regions for selection count
- `aria-sort` on sortable headers
- `target="_blank"` with `rel="noopener noreferrer"`
- WCAG 2.2 AA color contrast