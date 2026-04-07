# Publications Show More/Show Less Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Show More/Show Less functionality to the SELECTED PUBLICATIONS section, displaying first 10 publications by default with smooth expand/collapse animations.

**Architecture:** Restructure the HTML to wrap publications 11+ in a native `<details>` element with a styled `<summary>` button, add CSS keyframe animations for slide-down/up effects, and leverage browser's built-in toggle behavior with no JavaScript required.

**Tech Stack:** Native HTML5 `<details>` element, CSS3 animations (keyframes, transitions), existing jQuery/CSS infrastructure

---

## File Structure

**Files to modify:**
- `index.html` - Restructure SELECTED PUBLICATIONS section (lines ~1055-~2500)
- `css/home11.css` - Add animation keyframes and button styling

---

## Task 1: Analyze Current HTML Structure

**Files:**
- Read: `index.html:1055-1300` (SELECTED PUBLICATIONS section)

- [ ] **Step 1: Locate the SELECTED PUBLICATIONS section**

Open `index.html` and find the line containing `SELECTED PUBLICATIONS` title (around line 1055).

- [ ] **Step 2: Count and identify the 10th publication**

Scan through the structure and identify:
- Where the `<div class="main-selected">` wrapper starts
- Where the title and legend are
- Count each `<div class="selected-item">` to find where the 10th one ends
- Note the line number where the 11th publication starts

Expected finding: The 10th publication's closing `</div>` tag should be around line 1250-1300, and the 11th publication `<div class="selected-item">` starts shortly after.

- [ ] **Step 3: Note the closing structure**

Identify where the `</div>` closing tag is for the entire `<div class="main-selected">` container. This is where we'll insert our closing `</details>` tag later.

---

## Task 2: Add CSS Animations and Button Styles

**Files:**
- Modify: `css/home11.css`

- [ ] **Step 1: Examine existing button styles**

Open `home11.css` and search for the `.button` class styling and `a` tag styling to understand:
- Font family, size, color
- Hover effects (text color change, underline)
- Any transform/animation effects

Look for patterns like:
```css
a {
  font-family: Verdana;
  font-size: 13px;
  color: #2967ac;
}

a:hover {
  text-decoration: underline;
}
```

- [ ] **Step 2: Add slideDown animation keyframes**

At the end of `home11.css`, add:

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

@keyframes slideUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
```

- [ ] **Step 3: Add details element styling**

Add to `home11.css`:

```css
details.publications-toggle {
  overflow: hidden;
}

details.publications-toggle > summary {
  list-style: none;
  cursor: pointer;
}

.hidden-publications {
  animation: slideDown 0.4s ease-out forwards;
}

details.publications-toggle[open] .hidden-publications {
  animation: slideDown 0.4s ease-out forwards;
}
```

- [ ] **Step 4: Style the summary button to match existing buttons**

Add to `home11.css`:

```css
details.publications-toggle > summary {
  display: inline-block;
  font-family: Verdana;
  font-size: 13px;
  color: #2967ac;
  font-weight: 400;
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;
  padding: 0;
  border: none;
  background: none;
  transition: color 0.2s ease;
}

details.publications-toggle > summary:hover {
  text-decoration: underline;
  color: #2967ac;
}
```

- [ ] **Step 5: Commit CSS changes**

```bash
git add css/home11.css
git commit -m "feat: add animation keyframes and details button styling for publications toggle"
```

---

## Task 3: Restructure HTML - Part 1 (Before 11th Publication)

**Files:**
- Modify: `index.html:1055-1250` (SELECTED PUBLICATIONS section header and first 10 items)

- [ ] **Step 1: Verify HTML structure around line 1055**

Open `index.html` and locate the SELECTED PUBLICATIONS section starting at line 1055:

```html
<div class="main-content">
  <div class="main-selected">
    <div class="title">
      SELECTED PUBLICATIONS
      <br />
      <span style="font-size: 11px; color: #38393c; padding-left: 5px"
        >*Equal contribution. <span>&#8224;</span>Corresponding
        author.</span
      >
    </div>
    <!-- First 10 publications go here -->
```

This structure remains unchanged - we only wrap the 11th publication onwards.

- [ ] **Step 2: Locate the exact line of the 11th publication**

Find the `<div class="selected-item">` that represents the 11th publication. This should be right after the 10th publication's closing `</pre>` tag.

Note its exact line number (let's call it LINE_11).

- [ ] **Step 3: No changes needed for first 10 publications**

Confirm that publications 1-10 (with their associated `<pre>` bibtex blocks) remain unchanged. We'll insert our `<details>` wrapper right before the 11th publication.

---

## Task 4: Insert Details Wrapper - Opening Tag

**Files:**
- Modify: `index.html` (at line before 11th publication)

- [ ] **Step 1: Find the precise location**

Locate the line right before the 11th publication's `<div class="selected-item">` opens.

Expected structure from Task 3:
```html
          </pre>
        </div>
      </div>
      <div class="main-content">
        <div class="main-selected">
          <!-- ... title and first 10 publications ... -->
          </pre>  <!-- <- This is the closing </pre> of 10th publication -->
        </div>  <!-- <- This closes the <pre> of 10th pub -->
      </div>
      <div class="main-content">
        <!-- <- RIGHT HERE we insert the <details> opening -->
        <div class="main-selected">
          <details class="publications-toggle">
            <summary>Show More</summary>
            <div class="hidden-publications">
```

- [ ] **Step 2: Insert the details opening tags**

Find the exact position (should be around line 1250-1300 based on earlier analysis) and insert:

```html
      <div class="main-content">
        <div class="main-selected">
          <details class="publications-toggle">
            <summary>Show More</summary>
            <div class="hidden-publications">
