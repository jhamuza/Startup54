# Past Events CMS Collection Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build editable Past Events CMS collection with image carousel, video embeds, and expandable cards so users can manage multiple past events with rich media and story text.

**Architecture:** Add `PAST_EVENTS` global loaded from `public/_content/past-events.json`. Integrate past-events.json fetch into existing `Promise.all()` data loading. Replace hardcoded `Past()` component with dynamic version mapping `PAST_EVENTS` array, rendering expandable cards (first event expanded by default). Each card has image carousel (left, 7 cols), story section (right, 5 cols), with prev/next buttons, keyboard navigation, and mixed image/video support.

**Tech Stack:** Decap CMS (config.js), vanilla JavaScript (carousel state), React 18 (card component), CSS Grid (layout)

---

## Chunk 1: Data & CMS Configuration

### Task 1: Create `public/_content/past-events.json` with Kuching event

**Files:**
- Create: `public/_content/past-events.json`

- [ ] **Step 1: Create past-events.json with Kuching event**

Create file `public/_content/past-events.json`:

```json
{
  "pastEvents": [
    {
      "id": "kuching-2025",
      "title": "Kuching, Sarawak",
      "venue": "TEGAS Digital Village",
      "location": "Kuching, Sarawak",
      "story": "Three days, dozens of pitches, a room full of new friends, and a handful of teams who left as actual companies. The blueprint for everything that comes next.",
      "images": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop"
        }
      ]
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add public/_content/past-events.json
git commit -m "feat: create past-events.json with Kuching event data"
```

---

### Task 2: Add pastEvents collection to `public/admin/config.js`

**Files:**
- Modify: `public/admin/config.js:1-120`

- [ ] **Step 1: Read config.js to find collections array**

Collections array ends at line 119. Need to add new collection before closing bracket.

- [ ] **Step 2: Add pastEvents collection to collections array**

In `public/admin/config.js`, before the closing `]` on line 119, add:

```javascript
    {
      name: 'pastEvents',
      label: 'Past Events',
      file: 'public/_content/past-events.json',
      fields: [
        {
          label: 'Past Events',
          name: 'pastEvents',
          widget: 'list',
          fields: [
            {
              label: 'Event ID',
              name: 'id',
              widget: 'string',
              hint: 'Unique identifier (e.g., kuching-2025)'
            },
            {
              label: 'Title (city, region)',
              name: 'title',
              widget: 'string'
            },
            {
              label: 'Venue',
              name: 'venue',
              widget: 'string'
            },
            {
              label: 'Location',
              name: 'location',
              widget: 'string'
            },
            {
              label: 'Story',
              name: 'story',
              widget: 'text',
              hint: 'Event description and narrative (supports multiline)'
            },
            {
              label: 'Media (Images/Videos)',
              name: 'images',
              widget: 'list',
              max: 5,
              hint: 'Up to 5 media items (images or YouTube videos)',
              fields: [
                {
                  label: 'Type',
                  name: 'type',
                  widget: 'select',
                  options: ['image', 'video']
                },
                {
                  label: 'URL (image path or YouTube embed URL)',
                  name: 'url',
                  widget: 'string',
                  hint: 'Local path (/images/...) or external URL'
                }
              ]
            }
          ]
        }
      ]
    }
```

- [ ] **Step 3: Verify config.js syntax is valid**

Check that the collection object is properly nested and comma placement is correct. The line before should have a comma.

- [ ] **Step 4: Commit**

```bash
git add public/admin/config.js
git commit -m "feat: add pastEvents collection to Decap CMS config"
```

---

### Task 3: Update `public/data.js` to load past-events.json

**Files:**
- Modify: `public/data.js:1-55`

- [ ] **Step 1: Add PAST_EVENTS global variable at top of data.js**

After line 7 (after `let CTA_DATA = {}`), add:

```javascript
let PAST_EVENTS = [];
```

- [ ] **Step 2: Update Promise.all() to fetch past-events.json**

Replace line 18-25 (the Promise.all array) with:

```javascript
    const [eventsRes, journeyRes, whyRes, supportersRes, heroRes, ctaRes, pastEventsRes] = await Promise.all([
      fetch('/_content/events.json'),
      fetch('/_content/journey.json'),
      fetch('/_content/why.json'),
      fetch('/_content/supporters.json'),
      fetch('/_content/hero.json'),
      fetch('/_content/cta.json'),
      fetch('/_content/past-events.json')
    ]);
```

- [ ] **Step 3: Add parsing for past-events.json response**

After line 32 (after `const ctaData = await ctaRes.json();`), add:

```javascript
    const pastEventsData = await pastEventsRes.json();
```

- [ ] **Step 4: Assign parsed data to PAST_EVENTS with constraint enforcement**

After line 39 (after `CTA_DATA = ctaData;`), add:

