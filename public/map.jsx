/* global React, L, Card, Button, EVENTS */
const { useState, useEffect, useRef } = React;

const STATUS = {
  live: { fill: "#FF6B6B", label: "Now Open", ink: "#fff", emoji: "campaign" },
  soon: { fill: "#4ECDC4", label: "Coming Soon", ink: "#2D2D2D", emoji: "schedule" },
  past: { fill: "#FFD166", label: "Past Event", ink: "#2D2D2D", emoji: "history" }
};

function makePinIcon(ev) {
  const s = STATUS[ev.status];
  const isLive = ev.status === "live";
  return L.divIcon({
    className: "s54-pin-wrap",
    html: `
      <div class="s54-pin ${isLive ? "is-live" : ""}" data-status="${ev.status}">
        ${isLive ? `<span class="s54-pin-aura" style="background:${s.fill}"></span>` : ""}
        <svg class="s54-pin-svg" width="46" height="58" viewBox="-25 -34 50 64" aria-hidden="true">
          <path d="M 0 -30 C 15 -30 23 -19 23 -8 C 23 7 0 24 0 24 C 0 24 -23 7 -23 -8 C -23 -19 -15 -30 0 -30 Z"
                fill="${s.fill}" stroke="#2D2D2D" stroke-width="3" stroke-linejoin="round" />
          <circle cy="-10" r="7" fill="#fff" stroke="#2D2D2D" stroke-width="2.5" />
        </svg>
        <div class="s54-pin-tag">${ev.city}</div>
      </div>
    `,
    iconSize: [60, 96],
    iconAnchor: [30, 70]
  });
}

function SarawakLeaflet({ active, onActive }) {
  const hostRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!hostRef.current || mapRef.current) return;
    if (typeof L === "undefined") {
      console.warn("Leaflet not loaded");
      return;
    }

    if (!EVENTS || EVENTS.length === 0) {
      console.warn("EVENTS not loaded yet");
      return;
    }

    const bounds = L.latLngBounds(EVENTS.map((e) => [e.lat, e.lng])).pad(0.45);

    const map = L.map(hostRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      attributionControl: true,
      zoomSnap: 0.25
    });
    map.fitBounds(bounds);
    map.setMinZoom(map.getZoom() - 0.5);
    map.setMaxZoom(12);
    mapRef.current = map;

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }
    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    EVENTS.forEach((ev) => {
      const m = L.marker([ev.lat, ev.lng], {
        icon: makePinIcon(ev),
        riseOnHover: true,
        zIndexOffset: ev.status === "live" ? 1000 : ev.status === "soon" ? 500 : 100
      }).addTo(map);
      m.on("mouseover", () => onActive(ev.id));
      m.on("click", () => {
        onActive(ev.id);
        map.flyTo([ev.lat, ev.lng], Math.max(map.getZoom(), 8.5), { duration: 0.7 });
      });
      markersRef.current[ev.id] = m;
    });

    const liveEv = EVENTS.find((e) => e.status === "live");
    if (liveEv) {
      const stickerIcon = L.divIcon({
        className: "map-sticker-marker",
        html: `
          <div class="map-sticker-floating">
            <span class="map-sticker-text">we're here next!</span>
            <svg viewBox="0 0 100 80" width="100" height="80" class="map-sticker-arrow-svg" aria-hidden="true">
              <path d="M 12 8 Q 30 55 84 70" fill="none"
                    stroke="#2D2D2D" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round" />
              <path d="M 84 70 L 71 65 M 84 70 L 77 56" fill="none"
                    stroke="#2D2D2D" stroke-width="3" stroke-linecap="round" />
            </svg>
          </div>
        `,
        iconSize: [200, 130],
        iconAnchor: [180, 120]
      });
      L.marker([liveEv.lat, liveEv.lng], {
        icon: stickerIcon,
        interactive: false,
        keyboard: false,
        zIndexOffset: 2000
      }).addTo(map);
    }

    setTimeout(() => map.invalidateSize(), 200);
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(hostRef.current);

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, [EVENTS, onActive]);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, m]) => {
      const el = m.getElement();
      if (!el) return;
      el.classList.toggle("is-active", id === active);
    });
    const map = mapRef.current;
    const ev = EVENTS.find((e) => e.id === active);
    if (map && ev) {
      map.panTo([ev.lat, ev.lng], { animate: true, duration: 0.6 });
    }
  }, [active]);

  return (
    <div className="map-leaflet-wrap">
      <div ref={hostRef} className="map-leaflet-host" />
      <div className="map-overlay map-overlay--compass" aria-hidden="true">
        <svg viewBox="-32 -32 64 64" width="64" height="64">
          <circle r="29" fill="#fff" stroke="#2D2D2D" strokeWidth="3" />
          <path d="M 0 -22 L 6 0 L 0 22 L -6 0 Z" fill="#FF6B6B"
          stroke="#2D2D2D" strokeWidth="2.5" strokeLinejoin="round" />
          <text x="0" y="-12" textAnchor="middle"
          fontFamily="Gochi Hand" fontSize="14" fill="#fff"
          style={{ paintOrder: "stroke", stroke: "#2D2D2D", strokeWidth: 3 }}>N</text>
        </svg>
      </div>
      <div className="map-overlay map-overlay--sea-label" aria-hidden="true">
        South China Sea
      </div>
    </div>
  );
}

