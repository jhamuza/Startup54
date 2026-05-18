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
- `images`: array of media objects (up to 5)
  - Each object has `type` ("image" or "video") and `url` (local path or external URL)

### CMS Configuration

**In `public/config.yml`, add to collections array:**

```yaml
- name: "pastEvents"
  label: "Past Events"
  files:
    - name: "pastEvents"
      label: "All Past Events"
      file: "public/_content/past-events.json"
      fields:
        - label: "Past Events"
          name: "pastEvents"
          widget: "list"
          fields:
            - label: "Event ID"
              name: "id"
              widget: "string"
            - label: "Title (city, region)"
              name: "title"
              widget: "string"
            - label: "Venue"
              name: "venue"
              widget: "string"
            - label: "Location"
              name: "location"
              widget: "string"
            - label: "Story"
              name: "story"
              widget: "text"
            - label: "Media (Images/Videos)"
              name: "images"
              widget: "list"
              fields:
                - label: "Type"
                  name: "type"
                  widget: "select"
                  options: ["image", "video"]
                - label: "URL (image path or YouTube embed URL)"
                  name: "url"
                  widget: "string"
```

This allows users to:
- Add/remove past events
- Upload or paste image URLs (up to 5 per event)
- Embed YouTube videos by pasting embed URL
- Edit story text with rich formatting (newlines, etc.)

### Data Loading

**Update `public/data.js` to load past events:**

```javascript
let PAST_EVENTS = [];

// In loadCMSData():
const pastEventsRes = await fetch('/_content/past-events.json');
const pastEventsData = await pastEventsRes.json();
PAST_EVENTS = pastEventsData.pastEvents || [];
```

Expose `PAST_EVENTS` globally so Past component can access it.

### Frontend Component

**Update `Past()` function in `public/sections.jsx`:**

- Remove hardcoded Kuching image and text
- Map over `PAST_EVENTS` array
- Render expandable cards for each event
- First event (Kuching) renders expanded by default
- Each card displays:
  - Title, venue, location (heading)
  - Image carousel (left side, 7 columns in grid)
  - Story text (right side, 5 columns in grid)
  - Carousel controls: prev/next buttons, image counter
  - YouTube video embedded (if video type in images array)

**Carousel behavior:**
- Display first image/video by default
- Click prev/next to navigate through images
- Show counter: "1 of 5"
- Support mixed image/video carousel (videos show as iframes, images as img tags)

**Styling:**
- Keep existing card styling (tone="white", tilt, lift)
- Reuse existing Highlight, Card components
- Background image gradient overlay (like current Kuching)

---

## Files to Modify

| File | Changes |
|------|---------|
| `public/_content/past-events.json` | Create new file with Kuching event data |
| `public/config.yml` | Add pastEvents collection (YAML) |
| `public/config.js` | Add pastEvents collection (JS config) |
| `public/data.js` | Load past-events.json, expose PAST_EVENTS global |
| `public/sections.jsx` | Replace hardcoded Past component with dynamic version |

---

## Testing Approach

1. **Data loading:** Verify PAST_EVENTS loads correctly from JSON
2. **CMS editing:** Add new past event via /admin, publish, reload site
3. **Carousel:** Click prev/next buttons, verify images cycle
4. **YouTube:** Add YouTube video URL, verify iframe embeds
5. **Multiple events:** Add 2nd event, verify both display (first expanded, others collapsible)

---

## Success Criteria

- ✅ Past Events collection appears in /admin CMS
- ✅ Users can add/edit multiple past events
- ✅ Images upload or paste URLs work
- ✅ YouTube videos embed as iframes
- ✅ Carousel navigates through up to 5 images/videos
- ✅ Kuching event displays as first event (expanded)
- ✅ Additional events collapsible/expandable
- ✅ Story text renders with formatting preserved
- ✅ No console errors on page load
- ✅ CMS edits → publish → Vercel deploy → site updates correctly
