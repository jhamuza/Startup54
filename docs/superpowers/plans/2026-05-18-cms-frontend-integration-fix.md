# CMS Frontend Integration Fix — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix Decap CMS integration so frontend renders correctly when CMS data is edited and published. Eliminate React key warnings, add loading state tracking, add error handling, and defer component rendering until data is ready.

**Architecture:** 
- Fix React key duplication in Footer by using unique labels instead of duplicate hrefs
- Add explicit loading state tracking (`window.CMS_DATA_STATUS`) in data.js
- Add error logging and status exposure in data.js
- Defer App rendering in app.jsx until `loadCMSData()` Promise resolves
- Keep existing guards in components (map.jsx already checks for empty EVENTS)

**Tech Stack:** React 18 (via CDN), Babel JSX transpilation, vanilla JavaScript (no build tools)

---

## Task 1: Fix React Key Duplication in Footer

**Files:**
- Modify: `public/sections.jsx:476, 490`

- [ ] **Step 1: Read Footer component**

Lines 468-495 in public/sections.jsx contain the Footer with two `.map()` calls that render links.

- [ ] **Step 2: Fix "Links" section keys (line 476)**

Change:
```javascript
<a key={href} href={href} style={{...}}>{label}</a>
```

To:
```javascript
<a key={label} href={href} style={{...}}>{label}</a>
```

- [ ] **Step 3: Fix "Follow" section keys (line 490)**

Same change:
```javascript
<a key={href} href={href} style={{...}}>{label}</a>
```

To:
```javascript
<a key={label} href={href} style={{...}}>{label}</a>
```

- [ ] **Step 4: Commit**

```bash
git add public/sections.jsx
git commit -m "fix: use unique labels as React keys in Footer links"
```

---

## Task 2: Add Loading State Tracking to data.js

**Files:**
- Modify: `public/data.js:1-10`

- [ ] **Step 1: Add state variables at top of data.js**

After the globals declaration (after line 7), add:

```javascript
let dataLoadError = null;
let dataLoadStarted = false;
```

And declare the status on window:

```javascript
window.CMS_DATA_STATUS = 'idle';
```

- [ ] **Step 2: Update loadCMSData() to track state**

Modify the function to set status at start and end. Change line 9 from:

```javascript
async function loadCMSData() {
  try {
```

To:

```javascript
async function loadCMSData() {
  window.CMS_DATA_STATUS = 'loading';
  dataLoadStarted = true;
  try {
```

- [ ] **Step 3: Update success path to set status**

After line 35 (after the console.log), add:

```javascript
window.CMS_DATA_STATUS = 'loaded';
dataLoadError = null;
```

- [ ] **Step 4: Update error path to track error**

Change the catch block (lines 37-40) from:

```javascript
catch (error) {
  console.error('Failed to load CMS data:', error);
  return false;
}
```

To:

```javascript
catch (error) {
  console.error('Failed to load CMS data:', error);
  dataLoadError = error;
  window.CMS_DATA_STATUS = 'error';
  return false;
}
```

- [ ] **Step 5: Make loadCMSData() return a Promise**

Change line 44 from:

```javascript
loadCMSData();
```

To:

```javascript
const dataLoadPromise = loadCMSData();
window.CMS_DATA_PROMISE = dataLoadPromise;
```

- [ ] **Step 6: Commit**

```bash
git add public/data.js
git commit -m "feat: add loading state tracking to data.js"
```

---

## Task 3: Defer App Rendering Until Data Loads

**Files:**
- Modify: `public/app.jsx:28-30`

- [ ] **Step 1: Read app.jsx render section**

Lines 28-30 show the App rendering with `ReactDOM.hydrateRoot`.

- [ ] **Step 2: Wrap render in data load check**

Change from:

```javascript
const root = ReactDOM.hydrateRoot(document.getElementById('app'), <App />);
```

To:

```javascript
// Wait for CMS data to load before rendering
(async () => {
  await window.CMS_DATA_PROMISE;
  const root = ReactDOM.hydrateRoot(document.getElementById('app'), <App />);
})();
```

