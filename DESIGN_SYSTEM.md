# SympatHelmet Design System

A professional, medical-grade design system with dual theme support (Dark/Light) and futuristic aesthetics inspired by Black Mirror's clean, minimalist approach to technology interfaces.

## Overview

This design system is built on React, Tailwind CSS, and shadcn/ui components, providing a consistent, accessible, and highly customizable interface for medical neural immersion technology.

## Theme Architecture

### Dark Theme (Default)
- **Aesthetic**: Retro-futuristic medical with warm orange/teal accents
- **Use Case**: Reduced eye strain, immersive sessions, low-light environments
- **Primary Colors**: Space Age Orange (#FF8C42), Atomic Turquoise (#5DDCDC)

### Light Theme
- **Aesthetic**: Clean, professional medical interface
- **Use Case**: Clinical environments, documentation, high-visibility needs
- **Primary Colors**: Medical Blue (#0066CC), Professional Teal (#2E9999)

## Design Tokens

All design tokens are defined as CSS variables in `src/index.css`. Values use HSL color format for maximum flexibility.

### Color Variables

```css
/* Core Colors */
--background: Main app background
--foreground: Primary text color
--card: Card background color
--card-foreground: Card text color

/* Brand Colors */
--primary: Primary brand color (buttons, key actions)
--primary-foreground: Text color on primary background
--secondary: Secondary brand color (accents, highlights)
--secondary-foreground: Text color on secondary background
--accent: Tertiary accent color (special highlights)
--accent-foreground: Text color on accent background

/* Semantic Colors */
--destructive: Error/danger states (red)
--destructive-foreground: Text on error background
--warning: Warning/caution states (yellow/orange)
--warning-foreground: Text on warning background

/* UI Elements */
--muted: Subtle backgrounds, disabled states
--muted-foreground: Subtle text, placeholders
--border: Border colors for containers
--input: Input field borders and backgrounds
--ring: Focus ring colors for accessibility
```

### Gradients

```css
--gradient-dark: Main background gradient
--gradient-retro: Accent gradient for special UI elements
--gradient-atomic: Radial glow effect for emphasis
```

### Glow Effects

```css
--glow-primary: Primary color glow (buttons, important elements)
--glow-secondary: Secondary color glow (accents)
--glow-destructive: Error state glow
--glow-warning: Warning state glow
--glow-atomic: Special accent glow
```

## Typography

### Font Families

**Primary: Orbitron**
- Usage: Headers (h1-h4), titles, technical labels
- Weights: 400, 500, 600, 700, 800, 900
- Characteristics: Geometric, futuristic, highly readable

**Secondary: Space Mono**
- Usage: Body text, data displays, monospace content
- Weights: 400, 700
- Characteristics: Monospace, technical, precise

### Typography Scale

```css
h1: 1.75rem (28px) | Bold | Orbitron
h2: 1.5rem (24px) | Semibold | Orbitron  
h3: 1.125rem (18px) | Medium | Orbitron
h4: 1rem (16px) | Medium | Orbitron
p: 0.875rem (14px) | Regular | Space Mono
```

## Component Patterns

### Glassmorphism Cards

Standard card style with blur and transparency:

```tsx
<div className="glassmorphism-card-neu p-6 rounded-2xl border border-primary/30">
  {/* Card content */}
</div>
```

Variants:
- `.glassmorphism`: Subtle background blur
- `.glassmorphism-card-neu`: Standard medical card
- `.glassmorphism-card-inm`: Immersion-specific card
- `.glassmorphism-head`: Header navigation style

### Buttons

```tsx
// Primary action
<Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary">

// Secondary action  
<Button variant="outline" className="border-primary/30 hover:border-primary">

// Destructive action
<Button variant="destructive" className="glow-destructive">
```

### Status Indicators

```tsx
// Connected state
<span className="text-primary animate-pulse">Connected</span>

// Paused state
<span className="text-warning">Paused</span>

// Disconnected state
<span className="text-muted-foreground">Disconnected</span>
```

## Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: > 1280px

### Grid Layouts

```tsx
// Responsive 2-column layout
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
  {/* Cards automatically wrap */}
</div>

// Constrained width for readability
<div className="max-w-5xl mx-auto">
  {/* Content not too wide on large screens */}
</div>
```

## Accessibility (WCAG Compliance)

### Color Contrast
- All text meets WCAG AA standards (4.5:1 for normal text)
- Interactive elements meet WCAG AAA where possible (7:1)

### Focus States
- All interactive elements have visible focus indicators
- Focus ring uses `--ring` color variable
- Keyboard navigation fully supported

### ARIA Labels
- All buttons include `aria-label` attributes
- Interactive regions marked with proper roles
- Status updates use `aria-live` regions

### Keyboard Navigation
```tsx
// Standard pattern for custom buttons
<button
  onClick={handleAction}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAction();
    }
  }}
  role="button"
  tabIndex={0}
  aria-label="Descriptive action label"
>
```

## Animation System

### Keyframe Animations

Available in `tailwind.config.ts`:

```javascript
animate-float: Gentle floating effect
animate-pulse-glow: Pulsing glow for emphasis
animate-slide-in: Slide in from left
animate-fade-in: Fade in transition
animate-shimmer: Shimmer loading effect
animate-particle-float: Particle floating animation
```

### Transition Guidelines

- Use `transition-all duration-300` for smooth state changes
- Hover effects: 200ms duration
- Page transitions: 500ms duration
- Glow effects: 2s infinite pulse

## Customization Guide

### Changing Theme Colors

**Step 1**: Edit `src/index.css`

```css
:root {
  /* Change primary brand color */
  --primary: 25 95% 58%; /* HSL: Hue Saturation% Lightness% */
  
  /* Update corresponding glow */
  --glow-primary: 0 0 30px hsl(25 95% 58% / 0.6), 0 0 60px hsl(25 95% 58% / 0.3);
}
```

**Step 2**: Update light theme if needed

```css
.light {
  --primary: 210 100% 45%; /* Different shade for light mode */
}
```

### Adding New Color Variants

**Step 1**: Add to `src/index.css`

```css
:root {
  --custom: 280 70% 55%; /* Your custom color */
  --custom-foreground: 0 0% 100%;
}
```

**Step 2**: Add to `tailwind.config.ts`

```typescript
colors: {
  custom: {
    DEFAULT: "hsl(var(--custom))",
    foreground: "hsl(var(--custom-foreground))",
  },
}
```

**Step 3**: Use in components

```tsx
<div className="bg-custom text-custom-foreground">
  Custom colored element
</div>
```

### Adjusting Glassmorphism

Modify transparency and blur in `src/index.css`:

```css
.glassmorphism-card-neu {
  background: rgba(255, 255, 255, 0.05); /* Adjust transparency */
  backdrop-filter: blur(10px); /* Adjust blur amount */
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## Best Practices

### Color Usage
✅ **Do:**
- Use semantic color tokens (`bg-primary`, `text-foreground`)
- Maintain consistent opacity levels (`/30`, `/50`, `/90`)
- Test both dark and light themes

❌ **Don't:**
- Use hardcoded colors (`bg-[#FF0000]`)
- Mix RGB and HSL formats
- Ignore color contrast ratios

### Layout
✅ **Do:**
- Use responsive grid classes
- Set max-widths for large screens (`max-w-5xl`)
- Test on mobile, tablet, and desktop

❌ **Don't:**
- Create fixed-width layouts
- Assume desktop-first design
- Ignore touch targets on mobile

### Accessibility
✅ **Do:**
- Include ARIA labels on all interactive elements
- Test keyboard navigation
- Verify color contrast

❌ **Don't:**
- Rely solely on color to convey information
- Create keyboard traps
- Ignore focus indicators

## File Structure

```
src/
├── index.css              # Design system variables & global styles
├── components/
│   ├── ThemeToggle.tsx   # Light/dark mode switcher
│   └── ui/               # shadcn/ui base components
├── pages/
│   ├── Landing.tsx       # Animated landing page
│   ├── Login.tsx         # Doctor authentication
│   ├── PatientSelection.tsx
│   └── Immersion.tsx
└── App.tsx               # Routing configuration

tailwind.config.ts        # Tailwind theme extensions
```

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [HSL Color Picker](https://hslpicker.com/)

## Support

For questions about the design system or customization needs, refer to this documentation or examine the implemented patterns in the codebase.
