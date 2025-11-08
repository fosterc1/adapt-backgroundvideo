# Background Video - CSS Customization Guide

This extension uses **CSS Custom Properties (variables)** for easy styling customization. You can override any of these variables in your theme's custom CSS.

## Available CSS Variables

### Button Position & Size

```css
.backgroundvideo {
  --button-size: 3.125rem;                    /* Button width/height (default: 50px) */
  --button-position-bottom: 1.25rem;          /* Distance from bottom (default: 20px) */
  --button-position-right: 1.25rem;           /* Distance from right (default: 20px) */
  --button-z-index: 9999;                     /* Stacking order */
}
```

### Button Colors

```css
.backgroundvideo {
  --button-bg-color: rgba(0, 0, 0, 0.7);      /* Background color */
  --button-bg-color-hover: rgba(0, 0, 0, 0.9); /* Hover background color */
  --button-border-width: 0.125rem;            /* Border width (default: 2px) */
  --button-border-color: rgba(255, 255, 255, 0.8); /* Border color */
  --button-text-color: white;                 /* Icon color */
}
```

### Button Typography & Effects

```css
.backgroundvideo {
  --button-font-size: 1.25rem;                /* Icon size (default: 20px) */
  --button-hover-scale: 1.1;                  /* Scale on hover */
  --button-transition: all 0.3s ease;         /* Transition effect */
  --button-focus-outline-width: 0.125rem;     /* Focus outline width */
  --button-focus-outline-offset: 0.125rem;    /* Focus outline offset */
}
```

## Customization Examples

### Example 1: Move Button to Bottom Left

```css
.backgroundvideo {
  --button-position-right: auto;
  --button-position-left: 1.25rem;
}

.backgroundvideo__playpause {
  left: var(--button-position-left);
  right: auto;
}
```

### Example 2: Larger Blue Button

```css
.backgroundvideo {
  --button-size: 4rem;                        /* 64px */
  --button-font-size: 1.5rem;                 /* 24px */
  --button-bg-color: rgba(0, 100, 255, 0.8);  /* Blue */
  --button-bg-color-hover: rgba(0, 100, 255, 1); /* Solid blue on hover */
  --button-border-color: white;
}
```

### Example 3: Subtle Minimal Button

```css
.backgroundvideo {
  --button-size: 2.5rem;                      /* 40px - smaller */
  --button-bg-color: rgba(255, 255, 255, 0.3); /* Light transparent */
  --button-bg-color-hover: rgba(255, 255, 255, 0.5); /* Slightly more opaque */
  --button-border-width: 0.0625rem;           /* 1px - thinner border */
  --button-border-color: rgba(0, 0, 0, 0.3);  /* Dark border */
  --button-text-color: #333;                  /* Dark icon */
  --button-hover-scale: 1.05;                 /* Subtle scale */
}
```

### Example 4: High Contrast for Accessibility

```css
.backgroundvideo {
  --button-bg-color: rgba(0, 0, 0, 1);        /* Solid black */
  --button-bg-color-hover: rgba(255, 255, 255, 1); /* Solid white on hover */
  --button-border-width: 0.1875rem;           /* 3px - thicker */
  --button-border-color: white;
  --button-text-color: white;
}

.backgroundvideo__playpause:hover {
  --button-text-color: black;                 /* Black icon on white hover */
}
```

### Example 5: Top Right Position

```css
.backgroundvideo {
  --button-position-bottom: auto;
  --button-position-top: 1.25rem;
}

.backgroundvideo__playpause {
  top: var(--button-position-top);
  bottom: auto;
}
```

### Example 6: No Animation (Static Button)

```css
.backgroundvideo {
  --button-hover-scale: 1;                    /* No scaling */
  --button-transition: none;                  /* No transition */
}
```

### Example 7: Brand Colors

```css
.backgroundvideo {
  --button-bg-color: rgba(231, 76, 60, 0.85);  /* Brand red */
  --button-bg-color-hover: rgba(231, 76, 60, 1); /* Solid on hover */
  --button-border-color: rgba(255, 255, 255, 0.9);
  --button-text-color: white;
  --button-size: 3.5rem;                       /* 56px */
}
```

### Example 8: Outlined Button

```css
.backgroundvideo {
  --button-bg-color: transparent;              /* No background */
  --button-bg-color-hover: rgba(255, 255, 255, 0.2); /* Subtle hover */
  --button-border-width: 0.1875rem;            /* 3px thick border */
  --button-border-color: white;
  --button-text-color: white;
}
```

## Advanced Customization with Direct CSS

### Custom Box Shadow

```css
.backgroundvideo__playpause {
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);
}

.backgroundvideo__playpause:hover {
  box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.4);
}
```

### Custom Shape (Square Button)

```css
.backgroundvideo__playpause {
  border-radius: 0.5rem;  /* Rounded square instead of circle */
}
```

### Custom Backdrop Filter (Blur Effect)

