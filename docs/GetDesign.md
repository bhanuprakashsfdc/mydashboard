# Design System — MyDashboard

## Visual Language

### Typography
- **Font stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- **Grid text:** 13px, regular weight, line-height 1.5
- **UI labels:** 13px, medium weight
- **Headings:** 20-24px, semibold
- **Muted:** 12px, regular

### Spacing scale
Base unit: 4px
- 4, 8, 12, 16, 20, 24, 32, 48

### Border radius
- Small: 4px (chips, inputs)
- Medium: 6px (buttons, cards)
- Large: 8px (panels)
- Full: 9999px (badges, pills)

### Shadows
Minimal shadows. Use subtle borders (`#e2e8f0`) for separation rather than elevation.

### Icons
Inline SVG, 14-16px, stroke-based for UI icons, filled for status indicators.

### Grid density
- Compact rows (10px vertical padding)
- No unnecessary whitespace
- Progressive disclosure via column visibility

---

## Colors

### Semantic palette

| Token | Value | Usage |
|---|---|---|
| Background | `#f8fafc` | Page background |
| Surface | `#ffffff` | Cards, panels, inputs |
| Primary | `#2563eb` | Links, active states, focus rings |
| Secondary | `#475569` | Secondary text, inactive elements |
| Text | `#0f172a` | Primary text |
| Muted text | `#64748b` | Secondary text |
| Border | `#e2e8f0` | Borders, dividers |
| Success | `#10b981` | Active status |
| Warning | `#f59e0b` | Inactive, medium priority |
| Error | `#ef4444` | Archived, high priority |
| Info | `#3b82f6` | Focus rings, info states |

### Category colors
- Coding: `#3b82f6`
- Work: `#10b981`
- AI: `#8b5cf6`
- Development: `#f59e0b`
- Design: `#ec4899`
- Productivity: `#06b6d4`
- Finance: `#84cc16`
- Learning: `#f97316`
- Other: `#6b7280`

---

## Components

### Buttons
- Primary: filled blue, white text
- Secondary: white with border
- Ghost: transparent, hover background
- Danger: white with red border/text

### Inputs
- 32px height, 6px border radius
- Blue focus ring (3px offset)
- Placeholder: `#94a3b8`

### Checkboxes
- 16px visual, 3px border radius
- Blue checked state
- Indeterminate state supported

### Badges
- Pill shape, 9999px radius
- Semantic variants: success, warning, error, info, default

### Table
- Sticky headers with subtle background
- 10px vertical padding per row
- Hover state: `#f8fafc`
- Selected row: `#eff6ff`

### Filter panel
- Collapsible sections
- Multi-select checkboxes
- Clear-all action when filters active

### Empty state
- Centered icon + title + description
- Optional action button

### Selection toolbar
- Animated slide-in
- Count display + actions
- Blue background tint

---

## Responsive Design

### Desktop (>= 1024px)
- Full filter panel visible
- Multi-column table
- Horizontal scroll for overflow

### Tablet (768px - 1023px)
- Collapsible filter drawer
- Reduced visible columns
- Stacked toolbars

### Mobile (< 768px)
- Filter drawer/sheet
- Single column card layout for grid rows (future)
- Preserve search and selection
- Avoid horizontal scroll where possible

---

## Accessibility

- All interactive elements keyboard accessible
- Visible focus states (2px blue outline)
- Semantic HTML (table, th, buttons)
- Accessible labels on inputs
- Checkbox inputs with visual indicators
- `aria-live` regions for selection count
- `aria-sort` on sortable headers
- `target="_blank"` with `rel="noopener noreferrer"`
