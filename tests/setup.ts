import "@testing-library/jest-dom";

// Polyfill ResizeObserver for Radix UI components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Polyfill IntersectionObserver for reveal-on-scroll + count-up hooks.
// Immediately invokes the callback reporting the element as intersecting so
// reveal/count-up resolve to their final visible state synchronously in tests.
global.IntersectionObserver = class IntersectionObserver {
  private callback: IntersectionObserverCallback;
  root = null;
  rootMargin = "";
  thresholds: ReadonlyArray<number> = [];
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe(target: Element) {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
} as unknown as typeof IntersectionObserver;

// Mock matchMedia for theme provider tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