```css
.backgroundvideo__playpause {
  backdrop-filter: blur(0.625rem);
  background-color: rgba(0, 0, 0, 0.3);  /* More transparent with blur */
}
```

### Pulse Animation

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.is-backgroundvideo-paused .backgroundvideo__playpause {
  animation: pulse 2s ease-in-out infinite;
}
```

## Responsive Customization

Override variables at different breakpoints:

```css
/* Desktop (default values already set) */

/* Tablet */
@media (max-width: 56.25rem) {  /* 900px */
  .backgroundvideo {
    --button-size: 2.75rem;      /* 44px */
    --button-font-size: 1.125rem; /* 18px */
  }
}

/* Mobile */
@media (max-width: 32.5rem) {  /* 520px */
  .backgroundvideo {
    --button-size: 2.5rem;       /* 40px */
    --button-position-bottom: 1rem; /* 16px */
    --button-position-right: 1rem;  /* 16px */
    --button-font-size: 1rem;    /* 16px */
  }
}
```

## Component-Specific Styling

Target specific instances using component ID or custom classes:

```css
/* Style a specific component by ID */
#c-105 .backgroundvideo {
  --button-bg-color: rgba(255, 0, 0, 0.8);
}

/* Style using custom classes (add via _classes property) */
.my-custom-video .backgroundvideo {
  --button-size: 4rem;
  --button-bg-color: rgba(0, 200, 0, 0.8);
}
```

## Dark Mode Support

```css
/* Light mode (default) */
.backgroundvideo {
  --button-bg-color: rgba(0, 0, 0, 0.7);
  --button-text-color: white;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .backgroundvideo {
    --button-bg-color: rgba(255, 255, 255, 0.7);
    --button-text-color: black;
    --button-border-color: rgba(0, 0, 0, 0.8);
  }
}

/* Or use a class-based approach */
.dark-theme .backgroundvideo {
  --button-bg-color: rgba(255, 255, 255, 0.7);
  --button-text-color: black;
}
```

## Where to Add Custom CSS

### In Adapt Framework:

1. **Theme LESS file**: Add to `src/theme/[your-theme]/less/theme.less`
2. **Custom CSS file**: Create `src/theme/[your-theme]/less/custom.less`
3. **Extension override**: Create `src/theme/[your-theme]/less/backgroundVideo.less`

### In Adapt Authoring Tool:

1. Navigate to **Project Settings**
2. Go to **Theme Settings**
3. Find **Custom CSS/LESS** section
4. Add your custom variables/styles

### Direct CSS Override:

Add to your course's `index.html` or main stylesheet:

```html
<style>
  .backgroundvideo {
    --button-size: 3.5rem;
    --button-bg-color: rgba(0, 100, 255, 0.8);
    /* Your custom variables */
  }
</style>
```

## Video Container Customization

You can also customize the video container itself:

```css
/* Adjust video positioning */
.backgroundvideo__container video,
.backgroundvideo__container img {
  object-fit: cover;           /* cover, contain, fill, none */
  object-position: center bottom; /* Change alignment */
}

/* Add overlay effect */
.backgroundvideo::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); /* Dark overlay */
  pointer-events: none;
}
```

## Browser Support

CSS Custom Properties are supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+
- iOS Safari 9.3+
- Android Chrome 49+

For older browsers, the fallback values in the CSS will be used.

## Tips

1. **Use rem units** for better scalability and accessibility
2. **Test on mobile** devices to ensure button is easily tappable (min 44px recommended)
3. **Consider contrast** for accessibility (WCAG AA: 4.5:1 ratio minimum)
4. **Use CSS variables** for easy global changes across multiple videos
5. **Preview before publishing** to ensure button placement doesn't obscure important content
6. **Respect reduced motion** preferences - the extension handles this automatically
7. **Test keyboard navigation** - ensure focus indicators are visible

## Common Use Cases

### Video Hero Banner
```css
/* Large, prominent button for hero sections */
.backgroundvideo {
  --button-size: 4rem;
  --button-bg-color: rgba(0, 0, 0, 0.5);
  --button-position-bottom: 2rem;
  --button-position-right: 2rem;
}
```

### Subtle Background Video
```css
/* Minimal button that doesn't distract */
.backgroundvideo {
  --button-size: 2.5rem;
  --button-bg-color: rgba(255, 255, 255, 0.2);
  --button-border-width: 0.0625rem;
  --button-hover-scale: 1;
}
```

### Brand-Focused Design
```css
/* Match your brand colors */
.backgroundvideo {
  --button-bg-color: var(--brand-primary-color);
  --button-bg-color-hover: var(--brand-primary-dark);
  --button-text-color: var(--brand-text-color);
}
```

## Need Help?

If you need assistance with customization, check:
- The extension's `less/backgroundVideo.less` file for default styles
- Your theme's documentation for CSS override locations
- Adapt Framework documentation for theme customization
- [Adapt Community Forums](https://community.adaptlearning.org/)

---

**Version:** 2.4.0  
**Last Updated:** 2025-11-08
