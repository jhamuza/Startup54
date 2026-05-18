/* global React, ReactDOM, Header, HeroTicket, EventsSection, Upcoming, Journey, Why, Past, Supporters, CTA, Footer */

const LOGO = "/s54-sticker.png";

function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <Header logo={LOGO} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <main style={{
          width: "100%", maxWidth: 1280, margin: "0 auto",
          padding: "0 32px",
        }} data-screen-label="Startup54 Malaysia">
          <HeroTicket logo={LOGO} />
          <EventsSection />
          <Upcoming />
          <Journey />
          <Why />
          <Past />
          <Supporters />
          <CTA />
          <Footer logo={LOGO} />
        </main>
      </div>
    </div>
  );
}

// Wait for CMS data to load before rendering
(async () => {
  await window.CMS_DATA_PROMISE;
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
