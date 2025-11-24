# Breakpoint Boundary Analysis

## Problem Statement

Medium videos (720-959px) are not showing. Large videos show at 960px.

## Hypothesis: Off-by-One Error

Adapt's `device.screenSize` breakpoint boundaries might be:
- Small: 0-720px (instead of 0-719px)
- Medium: 721-960px (instead of 720-959px)
- Large: 961-1280px (instead of 960-1279px)
- Extra Large: 1281px+ (instead of 1280px+)

## Verification Needed

Test at these exact widths:
- 719px - Should be small
- 720px - Should be medium (CRITICAL TEST)
- 959px - Should be medium
- 960px - Should be large (CRITICAL TEST)
- 1279px - Should be large
- 1280px - Should be xlarge (CRITICAL TEST)

## Console Output Analysis

When testing, check console for:
```
BackgroundVideo Debug: {
  _screenSize: "???",
  device.screenSize: "???",
  used: "???",
  viewport: "???px"
}
```

## Expected vs Actual

| Width | Expected Size | Actual Size (from console) | Match? |
|-------|---------------|----------------------------|--------|
| 719px | small | ? | ? |
| 720px | medium | ? | ? |
| 959px | medium | ? | ? |
| 960px | large | ? | ? |
| 1279px | large | ? | ? |
| 1280px | xlarge | ? | ? |

## If Boundaries Are Off

If Adapt uses:
- `width < 720` for small → 720px would be medium ✅
- `width <= 720` for small → 720px would be small ❌

Similarly for other breakpoints.

## Solution Options

### Option 1: Adjust Our Expectations
Document that:
- Small: up to 720px (inclusive)
- Medium: 721-960px
- Large: 961-1280px
- Extra Large: 1281px+

### Option 2: Add +1px Adjustment
Adjust our switch statement to account for Adapt's boundaries.

### Option 3: Report Bug to Adapt
If Adapt's boundaries don't match documentation.
