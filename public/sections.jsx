/* global React, Card, Button, IconBadge, Highlight, Countdown, EventsSection */
const { useState } = React;

function HeroTicket({ logo }) {
  return (
    <section id="top" data-screen-label="Hero · Ticket"
    style={{ paddingTop: 140, paddingBottom: 64,
      display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: 0,
        width: "100%",
        maxWidth: 1120,
        background: "var(--s54-white)",
        border: "3px solid var(--s54-ink)",
        borderRadius: 18,
        boxShadow: "10px 10px 0 0 var(--s54-ink)",
        transform: "rotate(-0.6deg)",
        overflow: "hidden"
      }}>
        {/* Left stub */}
        <div style={{ padding: 40, background: "var(--s54-cream)", position: "relative" }}>
          <div style={{
            fontFamily: "Inter", fontSize: 12, fontWeight: 800,
            letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s54-ink-80)"
          }}>Admit one · Founder · 2026</div>
          <h1 style={{
            fontFamily: "Gochi Hand", fontSize: "clamp(52px, 7vw, 100px)",
            lineHeight: 0.92, margin: "12px 0 0", letterSpacing: "-0.01em"
          }}>
            {HERO_DATA.headline || "Build something in 54 hours."}
          </h1>
          <p style={{
            fontFamily: "Inter", fontSize: 17, lineHeight: 1.5,
            maxWidth: 480, margin: "16px 0 0", color: "var(--s54-ink-80)", fontWeight: 500
          }}>
            Pitch, team up, prototype, present. One weekend, one room, one shot at your first company.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <Button variant="coral" size="lg" href="https://luma.com/ujnecsej">
              Register for Miri
            </Button>
            <Button variant="ghost" size="lg" href="#events">See the map</Button>
          </div>
        </div>
        {/* Perforation divider */}
        <div style={{ position: "relative", borderLeft: "3px dashed var(--s54-ink)" }}>
          {/* notches */}
          <div style={{
            position: "absolute", left: -16, top: -16, width: 32, height: 32,
            background: "var(--s54-cream)", border: "3px solid var(--s54-ink)",
            borderRadius: "50%"
          }} />
          <div style={{
            position: "absolute", left: -16, bottom: -16, width: 32, height: 32,
            background: "var(--s54-cream)", border: "3px solid var(--s54-ink)",
            borderRadius: "50%"
          }} />
          {/* right stub */}
          <div style={{
            padding: 28, height: "100%",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            background: "var(--s54-coral)", color: "#fff"
          }}>
            <div>
              <div style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 800,
                letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.9 }}>
                Next event
              </div>
              <h2 style={{ fontFamily: "Gochi Hand", fontSize: 64, margin: "8px 0 0", lineHeight: 0.9 }}>
                {HERO_DATA.upcomingCity || "Miri"}
              </h2>
              <div style={{ fontFamily: "Gochi Hand", fontSize: 28, marginTop: 4 }}>
                {HERO_DATA.dates || "June 19 – 21"}
              </div>
              <div style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 600, marginTop: 6, opacity: 0.95 }}>
                {HERO_DATA.venue || "TEGAS Digital Innovation Hub"}
              </div>
            </div>
            <div>
              <div style={{
                fontFamily: "Inter", fontSize: 10, fontWeight: 800,
                letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.9, marginBottom: 8
              }}>Doors open in</div>
              <Countdown target="2026-06-19T18:00:00+08:00" color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Upcoming() {
  return (
    <section id="upcoming" data-screen-label="Upcoming · Miri"
    style={{ padding: "60px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 22 }}>
        <div style={{ gridColumn: "span 5" }}>
          <span className="section-eyebrow">Up next</span>
          <h2 style={{ fontFamily: "Gochi Hand", fontSize: "clamp(40px, 4.5vw, 64px)",
            margin: "12px 0 16px", lineHeight: 1.0 }}>
            Miri, <Highlight>June 2026</Highlight>
          </h2>
          <p style={{ fontFamily: "Inter", fontSize: 17, lineHeight: 1.6,
            color: "var(--s54-ink-80)", maxWidth: 480 }}>
            Sarawak's resort city is hosting our next 54-hour sprint at TEGAS Digital Innovation Hub Miri.
            Mentors, meals, ramen runs, and a final pitch in front of investor judges.
            One weekend. Bring a laptop and an idea. We'll help you ship it.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
            <Button variant="coral" size="lg" href="https://luma.com/ujnecsej">
              Register on Luma
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>open_in_new</span>
            </Button>
            <Button variant="ghost" size="lg" href="#journey">See the schedule</Button>
          </div>
        </div>

        <div style={{ gridColumn: "span 7" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Card tone="white" tilt={-0.8} lift={true}>
              <IconBadge tone="coral" size={44}>
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>calendar_month</span>
              </IconBadge>
              <h3 style={{ fontFamily: "Gochi Hand", fontSize: 26, margin: "12px 0 4px" }}>When</h3>
              <p style={{ fontFamily: "Inter", fontSize: 15, margin: 0, lineHeight: 1.5 }}>
                <strong>June 19 – 21, 2026</strong><br />
                <span style={{ color: "var(--s54-ink-60)" }}>Fri 6PM → Sun midnight</span>
              </p>
            </Card>

            <Card tone="white" tilt={0.6} lift={true}>
              <IconBadge tone="mint" size={44}>
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>location_on</span>
              </IconBadge>
              <h3 style={{ fontFamily: "Gochi Hand", fontSize: 26, margin: "12px 0 4px" }}>Where</h3>
              <p style={{ fontFamily: "Inter", fontSize: 15, margin: 0, lineHeight: 1.5 }}>
                <strong>TEGAS Digital Innovation Hub</strong><br />
                <span style={{ color: "var(--s54-ink-60)" }}>Miri, Sarawak</span>
              </p>
            </Card>

            <Card tone="lavender" tilt={0.4} lift={true}>
              <IconBadge tone="white" size={44}>
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>payments</span>
              </IconBadge>
              <h3 style={{ fontFamily: "Gochi Hand", fontSize: 26, margin: "12px 0 4px" }}>What's included</h3>
              <p style={{ fontFamily: "Inter", fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Meals, mentor time, workshops, a t-shirt, and the worst/best weekend of your year.
              </p>
            </Card>

            <Card tone="gold" tilt={-0.4} lift={true}>
              <IconBadge tone="white" size={44}>
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>laptop_chromebook</span>
              </IconBadge>
              <h3 style={{ fontFamily: "Gochi Hand", fontSize: 26, margin: "12px 0 4px" }}>What to bring</h3>
              <p style={{ fontFamily: "Inter", fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                A laptop, a charger, comfy clothes, and a half-formed idea. We supply the rest.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" data-screen-label="3-Day Journey"
    style={{ padding: "60px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span className="section-eyebrow" style={{ background: "var(--s54-lavender)" }}>The 54-hour journey</span>
        <h2 style={{ fontFamily: "Gochi Hand", fontSize: "clamp(40px, 4.5vw, 64px)",
          margin: "12px 0 0", lineHeight: 1 }}>
          Friday to Sunday. <Highlight>Idea to demo.</Highlight>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        {JOURNEY_DAYS.map((d, i) =>
        <Card key={d.day} tone="white" tilt={i % 2 === 0 ? -0.6 : 0.6} lift={true}
        style={{ padding: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{
                width: 64, height: 64,
                background: `var(--s54-${d.tone === "coral" ? "coral" : d.tone === "mint" ? "mint" : "gold"})`,
                border: "3px solid var(--s54-ink)",
                borderRadius: 14,
                boxShadow: "4px 4px 0 0 var(--s54-ink)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Gochi Hand", fontSize: 46, lineHeight: 1,
                color: d.tone === "coral" ? "#fff" : "var(--s54-ink)"
              }}>{d.n}</div>
              <div>
                <div style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 800,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "var(--s54-ink-60)" }}>
                  Day {d.n} · {d.day}
                </div>
                <h3 style={{ fontFamily: "Gochi Hand", fontSize: 34, margin: "2px 0 0", lineHeight: 1 }}>
                  {d.title}
                </h3>
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0,
            display: "flex", flexDirection: "column", gap: 10 }}>
              {d.bullets.map((b, j) =>
            <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{
                fontFamily: "Inter", fontSize: 11, fontWeight: 800,
                letterSpacing: "0.06em",
                width: 64, flexShrink: 0,
                padding: "4px 0", color: "var(--s54-ink-60)"
              }}>{b.time}</span>
                  <span style={{ fontFamily: "Inter", fontSize: 14, lineHeight: 1.45 }}>
                    {b.what}
                  </span>
                </li>
            )}
            </ul>
          </Card>
        )}
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" data-screen-label="Why participate"
    style={{ padding: "60px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
        <div>
          <span className="section-eyebrow" style={{ background: "var(--s54-mint)" }}>Why bother?</span>
          <h2 style={{ fontFamily: "Gochi Hand", fontSize: "clamp(40px, 4.5vw, 64px)",
            margin: "12px 0 0", lineHeight: 1 }}>
            One weekend that <Highlight>actually changes</Highlight> things.
          </h2>
          <p style={{ fontFamily: "Inter", fontSize: 17, lineHeight: 1.6,
            color: "var(--s54-ink-80)", marginTop: 16, maxWidth: 460 }}>
            Startup54 isn't a hackathon and it isn't a conference. It's a community programme.
            Warm, hands-on, and built for first-timers. You leave with a team, a prototype,
            and a real path into Malaysia's startup ecosystem.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {WHY_PROPS.map((w, i) =>
          <Card key={i} tone="white" tilt={(i % 2 === 0 ? -0.5 : 0.5) * (1 + i * 0.1)}
          lift={true} style={{ padding: 20 }}>
              <IconBadge tone={w.tone} size={44}>
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{w.icon}</span>
              </IconBadge>
              <h3 style={{ fontFamily: "Gochi Hand", fontSize: 24, margin: "12px 0 4px", lineHeight: 1.1 }}>
                {w.title}
              </h3>
              <p style={{ fontFamily: "Inter", fontSize: 13.5, lineHeight: 1.5,
              color: "var(--s54-ink-80)", margin: 0 }}>
                {w.body}
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

function Past() {
  const [expandedIndex, setExpandedIndex] = React.useState(0);
  const [carouselIndices, setCarouselIndices] = React.useState({});

  React.useEffect(() => {
    if (!SLIDESHOW_DURATION || SLIDESHOW_DURATION <= 0) return;
    if (expandedIndex < 0) return;
    const event = PAST_EVENTS[expandedIndex];
    const mediaCount = event?.images?.length || 0;
    if (mediaCount <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndices(prev => {
        const currentIdx = prev[expandedIndex] || 0;
        const newIdx = currentIdx === mediaCount - 1 ? 0 : currentIdx + 1;
        return { ...prev, [expandedIndex]: newIdx };
      });
    }, SLIDESHOW_DURATION);
    return () => clearInterval(timer);
  }, [expandedIndex]);

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
                        <div style={{ padding: '16px 12px', textAlign: 'center', background: '#f9f9f9' }}>
                          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                            <Button
                              variant="ink"
                              size="sm"
                              onClick={() => handleCarouselPrev(eventIndex)}
                              disabled={mediaCount === 0}
                              style={{ opacity: mediaCount === 0 ? 0.5 : 1 }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
                              Previous
                            </Button>
                            <Button
                              variant="ink"
                              size="sm"
                              onClick={() => handleCarouselNext(eventIndex)}
                              disabled={mediaCount === 0}
                              style={{ opacity: mediaCount === 0 ? 0.5 : 1 }}
                            >
                              Next
                              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
                            </Button>
                          </div>
                          {mediaCount > 1 && (
                            <div style={{
                              fontSize: 12,
                              color: 'var(--s54-ink-80)',
                              fontFamily: 'Inter',
                              marginTop: 8
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
                  <Button
                    variant="ghost"
                    onClick={() => handleToggleExpand(eventIndex)}
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      fontFamily: 'Gochi Hand',
                      fontSize: 20,
                      textAlign: 'left',
                      height: 56
                    }}
                  >
                    {event.title}
                  </Button>
                </div>
              )}

              {isExpanded && (
                <div style={{ gridColumn: "span 12" }}>
                  <Button
                    variant="ink"
                    size="sm"
                    onClick={() => handleToggleExpand(eventIndex)}
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Supporters() {
  return (
    <section id="supporters" data-screen-label="Supporters"
    style={{ padding: "60px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <span className="section-eyebrow">In good company</span>
        <h2 style={{ fontFamily: "Gochi Hand", fontSize: "clamp(36px, 4vw, 56px)",
          margin: "12px 0 0", lineHeight: 1 }}>
          Built with our <Highlight>supporters</Highlight>.
        </h2>
        <p style={{ fontFamily: "Inter", fontSize: 16, maxWidth: 540, margin: "10px auto 0",
          color: "var(--s54-ink-80)" }}>
          Startup54 is community-led. These are the partners who keep the lights on, the mentors in the room,
          and the ramen flowing.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
        {SUPPORTERS.map((s, i) =>
        <Card key={s.name}
        tone={s.bg === "ink" ? "ink" : "white"}
        tilt={(i % 2 === 0 ? -0.6 : 0.6) + (i - 2) * 0.2}
        lift={true}
        style={{
          flex: "0 0 200px", width: 200,
          padding: 24, height: 150,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <img src={s.src} alt={s.name}
          style={{
            maxWidth: "100%", maxHeight: 80, objectFit: "contain"
          }} />
          </Card>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 28 }}>
        <Button variant="ghost" size="md" href="#newsletter">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>volunteer_activism</span>
          Become a supporter
        </Button>
      </div>
    </section>
  );
}

function CTA() {
  const [email, setEmail] = useState("");

  return (
    <section id="newsletter" data-screen-label="Newsletter + CTA"
    style={{ padding: "60px 0" }}>
      <Card tone="coral" tilt={-0.8} lift={false} style={{
        padding: 48, maxWidth: 720, margin: "0 auto",
        textAlign: "center", color: "#fff"
      }}>
        <h2 style={{ fontFamily: "Gochi Hand", fontSize: "clamp(36px, 5vw, 56px)",
          margin: "0 0 16px", lineHeight: 1 }}>
          {CTA_DATA.headline || "Stay in the loop"}
        </h2>
        <p style={{ fontFamily: "Inter", fontSize: 18, lineHeight: 1.6,
          margin: "0 0 24px", opacity: 0.95 }}>
          {CTA_DATA.description || "Get updates on Startup54 events across Malaysia, mentorship tips, and early access to registration."}
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1, minWidth: 240,
              padding: "0 18px",
              height: 50,
              border: "3px solid #fff",
              borderRadius: 12,
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              color: "var(--s54-ink)",
              background: "#fff"
            }}
          />
          <Button variant="ghost" size="lg" href={CTA_DATA.buttonUrl || "https://luma.com/ujnecsej"} style={{ whiteSpace: "nowrap" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_forward</span>
            {CTA_DATA.buttonText || "Register now"}
          </Button>
        </div>
      </Card>
    </section>
  );
}

function Footer({ logo }) {
  return (
    <footer style={{
      borderTop: "3px solid var(--s54-ink)",
      background: "var(--s54-white)",
      padding: "40px 32px",
      marginTop: 40
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32
      }}>
        <div style={{ flex: 1 }}>
          <img src={logo} alt="Startup54" style={{ height: 40, width: "auto", marginBottom: 12 }} />
          <p style={{ fontFamily: "Inter", fontSize: 14, color: "var(--s54-ink-80)", margin: 0, maxWidth: 400 }}>
            Startup54 is a community-led initiative empowering the next generation of founders across Malaysia.
          </p>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          <div>
            <h4 style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 700, textTransform: "uppercase",
              color: "var(--s54-ink-60)", marginBottom: 8 }}>Links</h4>
            {[
              ["Home", "#top"],
              ["Events", "#events"],
              ["Register", "https://luma.com/ujnecsej"],
            ].map(([label, href]) => (
              <a key={label} href={href} style={{
                display: "block", fontFamily: "Inter", fontSize: 14, color: "var(--s54-ink-80)",
                marginBottom: 6, textDecoration: "none"
              }}>{label}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 700, textTransform: "uppercase",
              color: "var(--s54-ink-60)", marginBottom: 8 }}>Follow</h4>
            {[
              ["Twitter", "#"],
              ["Instagram", "#"],
              ["LinkedIn", "#"],
            ].map(([label, href]) => (
              <a key={label} href={href} style={{
                display: "block", fontFamily: "Inter", fontSize: 14, color: "var(--s54-ink-80)",
                marginBottom: 6, textDecoration: "none"
              }}>{label}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", paddingTop: 32, borderTop: "2px solid var(--s54-ink-40)", marginTop: 32 }}>
        <p style={{ fontFamily: "Inter", fontSize: 13, color: "var(--s54-ink-60)", margin: 0 }}>
          © 2026 Startup54. All rights reserved. Empowering communities through entrepreneurship.
        </p>
      </div>
    </footer>
  );
}
