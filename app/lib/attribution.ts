export type Touchpoint = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
  msclkid: string;
  landingPage: string;
  referrer: string;
  capturedAt: string;
};

export type LeadAttribution = {
  firstTouch: Touchpoint;
  lastTouch: Touchpoint;
  sourcePage: string;
  hubspotUtk: string;
};

const STORAGE_KEY = "fsi_attribution_v1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function getCookie(name: string) {
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : "";
}

function currentTouchpoint(): Touchpoint {
  const params = new URLSearchParams(window.location.search);

  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmTerm: params.get("utm_term") ?? "",
    utmContent: params.get("utm_content") ?? "",
    gclid: params.get("gclid") ?? "",
    fbclid: params.get("fbclid") ?? "",
    msclkid: params.get("msclkid") ?? "",
    landingPage: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer,
    capturedAt: new Date().toISOString(),
  };
}

export function captureAttribution(sourcePage: string): LeadAttribution {
  const latest = currentTouchpoint();
  let firstTouch = latest;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as { firstTouch?: Touchpoint };
      if (parsed.firstTouch?.capturedAt) firstTouch = parsed.firstTouch;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ firstTouch, lastTouch: latest }),
    );
  } catch {
    // Attribution still works for the current page when storage is unavailable.
  }

  return {
    firstTouch,
    lastTouch: latest,
    sourcePage,
    hubspotUtk: getCookie("hubspotutk"),
  };
}

export function trackFunnelEvent(
  eventName: string,
  properties: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", eventName, properties);
  } else {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: eventName, ...properties });
  }
}
