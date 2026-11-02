/**
 * ToucanPay Intro Session State Manager
 * 
 * Rules:
 * 1. When the page is REFRESHED (F5 / reload button) on the homepage -> DISPLAY logo animation.
 * 2. When the user visits initially in a new browsing session on the homepage -> DISPLAY logo animation.
 * 3. When the user navigates using the browser BACK / FORWARD arrow -> DO NOT replay logo animation.
 * 4. When the user navigates between internal pages or returns to home -> DO NOT replay logo animation.
 */

const STORAGE_KEY = "toucan_intro_completed";

/**
 * Checks if the intro has already completed in the current browsing session.
 */
export function hasIntroCompletedInSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch (e) {
    return false;
  }
}

/**
 * Records that the intro animation has finished in the current browsing session.
 */
export function markIntroCompletedInSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, "true");
  } catch (e) {}
}

/**
 * Clears the session completion flag (e.g., for testing or forced replay).
 */
export function clearIntroSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

/**
 * Detects whether the current navigation is an explicit browser page reload/refresh (F5, Ctrl+R, reload icon).
 */
export function isPageReload(): boolean {
  if (typeof window === "undefined") return false;

  // 1. Navigation Timing API Level 2 (Standard in all modern browsers)
  try {
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries && navEntries.length > 0) {
      const nav = navEntries[0] as PerformanceNavigationTiming;
      return nav.type === "reload";
    }
  } catch (e) {}

  // 2. Legacy Navigation Timing Level 1
  try {
    if (window.performance && window.performance.navigation) {
      return window.performance.navigation.type === 1; // TYPE_RELOAD
    }
  } catch (e) {}

  return false;
}

/**
 * Detects whether the current navigation is a browser back/forward history action.
 */
export function isBackForwardNavigation(): boolean {
  if (typeof window === "undefined") return false;

  // 1. Navigation Timing API Level 2
  try {
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries && navEntries.length > 0) {
      const nav = navEntries[0] as PerformanceNavigationTiming;
      return nav.type === "back_forward";
    }
  } catch (e) {}

  // 2. Legacy Navigation Timing Level 1
  try {
    if (window.performance && window.performance.navigation) {
      return window.performance.navigation.type === 2; // TYPE_BACK_FORWARD
    }
  } catch (e) {}

  return false;
}

/**
 * Central determination for whether the intro animation should be displayed.
 */
export function shouldShowIntro(): boolean {
  if (typeof window === "undefined") return false;

  // Only display on the root homepage '/' (supporting subpath deployment like /toucanpay/)
  const cleanPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isHome = cleanPath === "/" || cleanPath.endsWith("/toucanpay");
  if (!isHome) {
    return false;
  }

  // URL query parameter overrides (for preview / testing)
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("forceIntro") === "true") return true;
    const revealTime = params.get("revealTime") || params.get("time");
    if (revealTime && parseFloat(revealTime) >= 5.0) return false;
  } catch (e) {}

  // Rule 1: Browser Back / Forward navigation -> NEVER display intro
  if (isBackForwardNavigation()) {
    return false;
  }

  // Rule 2: Page Refresh (F5 / browser reload button) -> ALWAYS display logo animation!
  if (isPageReload()) {
    return true;
  }

  // Rule 3: If already completed in this browsing session -> DO NOT display
  if (hasIntroCompletedInSession()) {
    return false;
  }

  // Rule 4: First visit in a new session
  return true;
}
