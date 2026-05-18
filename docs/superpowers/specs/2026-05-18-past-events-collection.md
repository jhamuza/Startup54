# Past Events CMS Collection

> **For agentic workers:** Use superpowers:writing-plans to create implementation plan for this spec.

**Goal:** Add editable "Past Events" collection to Decap CMS so users can manage multiple past events with image carousels, video embeds, and rich story text.

**Architecture:** Separate "Past Events" CMS collection in config.yml. Data stored in `public/_content/past-events.json` with array of events. Each event contains title, venue, location, story text, and up to 5 media items (images or YouTube videos). Frontend Past component reads from `PAST_EVENTS` global and renders expandable cards with image carousel.

**Tech Stack:** Decap CMS (YAML config), vanilla JavaScript (carousel), React (Past component)

---

## Design Details

### Data Structure

**File:** `public/_content/past-events.json`

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
        { "type": "image", "url": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop" },
        { "type": "image", "url": "/path/to/local-image.jpg" },
        { "type": "video", "url": "https://www.youtube.com/embed/dQw4w9WgXcQ" }
      ]
    }
  ]
}
```

**Schema:**
- `id`: unique identifier (string)
- `title`: event title, typically city/region (string)
- `venue`: venue name (string)
- `location`: location description (string)
- `story`: event description/narrative (string, can include newlines for rich text)
- `images`: array of media objects (up to 5) — **Field name is `images` (plural), not `media`. Despite containing mixed image/video types, the JSON field is named `images`.**
  - Each object has `type` ("image" or "video") and `url` (local path or external URL)

### CMS Configuration

**Update `public/admin/config.js` to add pastEvents collection:**

Add the following collection object to the `collections` array:

```javascript
{
  name: "pastEvents",
  label: "Past Events",
  file: "public/_content/past-events.json",
  fields: [
    {
      label: "Past Events",
      name: "pastEvents",
      widget: "list",
      fields: [
        {
          label: "Event ID",
          name: "id",
          widget: "string",
          hint: "Unique identifier (e.g., kuching-2025)"
        },
        {
          label: "Title (city, region)",
          name: "title",
          widget: "string"
        },
        {
          label: "Venue",
          name: "venue",
          widget: "string"
        },
        {
          label: "Location",
          name: "location",
          widget: "string"
        },
        {
          label: "Story",
          name: "story",
          widget: "text",
          hint: "Event description and narrative (supports multiline)"
        },
        {
          label: "Media (Images/Videos)",
          name: "images",
          widget: "list",
          max: 5,
          hint: "Up to 5 media items (images or YouTube videos)",
          fields: [
            {
              label: "Type",
              name: "type",
              widget: "select",
              options: ["image", "video"]
            },
            {
              label: "URL (image path or YouTube embed URL)",
              name: "url",
              widget: "string",
              hint: "Local path (/images/...) or external URL"
            }
          ]
        }
      ]
    }
  ]
}
```

**Media constraint enforcement:** Decap CMS `max: 5` field prevents adding more than 5 items in the CMS editor UI. The data loader in `data.js` implements defensive truncation: if corrupted JSON lands in `past-events.json` with 6+ media items, the loader truncates to 5 and logs a console warning. This two-layer approach ensures safety.

This allows users to:
- Add/remove past events
- Upload or paste image URLs (up to 5 per event, enforced by CMS UI)
- Embed YouTube videos by pasting embed URL
- Edit story text with rich formatting (newlines, etc.)

### Data Loading

**Update `public/data.js` to load past events with error handling:**

Add to the global variables section:

```javascript
let PAST_EVENTS = [];
```

In the `loadCMSData()` function, add the past events fetch to the `Promise.all()` batch:

```javascript
async function loadCMSData() {
  window.CMS_DATA_STATUS = 'loading';
  dataLoadStarted = true;
  try {
    const [eventsRes, journeyRes, whyRes, supportersRes, heroRes, ctaRes, pastEventsRes] = await Promise.all([
      fetch('/_content/events.json'),
      fetch('/_content/journey-days.json'),
      fetch('/_content/why-props.json'),
      fetch('/_content/supporters.json'),
      fetch('/_content/hero-data.json'),
      fetch('/_content/cta-data.json'),
      fetch('/_content/past-events.json')
    ]);

    EVENTS = await eventsRes.json();
    JOURNEY_DAYS = await journeyRes.json();
    WHY_PROPS = await whyRes.json();
    SUPPORTERS = await supportersRes.json();
    HERO_DATA = await heroRes.json();
    CTA_DATA = await ctaRes.json();
    
    const pastEventsData = await pastEventsRes.json();
    PAST_EVENTS = pastEventsData.pastEvents || [];
    
    // Enforce 5-media constraint defensively
    PAST_EVENTS.forEach((event, idx) => {
      if (event.images && event.images.length > 5) {
        console.warn(`Past event "${event.title}" has ${event.images.length} media items. Truncating to 5.`);
        event.images = event.images.slice(0, 5);
      }
    });

    console.log('✓ CMS data loaded:', {EVENTS, JOURNEY_DAYS, WHY_PROPS, SUPPORTERS, HERO_DATA, CTA_DATA, PAST_EVENTS});
    window.CMS_DATA_STATUS = 'loaded';
    dataLoadError = null;
  } catch (error) {
    console.error('Failed to load CMS data:', error);
    dataLoadError = error;
    window.CMS_DATA_STATUS = 'error';
    return false;
  }
}
```

Expose `PAST_EVENTS` globally so Past component can access it. Error handling prevents silent failures if `past-events.json` is missing or malformed.

### Frontend Component

**Update `Past()` function in `public/sections.jsx`:**

Structure: Map `PAST_EVENTS` array. Each event renders as an expandable card. First event (Kuching) expanded by default.

**Card layout (grid, 12 columns):**
- Carousel (left side, 7 columns) — displays media with navigation controls
- Story section (right side, 5 columns) — title, venue, location, story text

**Carousel behavior:**
- Display first image/video by default
- Previous/Next buttons below carousel (centered, left/right aligned)
- Previous button disabled when at first item, Next button disabled when at last item
- Image counter centered below buttons: "1 of 5" (only if more than 1 item)
- Mixed media: images show as `<img>` tags, videos show as YouTube `<iframe>`
- Video dimensions: 100% width, aspect ratio 16:9 (560px × 315px on standard size)
- Image dimensions: 100% width, auto height, max-height 400px

**Keyboard navigation:**
- Arrow left key: advance to previous media item
- Arrow right key: advance to next media item
- Implementation: add keydown event listener on carousel container; when focused, intercept ArrowLeft/ArrowRight and call prev/next handlers; prevent default browser scroll
- Example pseudocode:
```javascript
carouselContainer.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
  if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
});
```

**Expandable behavior:**
- First event (Kuching) expanded on page load
- Other events collapsed by default
- Click card title to toggle expand/collapse
- Smooth height transition animation (0.3s ease-in-out)

**Styling:**
- Keep existing Card component styling (tone="white", tilt, lift)
- Reuse existing Highlight component for heading
- Story text wrapping: 100% width on grid, preserves newlines from CMS
- No background image on carousel container (media replaces)
- Collapsed state shows only title/venue/location as preview
- Expanded state shows full carousel and story

**Edge cases:**
- Event with 0 media items: show placeholder or hide carousel
- Event with only videos: carousel works normally
- Very long story text: text wraps naturally, scrolls if needed
- Mobile (< 768px): stack carousel and story vertically (14 columns each)

---

## Files to Modify

| File | Changes |
|------|---------|
| `public/_content/past-events.json` | Create new file with Kuching event data |
| `public/admin/config.js` | Add pastEvents collection to collections array |
| `public/data.js` | Add past-events.json to Promise.all() fetch, expose PAST_EVENTS global, add media constraint enforcement |
| `public/sections.jsx` | Replace hardcoded Past() component with dynamic version that maps PAST_EVENTS |

**Note:** Decap CMS is configured via `public/admin/config.js` (JavaScript). The file `public/config.yml` exists but is not actively used by the current setup.

---

## Testing Approach

**Local testing (after implementation):**

1. **Data loading:**
   - Verify PAST_EVENTS loads correctly from JSON
   - Check console for "✓ CMS data loaded:" message
   - Verify all events render with media

2. **Carousel navigation:**
   - Single event with 5 media: Click prev/next buttons, verify cycle order
   - Prev button disabled on first item, next button disabled on last item
   - Counter shows "1 of 5", "2 of 5", etc.
   - Keyboard navigation: arrow left/right keys advance carousel

3. **Mixed media (images + videos):**
   - Add event with 3 images and 2 YouTube videos
   - Verify images render as `<img>` tags
   - Verify videos render as YouTube iframes with 16:9 aspect ratio

4. **Expandable cards:**
   - First event (Kuching) expanded on page load
   - Other events collapsed
   - Click title to expand/collapse
   - Story text shows only when expanded

5. **Edge cases:**
   - Event with 0 media items: carousel hidden or placeholder shows
   - Event with only videos (no images)
   - Event with 6+ media items: truncated to 5 with console warning
   - Very long story text (200+ characters): wraps correctly
   - Mobile responsive (< 768px): carousel and story stack vertically

6. **CMS editing end-to-end:**
   - Add new event via /admin
   - Upload images or paste image URLs
   - Add YouTube embed URL
   - Publish → Vercel deploys
   - Reload site, verify new event appears
   - Edit existing event (change story, add media)
   - Verify changes reflected on site

7. **Error states:**
   - DevTools Console shows no errors on load
   - Network tab shows successful fetch of `past-events.json`
   - Window.PAST_EVENTS populated with all events

---

## Success Criteria

**CMS & Data:**
- ✅ Past Events collection appears in /admin CMS with correct fields
- ✅ Users can add/edit multiple past events in CMS UI
- ✅ Media field enforces 5-item limit in CMS UI (max: 5)
- ✅ PAST_EVENTS global populated from JSON with all events
- ✅ Data loader console shows "✓ CMS data loaded:" with PAST_EVENTS included

**Frontend Rendering:**
- ✅ Kuching event displays as first event (expanded by default)
- ✅ Additional events render as collapsed cards
- ✅ Click event title toggles expand/collapse
- ✅ Story text renders with formatting preserved (newlines, paragraphs)

**Carousel:**
- ✅ Carousel displays first media item on load
- ✅ Prev/Next buttons navigate through items
- ✅ Counter shows "X of Y" for multiple items
- ✅ Images render as `<img>` tags with proper sizing
- ✅ YouTube videos render as iframes (16:9 aspect ratio)
- ✅ Keyboard support: arrow left/right navigate carousel
- ✅ Excess media (6+) truncated to 5 with console warning

**Integration & Deployment:**
- ✅ No console errors on page load
- ✅ No React key warnings
- ✅ CMS edits → publish → Vercel deploy → site updates correctly
- ✅ Mobile responsive (stacks vertically < 768px)
- ✅ Edge cases handled: empty carousel, only videos, long text wrapping
