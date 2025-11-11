// Google Analytics 4 utilities for SPA tracking

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    gaTest?: () => void;
  }
}

/**
 * Send a page view event to GA4 for client-side route changes
 * @param path - The new page path
 */
export const sendGaPageview = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-YB4Y2HZBXP', {
      page_path: path,
    });
  }
};

/**
 * Send a custom event to GA4
 * @param eventName - Name of the event
 * @param parameters - Event parameters
 */
export const sendGaEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};