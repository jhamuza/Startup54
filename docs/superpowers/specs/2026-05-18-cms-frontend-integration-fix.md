# Fix Decap CMS Frontend Integration

> **For agentic workers:** Use superpowers:writing-plans to create implementation plan for this spec.

**Goal:** Fix Decap CMS integration so frontend renders correctly when CMS data is edited and published.

**Root Causes Identified:**
1. React key duplication in Footer "Follow" section (all social links have key="#")
2. Data loading race condition (components render before CMS data loads)
3. No error handling if CMS data fails to load

**Architecture:** Frontend will safely load CMS data with proper error handling, components will wait for data before rendering, and all React keys will be unique to prevent rendering bugs.

---

## Design Details

### Issue 1: React Key Duplication

**Current State:**
Footer component (public/sections.jsx, lines 485-494) renders social links with duplicate keys:
```javascript
{[
  ["Twitter", "#"],
  ["Instagram", "#"],
  ["LinkedIn", "#"],
].map(([label, href]) => (
  <a key={href} href={href} ...>{label}</a>
))}
```

All three links have `key="#"` because href is "#" for all. React requires unique keys, causing warning: "Encountered two children with the same key `#`".

**Impact:** React rendering warnings, potential missed updates when component state changes.

**Solution:** Replace `key={href}` with `key={label}`. Labels ("Twitter", "Instagram", "LinkedIn") are unique and stable.

**Implementation:**
- Line 476: Change `key={href}` to `key={label}` in "Links" section
- Line 490: Change `key={href}` to `key={label}` in "Follow" section

### Issue 2: Data Loading Race Condition

**Current State:**
- data.js calls `loadCMSData()` immediately (line 44)
- Fetch requests are async but React components render synchronously
- Map component logs "EVENTS not loaded yet" → renders with empty data
- CMS data takes 100-300ms to fetch, but page renders immediately

**Impact:** Components attempt to render before data loads, showing blank/missing sections until data arrives.

**Solution:** Add `await` pattern to ensure data loads before critical components render.

**Implementation:**
- Modify data.js to return a Promise from `loadCMSData()`
- Add explicit wait in app.jsx or use `onload` callback to render only after data is ready
- Keep existing guard in map.jsx: `if (!EVENTS || EVENTS.length === 0) return;`

### Issue 3: Missing Error Handling

**Current State:**
- data.js catches fetch errors but silently logs them (line 38-39)
- If all CMS fetches fail, globals remain as empty arrays/objects
- Components don't know if data failed to load vs. is still loading
- No recovery mechanism if CMS is unreachable

**Impact:** Silent failures, sections show empty/broken state with no user feedback.

**Solution:** Add error boundary and explicit error state tracking.

**Implementation:**
- Track loading state in data.js: `let dataLoadError = null`
- Expose state: `window.CMS_DATA_STATUS = 'loading' | 'loaded' | 'error'`
- Components check status before rendering critical sections
- Log warnings to browser console if data load fails

---

## Files to Modify

| File | Changes |
|------|---------|
| `public/sections.jsx` | Fix React keys in Footer (lines 476, 490) |
| `public/data.js` | Add error tracking, return Promise from loadCMSData() |
| `public/app.jsx` | Wait for data before rendering (optional: depends on approach) |
| `public/map.jsx` | Already has guard, may need to check for error state |

---

## Testing Approach

1. **React Key Fix:**
   - Reload page, check DevTools Console for React key warnings
   - Should see 0 warnings about duplicate keys

2. **Data Loading:**
   - Add artificial delay in data.js (e.g., `await new Promise(r => setTimeout(r, 2000))`)
   - Verify sections don't render until data loads
   - Verify map shows "loading..." or waits for data

3. **Error Handling:**
   - Block network requests to `_content/` files temporarily
   - Verify error is logged and page shows degraded state (not fully broken)
   - Verify recovery when network is restored

4. **CMS Integration:**
   - Edit Supporters in CMS, publish
   - Verify Vercel deploys
   - Reload page, confirm Supporters section renders with new data
   - Check DevTools Console for no errors

---

## Success Criteria

- ✅ No React key warnings in DevTools Console
- ✅ Supporters, Events, and other CMS sections render without missing data
- ✅ Map component renders correctly with loaded Events
- ✅ Page loads without errors when CMS data is published
- ✅ Error handling logs meaningful messages if data fails to load
