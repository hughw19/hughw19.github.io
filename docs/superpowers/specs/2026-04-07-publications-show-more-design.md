---
name: Publications Show More Button
description: Implement Show More/Show Less functionality for selected publications section
type: feature
date: 2026-04-07
---

# Publications Show More/Show Less Feature Design

## Overview

Add a "Show More" button to the SELECTED PUBLICATIONS section that displays the first 10 publications by default, with the ability to expand and collapse the remaining publications using smooth animations.

## Requirements

### Functional Requirements
- Display first 10 publications by default
- "Show More" button appears after the 10th publication
- Clicking "Show More" displays all remaining publications with slide-down animation
- After expansion, button text changes to "Show Less"
- Clicking "Show Less" collapses the list with slide-up animation
- All interactions preserve original publication content and styling

### Visual Requirements
- Button text: "Show More" / "Show Less" (English, consistent)
- Button styling: Maintain consistency with existing action buttons (arXiv, Project, bibtex)
- Button hover effect: Text moves up and changes color (consistent with existing buttons)
- Animation: Slide down on expand, slide up on collapse
- Animation duration: 0.4s with ease-out timing function
- Animation includes fade-in effect for visual smoothness

### Technical Requirements
- Use native HTML `<details>` element for semantic markup and accessibility
- Implement smooth CSS animations using `@keyframes`
- Minimal JavaScript required (native browser behavior for details/summary)
- Maintain lazy-loading images functionality
- Compatible with existing jQuery and CSS infrastructure

## Design Details

### HTML Structure

The SELECTED PUBLICATIONS section will be restructured as follows:

```
SELECTED PUBLICATIONS (title)
├── Publication Item 1-10 (visible by default)
├── <details> wrapper
│   ├── <summary> "Show More" button
│   └── Hidden publications container
│       ├── Publication Item 11-N (initially hidden)
```

### CSS Implementation

**Animation Keyframes:**
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Details Element Styling:**
- Overflow: hidden
- Position: relative (for proper animation context)

**Summary Button Styling:**
- Remove default list-style
- Match existing button font/size/color
- Add cursor: pointer
- Hover state: text color change + upward text shift animation

### Interaction Flow

1. **Initial State**: First 10 publications visible, "Show More" button below
2. **Hover State**: Button text moves up, color changes
3. **Click Expand**: Publications 11-N slide down with fade-in (0.4s animation)
4. **Expanded State**: "Show Less" button displayed
5. **Click Collapse**: Publications 11-N slide up with fade-out (0.4s animation)
6. **Return to Initial**: "Show More" button displayed again

## Implementation Scope

### Files to Modify
- `index.html` - HTML structure reorganization (lines ~1055-2500)
- `css/home11.css` - Animation and button styling

### Lines of Code Impact
- HTML: ~50-100 lines (wrapper restructuring)
- CSS: ~30-40 lines (animations, button styling)
- JavaScript: 0-5 lines (optional event handling if needed)

## Accessibility Considerations

- Native `<details>` element provides semantic meaning for assistive technologies
- Summary element is keyboard accessible (Tab to focus, Enter/Space to toggle)
- Animation respects `prefers-reduced-motion` media query when implemented

## Browser Compatibility

- Modern browsers: Full support for `<details>` element
- Fallback: Progressive enhancement - older browsers show all publications without animation

## Success Criteria

✓ First 10 publications visible on page load
✓ "Show More" button appears after 10th publication
✓ Click "Show More" displays remaining publications with smooth slide-down animation
✓ Button text changes to "Show Less" after expansion
✓ Click "Show Less" collapses publications with smooth slide-up animation
✓ Button hover effect (text moves up, color changes) matches existing buttons
✓ All publication links, images, and bibtex functionality remain intact
✓ Lazy-loading images continue to work properly