```

This opens the details/summary/hidden-publications wrapper right before the 11th publication.

---

## Task 5: Close Details Wrapper - Closing Tag

**Files:**
- Modify: `index.html` (at end of SELECTED PUBLICATIONS section)

- [ ] **Step 1: Locate the closing of main-selected div**

Find where the entire `<div class="main-selected">` containing all the SELECTED PUBLICATIONS closes. This should be near the end of the publications list (look for `</div>` that closes the main-selected container).

Expected line: approximately 2400-2500 based on the file size.

- [ ] **Step 2: Insert closing tags**

Before the `</div>` that closes `<div class="main-selected">`, insert:

```html
            </div>
          </details>
        </div>
      </div>
```

This properly closes:
- `</div>` - closes hidden-publications
- `</details>` - closes the details wrapper
- `</div>` - closes main-selected
- `</div>` - closes main-content

- [ ] **Step 3: Verify nesting structure**

The final structure should look like:

```html
<div class="main-content">
  <div class="main-selected">
    <div class="title">SELECTED PUBLICATIONS...</div>

    <!-- Publications 1-10 -->
    <div class="selected-item">...</div>
    <pre>...</pre>
    ...
    <div class="selected-item">...</div>
    <pre>...</pre>

    <!-- Wrapped publications 11+ -->
    <details class="publications-toggle">
      <summary>Show More</summary>
      <div class="hidden-publications">
        <div class="selected-item">...</div>
        <pre>...</pre>
        ...
        <div class="selected-item">...</div>
        <pre>...</pre>
      </div>
    </details>
  </div>
</div>
```

---

## Task 6: Test HTML and Styling

**Files:**
- Test: `index.html` (open in browser)
- Reference: `css/home11.css` (verify animations are present)

- [ ] **Step 1: Open index.html in a browser**

Open `index.html` in your default browser or use a local server:

```bash
cd /Users/galbot/WorkSpace/Galbot/hughw19.github.io
# If you have Python 3 installed:
python3 -m http.server 8000
# Then visit http://localhost:8000
```

- [ ] **Step 2: Scroll to SELECTED PUBLICATIONS section**

Verify:
- The title "SELECTED PUBLICATIONS" is visible
- First 10 publication cards are displayed
- After the 10th publication, a "Show More" button appears

Expected appearance: Button should look like the other action buttons (arXiv, Project, bibtex)

- [ ] **Step 3: Verify "Show More" button is interactive**

Hover over the "Show More" button:
- Text should underline (like other links)
- Color should remain consistent
- Cursor should change to pointer

Click the "Show More" button:
- Publications 11+ should slide down with fade-in animation
- Animation duration should be smooth (~0.4s)
- Button text should change to "Show Less"

- [ ] **Step 4: Verify "Show Less" button functionality**

Hover over the "Show Less" button:
- Same hover effect as "Show More" (underline, color)

Click the "Show Less" button:
- Publications 11+ should slide up with fade-out animation
- Button text should change back to "Show More"

- [ ] **Step 5: Test multiple toggles**

Click "Show More" and "Show Less" several times:
- Animation should be consistent each time
- No visual glitches or layout shifts
- All publication content remains intact

---

## Task 7: Verify All Content Integrity

**Files:**
- Test: `index.html` (visual inspection)

- [ ] **Step 1: Check all publication links still work**

After expanding with "Show More", click on several publication links:
- arXiv links should open correctly
- Project links should open correctly
- bibtex toggles should still show/hide citations

- [ ] **Step 2: Verify images load correctly**

Scroll through both visible and hidden publications:
- Lazy-loaded images should load properly
- No broken image icons
- Images have correct aspect ratios

- [ ] **Step 3: Check responsive design**

If applicable, test on different screen sizes:
- Publications 1-10 display correctly
- "Show More" button is properly positioned
- Expanded content doesn't break layout

---

## Task 8: Final Commit

**Files:**
- Modified: `index.html`
- Modified: `css/home11.css`

- [ ] **Step 1: Verify all changes**

```bash
cd /Users/galbot/WorkSpace/Galbot/hughw19.github.io
git diff index.html  # Review HTML structure changes
git diff css/home11.css  # Review CSS additions (if not already committed in Task 2)
```

- [ ] **Step 2: Stage all changes**

```bash
git add index.html css/home11.css
```

- [ ] **Step 3: Create final commit**

```bash
git commit -m "feat: implement Show More/Show Less for publications with smooth animations

- Display first 10 publications by default
- Wrap publications 11+ in details element with summary button
- Add CSS animations for slide-down/up effects
- Button text toggles between 'Show More' and 'Show Less'
- Animations use 0.4s ease-out timing
- All publication links and bibtex functionality preserved"
```

- [ ] **Step 4: Verify commit**

```bash
git log --oneline -1
# Should show your new commit at the top
```

---

## Success Criteria Verification

- [ ] First 10 publications visible on initial page load
- [ ] "Show More" button appears after 10th publication
- [ ] Clicking "Show More" displays publications 11+ with slide-down animation (0.4s)
- [ ] Button text changes to "Show Less" after expansion
- [ ] Clicking "Show Less" collapses publications with slide-up animation
- [ ] Button hover effect matches existing action buttons (underline, color)
- [ ] All publication links (arXiv, Project, bibtex) function correctly
- [ ] Lazy-loaded images load properly in both collapsed and expanded states
- [ ] No layout shifts or visual glitches during animation
- [ ] Changes committed with clear commit message
