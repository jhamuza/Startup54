# Decap CMS — `past-events` Collection Debug Log

## Problem

`past-events` collection is missing from the Decap CMS v3 sidebar at `https://startup54.com/admin/` when using the **GitHub backend**. All other 6 collections (Events, Hero Section, 3-Day Journey, Why Participate, Supporters, CTA Section) appear correctly.

## Environment

| Item | Value |
|------|-------|
| CMS | Decap CMS `decap-cms@3.12.2` / `decap-cms-core@3.13.0` |
| Backend | GitHub (`jhamuza/Startup54`, branch `main`) |
| Auth | OAuth via `/api/auth` (postMessage popup flow) |
| Hosting | Vercel (`outputDirectory: dist`, Vite build) |
| Config entry | `public/admin/index.html` → `config.js` → `decap-cms.js` |

---

## What Works

| Test | Result |
|------|--------|
| test-repo backend (Playwright headless) | ✅ All 7 collections including `past-events` |
| Mocked GitHub API (fake token in localStorage) | ✅ All 7 collections |
| Real GitHub backend | ❌ Only 6 — `past-events` missing |

---

## Confirmed Facts

1. **`window.CMS_CONFIG` is correct in browser** — user ran `window.CMS_CONFIG.collections.map(c => c.name)` in DevTools console (before login) and confirmed 7 collections including `past-events`.

2. **Live server serves correct files** — `curl https://startup54.com/admin/config.js` confirms `past-events` with `sortable_fields` present.

3. **`past-events.json` exists on `main` branch** — `git show origin/main:public/_content/past-events.json` returns valid JSON.

4. **Error found in browser console** (after login, 6 collections visible):
   ```
   TypeError: Cannot read properties of undefined (reading 'toArray')
       at collections.js:315:33
       at r.K [as mapToProps] (Collection.js:158:26)
   ```

5. **Root cause of error** — Decap source at `collections.js:315` is `selectIdentifier` / `selectSortableFields`:
   ```typescript
   // collections.ts:315 (selectIdentifier)
   const fieldNames = getFieldsNames(collection.get('fields', List()).toArray());

   // collections.ts:425 (selectSortableFields)
   collection.get('sortable_fields').toArray()
   ```
   Called from `Collection.js` `mapStateToProps` via `selectSortableFields(collection, t)`.

6. **`window.CMS_CONFIG` bypasses `applyDefaults`** — Decap's `loadConfig` in `actions/config.ts`:
   ```typescript
   if (window.CMS_CONFIG) {
     return configLoaded(window.CMS_CONFIG); // skips normalizeConfig + applyDefaults
   }
   ```
   `applyDefaults` is where `sortable_fields`, `view_filters`, `view_groups` are set for all collections. With `window.CMS_CONFIG`, they are skipped entirely.

---

## Attempts Made (All Failed for Real GitHub Backend)

### 1. config.yml only (window.CMS_CONFIG = undefined)
- Decap auto-fetches `/admin/config.yml`
- config.yml has all 7 collections with correct structure
- Goes through `normalizeConfig` + `applyDefaults` → `sortable_fields` set for all collections
- **Result: past-events still not in sidebar**

### 2. window.CMS_CONFIG with all 7 collections
- `config.js` sets `window.CMS_CONFIG = { collections: [7 collections...] }`
- `index.html` loads `config.js` before `decap-cms.js`
- `window.CMS_CONFIG` bypasses `applyDefaults` → missing `sortable_fields` etc.
- **Result: past-events still not in sidebar, error found in console**

### 3. `sortable_fields: []` on past-events collection
- Added `sortable_fields: []` to past-events in `window.CMS_CONFIG`
- Empty array is truthy in JS so `if (normalizedCollection.sortable_fields)` runs
- `normalizeSortableFields([])` → `[]` → after `fromJS` → `List([])`
- `List([]).toArray()` should work
- **Result: error still occurs**

### 4. `sortable_fields: [{ field: 'commit_date' }]` on past-events
- Non-empty valid value avoids any falsy edge cases
- `commit_date` is a special-cased key in `selectSortableFields` (no `selectField` call)
- **Result: past-events still not in sidebar**

---

## Current State (as of last commit)

- `public/admin/config.js` — sets `window.CMS_CONFIG` with all 7 collections, past-events has `sortable_fields: [{ field: 'commit_date' }]`
- `public/admin/index.html` — loads `config.js` then `decap-cms.js`
- `public/admin/config.yml` — all 7 collections (unchanged, present as fallback)
- `api/auth.js` — correct postMessage popup OAuth flow
- `public/_content/past-events.json` — exists with Kuching event data

---

## Open Questions / Next Diagnostic Steps

1. **Is past-events in the DOM but hidden?** Run after login:
   ```js
   [...document.querySelectorAll('[data-testid]')].map(el => el.dataset.testid)
   ```
   Expected: `['events', 'past-events', 'hero', ...]`. If `past-events` missing → not rendered at all.

2. **Is past-events in the Redux collections store?** Decap doesn't expose the store globally, but checking the sidebar DOM is a proxy.

3. **Why does only `past-events` crash** when all 7 collections go through the same code path without `applyDefaults`? The 6 old collections also lack `sortable_fields` in the raw window.CMS_CONFIG payload — yet they render fine.

4. **Does the issue persist with config.yml ONLY, after clearing all localStorage?**
   ```js
   Object.keys(localStorage).filter(k => k.includes('decap') || k.includes('cms')).forEach(k => localStorage.removeItem(k));
   ```
   Then reload (not just hard refresh) and log in fresh.

---

## File Structure

```
public/
  admin/
    index.html          ← loads config.js, then decap-cms.js
    config.js           ← sets window.CMS_CONFIG with 7 collections
    config.yml          ← all 7 collections (Decap fallback)
  _content/
    past-events.json    ← Kuching 2025 event data
    events.json
    hero.json
    journey.json
    why.json
    supporters.json
    cta.json
api/
  auth.js               ← GitHub OAuth postMessage handler
```

## Key Decap Source References (v3.12.2)

- `loadConfig` bypass: `packages/decap-cms-core/src/actions/config.ts:524`
- `selectSortableFields`: `packages/decap-cms-core/src/reducers/collections.ts:423`
- `selectIdentifier`: `packages/decap-cms-core/src/reducers/collections.ts:312`
- `selectViewFilters`: `packages/decap-cms-core/src/reducers/collections.ts:496`
- Sidebar filter: `packages/decap-cms-core/src/components/Collection/Sidebar.js:128`
- Collections reducer: `packages/decap-cms-core/src/reducers/collections.ts` (CONFIG_SUCCESS handler)
