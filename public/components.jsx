/* global React */
const { useState, useEffect } = React;

function Card({ tone = "white", tilt = 0, lift = true, style = {}, className = "", children, ...rest }) {
  const toneBg = {
    white:    "var(--s54-white)",
    cream:    "var(--s54-cream)",
    coral:    "var(--s54-coral)",
    mint:     "var(--s54-mint)",
    gold:     "var(--s54-gold)",
    lavender: "var(--s54-lavender)",
    ink:      "var(--s54-ink)",
  }[tone] || "var(--s54-white)";
  const color = tone === "ink" ? "#fff" : tone === "coral" ? "#fff" : "var(--s54-ink)";
  return (
    <div
      className={"s54-card-base " + className}
      style={{
        background: toneBg,
        color,
        border: "3px solid var(--s54-ink)",
        borderRadius: 16,
        boxShadow: "6px 6px 0 0 var(--s54-ink)",
        padding: 24,
        transform: `rotate(${tilt}deg)`,
        transition: "transform 300ms var(--ease-out), box-shadow 300ms var(--ease-out)",
        ...style,
      }}
      onMouseEnter={lift ? (e) => {
        e.currentTarget.style.transform = `rotate(${tilt}deg) translateY(-4px) scale(1.02)`;
        e.currentTarget.style.boxShadow = "10px 10px 0 0 var(--s54-ink)";
      } : undefined}
      onMouseLeave={lift ? (e) => {
        e.currentTarget.style.transform = `rotate(${tilt}deg)`;
        e.currentTarget.style.boxShadow = "6px 6px 0 0 var(--s54-ink)";
      } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

function Button({ variant = "coral", size = "md", href, children, style = {}, ...rest }) {
  const bg = {
    coral: "var(--s54-coral)",
    ghost: "var(--s54-white)",
    gold:  "var(--s54-gold)",
    mint:  "var(--s54-mint)",
    ink:   "var(--s54-ink)",
  }[variant];
  const color = variant === "coral" || variant === "ink" ? "#fff" : "var(--s54-ink)";
  const sz = size === "lg" ? { height: 56, padding: "0 28px", fontSize: 16 }
           : size === "sm" ? { height: 36, padding: "0 16px", fontSize: 13 }
           :                  { height: 44, padding: "0 22px", fontSize: 14 };
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        background: bg,
        color,
        border: "3px solid var(--s54-ink)",
        borderRadius: 12,
        fontFamily: "Inter, sans-serif",
        fontWeight: 700,
        letterSpacing: "0.02em",
        cursor: "pointer",
        boxShadow: "6px 6px 0 0 var(--s54-ink)",
        textDecoration: "none",
        transition: "transform 150ms var(--ease-out), box-shadow 150ms var(--ease-out)",
        whiteSpace: "nowrap",
        ...sz,
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "translate(2px,2px)"; e.currentTarget.style.boxShadow = "3px 3px 0 0 var(--s54-ink)"; }}
      onMouseUp={(e)   => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "6px 6px 0 0 var(--s54-ink)"; }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function IconBadge({ tone = "coral", size = 40, children, style = {} }) {
  const bg = {
    coral: "var(--s54-coral)", mint: "var(--s54-mint)",
    gold: "var(--s54-gold)",   lavender: "var(--s54-lavender)",
    white: "var(--s54-white)", ink: "var(--s54-ink)",
  }[tone] || tone;
  const color = tone === "coral" || tone === "ink" ? "#fff" : "var(--s54-ink)";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: size, height: size,
      background: bg, color,
      border: "3px solid var(--s54-ink)",
      borderRadius: 10,
      boxShadow: "3px 3px 0 0 var(--s54-ink)",
      flexShrink: 0,
      ...style,
    }}>
      {children}
    </span>
  );
}

function Highlight({ children, color = "var(--s54-gold)" }) {
  return (
    <span style={{
      background: color, color: "var(--s54-ink)",
      padding: "0.05em 0.35em", borderRadius: 6,
      display: "inline-block", transform: "rotate(-1deg)",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    }}>{children}</span>
  );
}

function Header({ logo }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 300ms var(--ease-out)",
      background: scrolled ? "rgba(254,243,199,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "3px solid var(--s54-ink)" : "3px solid transparent",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "14px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={logo} alt="Startup54" style={{ height: 44, width: "auto" }} />
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {[
            ["Events",    "#events"],
            ["Upcoming",  "#upcoming"],
            ["Journey",   "#journey"],
            ["Past",      "#past"],
            ["Supporters","#supporters"],
          ].map(([label, href]) => (
            <a key={href} href={href} style={{
              padding: "8px 14px", fontFamily: "Inter", fontWeight: 600, fontSize: 14,
              color: "var(--s54-ink)", borderRadius: 8,
            }}>{label}</a>
          ))}
          <Button variant="coral" size="sm" href="https://luma.com/ujnecsej" style={{ marginLeft: 8 }}>
            Register
          </Button>
        </nav>
      </div>
    </header>
  );
}

function Countdown({ target = "2026-06-19T09:00:00+08:00", color = "var(--s54-ink)" }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, new Date(target).getTime() - now);
  const d  = Math.floor(ms / 86400000);
  const h  = Math.floor((ms % 86400000) / 3600000);
  const m  = Math.floor((ms % 3600000) / 60000);
  const s  = Math.floor((ms % 60000) / 1000);
  const units = [["Days", d], ["Hours", h], ["Minutes", m], ["Seconds", s]];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
      {units.map(([label, val]) => (
        <div key={label} style={{
          background: "var(--s54-white)",
          border: "2px solid var(--s54-ink)",
          borderRadius: 8,
          padding: "8px 4px",
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
        }}>
          <div style={{ fontWeight: 800, fontSize: 24, lineHeight: 1, fontVariantNumeric: "tabular-nums", color: "var(--s54-ink)" }}>
            {String(val).padStart(2, "0")}
          </div>
          <div style={{ fontWeight: 600, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4, color: "var(--s54-ink-60)" }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