function EventList({ active, onActive }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
      {EVENTS.map((ev) => {
        const s = STATUS[ev.status];
        const isActive = active === ev.id;
        return (
          <div key={ev.id}
          onMouseEnter={() => onActive(ev.id)}
          onFocus={() => onActive(ev.id)}
          onClick={() => onActive(ev.id)}
          tabIndex={0}
          style={{
            flex: "1 1 260px",
            background: isActive ? "var(--s54-white)" : "rgba(255,255,255,0.62)",
            border: "3px solid var(--s54-ink)",
            borderRadius: 14,
            boxShadow: isActive ? "8px 8px 0 0 var(--s54-ink)" : "4px 4px 0 0 var(--s54-ink)",
            padding: 18,
            transform: isActive ? "translate(-2px,-2px)" : "none",
            transition: "all 200ms var(--ease-out)",
            cursor: "pointer",
            outline: "none"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: s.fill, color: s.ink,
                border: "2px solid var(--s54-ink)", borderRadius: 999,
                padding: "4px 10px",
                fontFamily: "Inter", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                boxShadow: "2px 2px 0 0 var(--s54-ink)"
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{s.emoji}</span>
                {s.label}
              </span>
              <div style={{
                fontFamily: "Inter", fontSize: 12, fontWeight: 600,
                color: "var(--s54-ink-60)"
              }}>
                {ev.region}
              </div>
            </div>
            <h3 style={{
              fontFamily: "Gochi Hand", fontSize: 32, margin: "0 0 4px",
              lineHeight: 1
            }}>{ev.city}</h3>
            <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
              {ev.dates} · {ev.venue}
            </div>
            <p style={{ fontFamily: "Inter", fontSize: 14, lineHeight: 1.55,
              color: "var(--s54-ink-80)", margin: "0 0 12px" }}>
              {ev.blurb}
            </p>
            {ev.status === "live" &&
            <Button variant="coral" size="sm" href={ev.href}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                Register on Luma
              </Button>
            }
            {ev.status === "soon" &&
            <Button variant="ghost" size="sm" href="#newsletter">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>notifications</span>
                Get notified
              </Button>
            }
            {ev.status === "past" &&
            <Button variant="ghost" size="sm" href="#past">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                See the recap
              </Button>
            }
          </div>
        );
      })}
    </div>
  );
}

function EventsSection() {
  const [active, setActive] = React.useState("miri");

  return (
    <section id="events" data-screen-label="Events & Map"
    style={{ padding: "60px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span className="section-eyebrow">Explore</span>
        <h2 style={{ fontFamily: "Gochi Hand", fontSize: "clamp(40px, 4.5vw, 64px)",
          margin: "12px 0 0", lineHeight: 1 }}>
          Startup54 across Malaysia
        </h2>
        <p style={{ fontFamily: "Inter", fontSize: 17, lineHeight: 1.6,
          color: "var(--s54-ink-80)", maxWidth: 640, margin: "10px auto 0" }}>
          From Kuching's inaugural sprint to Miri's next chapter. A movement across Sarawak.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <Card tone="white" tilt={-0.3} lift={false} style={{ padding: 0, overflow: "hidden", minHeight: 420 }}>
          <SarawakLeaflet active={active} onActive={setActive} />
        </Card>
        <EventList active={active} onActive={setActive} />
      </div>
    </section>
  );
}
