// Google Analytics. The tag itself is loaded in public/index.html.
// The app's screens are all one page, so each screen is reported as its own page view.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Names as they appear in the Analytics reports, by step number (0 is the landing screen).
const SCREENS = ['Landing', 'Your language', 'Requirements', 'Card'];

export const trackScreen = (step: number) => {
  const title = SCREENS[step] ?? `Step ${step}`;
  window.gtag?.('event', 'page_view', {
    page_title: title,
    page_location: `${window.location.origin}${window.location.pathname}#${title.toLowerCase().replace(/\s+/g, '-')}`,
  });
};