```javascript
    
    PAST_EVENTS = pastEventsData.pastEvents || [];
    
    // Enforce 5-media constraint defensively
    PAST_EVENTS.forEach((event, idx) => {
      if (event.images && event.images.length > 5) {
        console.warn(`Past event "${event.title}" has ${event.images.length} media items. Truncating to 5.`);
        event.images = event.images.slice(0, 5);
      }
    });
```

- [ ] **Step 5: Update console.log to include PAST_EVENTS**

Replace line 41 console.log from:

```javascript
    console.log('✓ CMS data loaded:', { EVENTS, JOURNEY_DAYS, WHY_PROPS, SUPPORTERS });
```

To:

```javascript
    console.log('✓ CMS data loaded:', { EVENTS, JOURNEY_DAYS, WHY_PROPS, SUPPORTERS, HERO_DATA, CTA_DATA, PAST_EVENTS });
```

- [ ] **Step 6: Test data.js for syntax errors**

Run in browser console:

```javascript
// After page load, verify PAST_EVENTS is populated
console.log('PAST_EVENTS:', window.PAST_EVENTS);
```

Expected: Array with 1 event object (Kuching).

- [ ] **Step 7: Commit**

```bash
git add public/data.js
git commit -m "feat: add PAST_EVENTS loading with constraint enforcement"
```

---

## Chunk 2: Frontend Component

### Task 4: Replace hardcoded Past() component with dynamic carousel version

**Files:**
- Modify: `public/sections.jsx:272-355`

- [ ] **Step 1: Read current Past() component (lines 272-355)**

Current component renders hardcoded Kuching event with background image. Need to replace with dynamic component mapping PAST_EVENTS array.

- [ ] **Step 2: Replace Past() function with new dynamic version**

Replace entire Past function (lines 272-355 ending with closing `</div>`) with:

