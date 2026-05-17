// Shared data loader for CMS content
let EVENTS = [];
let JOURNEY_DAYS = [];
let WHY_PROPS = [];
let SUPPORTERS = [];
let HERO_DATA = {};
let CTA_DATA = {};

async function loadCMSData() {
  try {
    // Load all content in parallel
    const [eventsRes, journeyRes, whyRes, supportersRes, heroRes, ctaRes] = await Promise.all([
      fetch('/cms/events.json'),
      fetch('/cms/journey.json'),
      fetch('/cms/why.json'),
      fetch('/cms/supporters.json'),
      fetch('/cms/hero.json'),
      fetch('/cms/cta.json')
    ]);

    const eventsData = await eventsRes.json();
    const journeyData = await journeyRes.json();
    const whyData = await whyRes.json();
    const supportersData = await supportersRes.json();
    const heroData = await heroRes.json();
    const ctaData = await ctaRes.json();

    EVENTS = eventsData.events || [];
    JOURNEY_DAYS = journeyData.days || [];
    WHY_PROPS = whyData.why || [];
    SUPPORTERS = supportersData.supporters || [];
    HERO_DATA = heroData;
    CTA_DATA = ctaData;

    console.log('✓ CMS data loaded:', { EVENTS, JOURNEY_DAYS, WHY_PROPS, SUPPORTERS });
    return true;
  } catch (error) {
    console.error('Failed to load CMS data:', error);
    return false;
  }
}

// Load data immediately
loadCMSData();
