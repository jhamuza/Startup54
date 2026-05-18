// Shared data loader for CMS content
let EVENTS = [];
let JOURNEY_DAYS = [];
let WHY_PROPS = [];
let SUPPORTERS = [];
let HERO_DATA = {};
let CTA_DATA = {};

let dataLoadError = null;
let dataLoadStarted = false;
window.CMS_DATA_STATUS = 'idle';

async function loadCMSData() {
  window.CMS_DATA_STATUS = 'loading';
  dataLoadStarted = true;
  try {
    // Load all content in parallel
    const [eventsRes, journeyRes, whyRes, supportersRes, heroRes, ctaRes] = await Promise.all([
      fetch('/_content/events.json'),
      fetch('/_content/journey.json'),
      fetch('/_content/why.json'),
      fetch('/_content/supporters.json'),
      fetch('/_content/hero.json'),
      fetch('/_content/cta.json')
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
    window.CMS_DATA_STATUS = 'loaded';
    dataLoadError = null;
    return true;
  } catch (error) {
    console.error('Failed to load CMS data:', error);
    dataLoadError = error;
    window.CMS_DATA_STATUS = 'error';
    return false;
  }
}

// Load data immediately
const dataLoadPromise = loadCMSData();
window.CMS_DATA_PROMISE = dataLoadPromise;