```javascript
function Past() {
  const [expandedIndex, setExpandedIndex] = React.useState(0);
  const [carouselIndices, setCarouselIndices] = React.useState({});

  const handleToggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const handleCarouselPrev = (eventIndex) => {
    const currentIdx = carouselIndices[eventIndex] || 0;
    const event = PAST_EVENTS[eventIndex];
    const mediaCount = event.images?.length || 0;
    if (mediaCount === 0) return;
    const newIdx = currentIdx === 0 ? mediaCount - 1 : currentIdx - 1;
    setCarouselIndices({ ...carouselIndices, [eventIndex]: newIdx });
  };

  const handleCarouselNext = (eventIndex) => {
    const currentIdx = carouselIndices[eventIndex] || 0;
    const event = PAST_EVENTS[eventIndex];
    const mediaCount = event.images?.length || 0;
    if (mediaCount === 0) return;
    const newIdx = currentIdx === mediaCount - 1 ? 0 : currentIdx + 1;
    setCarouselIndices({ ...carouselIndices, [eventIndex]: newIdx });
  };

  const handleKeyDown = (e, eventIndex) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleCarouselPrev(eventIndex);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleCarouselNext(eventIndex);
    }
  };

  const renderMediaItem = (mediaItem, eventIndex, mediaIndex) => {
    if (!mediaItem) return null;
    
    if (mediaItem.type === 'video') {
      return (
        <iframe
          key={`${eventIndex}-${mediaIndex}`}
          width="100%"
          src={mediaItem.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '16 / 9',
            maxHeight: 400
          }}
        />
      );
    }

    return (
      <img
        key={`${eventIndex}-${mediaIndex}`}
        src={mediaItem.url}
        alt="Event media"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          maxHeight: 400,
          objectFit: 'cover'
        }}
      />
    );
  };

  if (!PAST_EVENTS || PAST_EVENTS.length === 0) {
    return null;
  }

  return (
    <section id="past" data-screen-label="Past Events" style={{ padding: "60px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span className="section-eyebrow" style={{ background: "var(--s54-gold)" }}>The story so far</span>
        <h2 style={{
          fontFamily: "Gochi Hand",
          fontSize: "clamp(40px, 4.5vw, 64px)",
          margin: "12px 0 0",
          lineHeight: 1
        }}>
          Where we started: <Highlight color="var(--s54-coral)"><span style={{ color: "#fff" }}>Kuching</span></Highlight>.
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {PAST_EVENTS.map((event, eventIndex) => {
          const isExpanded = expandedIndex === eventIndex;
          const carouselIdx = carouselIndices[eventIndex] || 0;
          const currentMedia = event.images?.[carouselIdx];
          const mediaCount = event.images?.length || 0;

          return (
            <div
              key={event.id}
              style={{
                display: "grid",
                gridTemplateColumns: window.innerWidth < 768 ? "repeat(1, 1fr)" : "repeat(12, 1fr)",
                gap: 22,
                maxHeight: isExpanded ? '1000px' : '120px',
                transition: 'max-height 0.3s ease-in-out',
                overflow: 'hidden'
              }}
              onKeyDown={(e) => isExpanded && handleKeyDown(e, eventIndex)}
              tabIndex={isExpanded ? 0 : -1}
            >
              {isExpanded && (
                <>
                  <div style={{ gridColumn: window.innerWidth < 768 ? "span 1" : "span 7" }}>
                    <Card tone="white" tilt={-0.4} lift={false} style={{
                      padding: 0,
                      minHeight: 380,
                      position: "relative",
                      overflow: "hidden",
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                        {mediaCount > 0 ? (
                          renderMediaItem(currentMedia, eventIndex, carouselIdx)
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#f0f0f0',
                            color: '#999'
                          }}>
                            No media available
                          </div>
                        )}
                      </div>
                      {mediaCount > 0 && (
                        <div style={{ padding: '12px', textAlign: 'center', background: '#f9f9f9' }}>
                          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
                            <button
                              onClick={() => handleCarouselPrev(eventIndex)}
                              disabled={mediaCount === 0}
                              style={{
                                padding: '6px 12px',
                                background: 'var(--s54-ink)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 4,
                                cursor: mediaCount === 0 ? 'default' : 'pointer',
                                opacity: mediaCount === 0 ? 0.5 : 1,
                                fontSize: 14
                              }}
                            >
                              ← Previous
                            </button>
                            <button
                              onClick={() => handleCarouselNext(eventIndex)}
                              disabled={mediaCount === 0}
                              style={{
                                padding: '6px 12px',
                                background: 'var(--s54-ink)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 4,
                                cursor: mediaCount === 0 ? 'default' : 'pointer',
                                opacity: mediaCount === 0 ? 0.5 : 1,
                                fontSize: 14
                              }}
                            >
                              Next →
                            </button>
                          </div>
                          {mediaCount > 1 && (
                            <div style={{
                              fontSize: 12,
                              color: 'var(--s54-ink-80)',
                              fontFamily: 'Inter'
                            }}>
                              {carouselIdx + 1} of {mediaCount}
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </div>

                  <div style={{ gridColumn: window.innerWidth < 768 ? "span 1" : "span 5", display: "flex", flexDirection: "column", gap: 18 }}>
                    <Card tone="gold" tilt={0.6} lift={true} style={{ padding: 22 }}>
                      <h3 style={{ fontFamily: "Gochi Hand", fontSize: 28, margin: "0 0 8px" }}>
                        {event.title}
                      </h3>
                      <div style={{ fontFamily: "Inter", fontSize: 13, color: "var(--s54-ink-80)", marginBottom: 8 }}>
                        {event.venue}
                      </div>
                      <div style={{ fontFamily: "Inter", fontSize: 13, color: "var(--s54-ink-80)", marginBottom: 12 }}>
                        {event.location}
                      </div>
                      <p style={{ fontFamily: "Inter", fontSize: 14.5, lineHeight: 1.55, margin: 0, whiteSpace: 'pre-wrap' }}>
                        {event.story}
                      </p>
                    </Card>
                  </div>
                </>
              )}

              {!isExpanded && (
                <div style={{ gridColumn: "span 12" }}>
                  <button
                    onClick={() => handleToggleExpand(eventIndex)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'transparent',
                      border: '2px solid var(--s54-ink)',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontFamily: 'Gochi Hand',
                      fontSize: 20,
                      textAlign: 'left',
                      color: 'var(--s54-ink)'
                    }}
                  >
                    {event.title}
                  </button>
                </div>
              )}

              {isExpanded && (
                <div style={{ gridColumn: "span 12" }}>
                  <button
                    onClick={() => handleToggleExpand(eventIndex)}
                    style={{
                      padding: '8px 16px',
                      background: 'var(--s54-ink)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontFamily: 'Inter'
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Test Past() renders without errors**

Build and start local server:

```bash
npm run build
cd dist && python3 -m http.server 8000
```

Visit http://localhost:8000, scroll to Past Events section. Verify:
- Kuching event displays as expanded card
- Carousel shows image with prev/next buttons
- Counter shows "1 of 1"
- Close button appears

- [ ] **Step 4: Commit**

```bash
git add public/sections.jsx
git commit -m "feat: replace hardcoded Past component with dynamic carousel version"
```

---

## Chunk 3: Testing & Deployment

### Task 5: Test locally and deploy

**Files:**
- No code changes; verification only

- [ ] **Step 1: Verify no console errors**

Open browser DevTools (F12) → Console tab. Reload page. Verify:
- Message: "✓ CMS data loaded:" includes PAST_EVENTS
- No red errors related to loading or rendering
- PAST_EVENTS global populated with Kuching event

- [ ] **Step 2: Test carousel controls & keyboard navigation**

In browser, on Past Events section:
- Click Next button → counter shows "1 of 1" (stays same because only 1 item)
- Click Previous button → stays on same item
- Focus carousel (click it), press ArrowRight key → advances carousel
- Focus carousel, press ArrowLeft key → goes to previous item
- Add second image URL to test file, reload → verify counter increases to "1 of 2"
- With 2 items: test Next/Previous buttons cycle correctly
- With 2 items: test ArrowLeft/ArrowRight keys navigate

- [ ] **Step 3: Test expand/collapse & mobile responsive**

Expand/collapse (desktop):
- Click "Kuching, Sarawak" button → expands to show full carousel + story
- Click Close button → collapses to single-line button
- Verify smooth transition animation (0.3s height change)

Mobile responsive (< 768px width):
- Resize browser to 375px wide (mobile view)
- Expand Kuching event
- Verify carousel and story stack vertically (not side-by-side)
- Verify both sections are readable and properly spaced

- [ ] **Step 4: Test edge case — event with 0 media items**

Create test event with no media:
1. Manually edit `public/_content/past-events.json`
2. Add new event with empty `images: []` array
3. Rebuild and reload http://localhost:8000
4. Expand event, verify "No media available" placeholder displays
5. Verify no carousel buttons appear when no media exists

- [ ] **Step 5: Test with CMS**

1. Open http://localhost:8000/admin
2. Click "Past Events" in collections list
3. Click into Kuching event to edit
4. Verify all fields display: id, title, venue, location, story, images
5. Verify media field shows "max: 5" limit message or UI constraint
6. Add a second image URL to images array
7. Save changes locally
8. Reload site, verify new image appears in carousel counter ("1 of 2")

- [ ] **Step 6: Deploy to Vercel**

Push changes to main and wait for deployment:

```bash
git push
```

Wait for Vercel build to complete (check dashboard or `gh run list`).

- [ ] **Step 7: Test on live site**

Visit https://startup54.com:
- Scroll to Past Events section
- Verify Kuching event displays expanded
- Carousel shows image
- DevTools Console (F12): verify "✓ CMS data loaded:" message, no errors
- Test carousel prev/next buttons
- Test expand/collapse
- Test keyboard navigation: focus carousel, press ArrowLeft/ArrowRight
- Resize to mobile (< 768px): verify carousel and story stack vertically
- Verify no React key warnings in Console

- [ ] **Step 8: Test CMS on live site**

1. Open https://startup54.com/admin
2. Log in with GitHub
3. Click "Past Events" collection
4. Edit Kuching event: change story text slightly
5. Click Publish
6. Wait for Vercel deployment
7. Reload https://startup54.com
8. Verify story text change appears
9. DevTools Console: no errors, "✓ CMS data loaded:" visible

- [ ] **Step 9: Final verification checklist**

Verify all success criteria met:

```
CMS & Data:
✅ Past Events collection appears in /admin CMS
✅ PAST_EVENTS global populated from JSON
✅ Data loader console shows "✓ CMS data loaded:" with PAST_EVENTS
✅ Media field enforces max 5 in CMS UI