This ensures data.js finishes loading before React renders the App.

- [ ] **Step 3: Verify app.jsx still has App import**

Check line 1 has `App` in the globals comment:

```javascript
/* global React, ReactDOM, App, LOGO */
```

- [ ] **Step 4: Commit**

```bash
git add public/app.jsx
git commit -m "fix: defer App rendering until CMS data loads"
```

---

## Task 4: Test All Changes Locally

**Files:**
- No code changes, verification only

- [ ] **Step 1: Build and test locally**

```bash
npm run build
cd dist && python3 -m http.server 8000
```

Visit http://localhost:8000 and check browser DevTools Console.

- [ ] **Step 2: Verify no React key warnings**

Open DevTools Console (F12), reload page. Should see 0 warnings containing "key `#`". Only message should be:
- "✓ CMS data loaded: {EVENTS: ..., SUPPORTERS: ..., etc}"

- [ ] **Step 3: Verify all sections render**

Scroll through page and confirm:
- ✅ Hero section displays
- ✅ Events/Map section displays (should show 4 events)
- ✅ Journey section displays (3 days)
- ✅ Why section displays (6 props)
- ✅ Supporters section displays (6 logos including "Random")
- ✅ CTA section displays
- ✅ Footer displays with no key warnings

- [ ] **Step 4: Verify error handling**

In DevTools Console, simulate network failure:

```javascript
// Simulate error
window.CMS_DATA_STATUS = 'error';
console.log('Current status:', window.CMS_DATA_STATUS);
```

Should show error state tracked. Real error handling tested after deploy.

- [ ] **Step 5: Commit (no code, just verification)**

No new commit needed for verification, but log results:

```bash
# Document test results
echo "✓ All local tests pass: no React warnings, all sections render" > /tmp/test-results.txt
```

---

## Task 5: Deploy and Verify on Live Site

**Files:**
- No code changes, deploy verification only

- [ ] **Step 1: Push changes to main**

```bash
git push
```

- [ ] **Step 2: Wait for Vercel deployment**

Check vercel.com/dashboard. Deployment should succeed in 1-2 minutes.

- [ ] **Step 3: Test live site**

Visit https://startup54.com and:
- ✅ Open DevTools Console (F12)
- ✅ Reload page
- ✅ Check for errors: should see only "✓ CMS data loaded:" message, NO warnings
- ✅ Scroll through entire page
- ✅ Verify all sections render correctly (Hero, Map, Journey, Why, Supporters, CTA, Footer)
- ✅ Verify Supporters has "Random" entry (from earlier CMS edit)

- [ ] **Step 4: Test CMS integration end-to-end**

1. Login to /admin
2. Edit Supporters: add/remove/modify an entry
3. Click Publish
4. Wait for Vercel to deploy
5. Reload https://startup54.com
6. Verify new changes appear in Supporters section
7. Check DevTools Console: no errors

- [ ] **Step 5: Final verification**

Run this in DevTools Console to confirm state:

```javascript
console.log('CMS Status:', window.CMS_DATA_STATUS);
console.log('Events loaded:', EVENTS.length);
console.log('Supporters loaded:', SUPPORTERS.length);
console.log('All data:', { EVENTS, JOURNEY_DAYS, WHY_PROPS, SUPPORTERS, HERO_DATA, CTA_DATA });
```

Expected:
- CMS Status: 'loaded'
- Events: 4
- Supporters: 6
- All data populated with no undefined fields

---

## Success Checklist

- ✅ React key warnings eliminated (no "same key `#`" warning)
- ✅ Data loading state tracked (`window.CMS_DATA_STATUS`)
- ✅ Error handling in place (dataLoadError captured)
- ✅ App defers rendering until data loads (no race conditions)
- ✅ All sections render correctly on page load
- ✅ Supporters section shows all 6 entries
- ✅ Map renders with Events data
- ✅ CMS edit → publish → Vercel deploy → frontend update works end-to-end
- ✅ No console errors after all changes