Frontend Rendering:
✅ Kuching event displays expanded by default
✅ Click title toggles expand/collapse
✅ Story text renders with formatting preserved (multiline)
✅ Event with 0 media: placeholder "No media available" shows

Carousel:
✅ Carousel displays first media item
✅ Prev/Next buttons work (enabled/disabled correctly)
✅ Counter shows "X of Y" (only when > 1 item)
✅ Images render as <img> tags with proper sizing
✅ Videos render as iframes with 16:9 aspect ratio
✅ Keyboard navigation: ArrowLeft/ArrowRight advance carousel
✅ Only 1 item: prev/next disabled or loop works

Integration & Responsive:
✅ No console errors
✅ No React key warnings
✅ CMS edits → publish → Vercel deploy → site updates
✅ Mobile responsive (< 768px): carousel/story stack vertically
✅ Desktop (> 768px): carousel left 7 cols, story right 5 cols
```

- [ ] **Step 10: Final commit (no code, just verification log)**

```bash
echo "✓ Local testing complete: Past Events CMS collection working, carousel functional, CMS integration verified" > /tmp/test-log.txt
```

---

## Success Criteria

- ✅ `public/_content/past-events.json` created with Kuching event
- ✅ `public/admin/config.js` updated with pastEvents collection (max: 5 media)
- ✅ `public/data.js` loads past-events.json with defensive truncation
- ✅ `Past()` component renders dynamic expandable cards with carousel
- ✅ Carousel: prev/next buttons, counter, mixed image/video support, keyboard nav (ArrowLeft/ArrowRight)
- ✅ First event expanded by default, others collapsed
- ✅ No console errors; all sections render correctly
- ✅ CMS edit → publish → deploy → frontend updates verified end-to-end
- ✅ Mobile responsive layout
