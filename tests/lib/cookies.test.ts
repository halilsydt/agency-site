import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getCookieConsent,
  setCookieConsent,
  hasConsentBeenGiven,
} from "@/lib/cookies";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Cookie Consent Utilities", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe("getCookieConsent", () => {
    it("returns null when no consent saved", () => {
      expect(getCookieConsent()).toBeNull();
    });

    it("returns saved consent state", () => {
      localStorageMock.setItem(
        "cookie-consent",
        JSON.stringify({ status: "accepted", timestamp: "2024-01-01" })
      );
      const consent = getCookieConsent();
      expect(consent?.status).toBe("accepted");
    });

    it("returns declined consent state", () => {
      localStorageMock.setItem(
        "cookie-consent",
        JSON.stringify({ status: "declined", timestamp: "2024-01-01" })
      );
      const consent = getCookieConsent();
      expect(consent?.status).toBe("declined");
    });
  });

  describe("setCookieConsent", () => {
    it("saves accepted consent to localStorage", () => {
      setCookieConsent("accepted");
      const stored = JSON.parse(localStorageMock.getItem("cookie-consent")!);
      expect(stored.status).toBe("accepted");
      expect(stored.timestamp).toBeTruthy();
    });

    it("saves declined consent to localStorage", () => {
      setCookieConsent("declined");
      const stored = JSON.parse(localStorageMock.getItem("cookie-consent")!);
      expect(stored.status).toBe("declined");
      expect(stored.timestamp).toBeTruthy();
    });

    it("includes ISO timestamp", () => {
      const before = new Date().toISOString();
      setCookieConsent("accepted");
      const after = new Date().toISOString();

      const stored = JSON.parse(localStorageMock.getItem("cookie-consent")!);
      expect(stored.timestamp >= before).toBe(true);
      expect(stored.timestamp <= after).toBe(true);
    });
  });

  describe("hasConsentBeenGiven", () => {
    it("returns false when no consent saved", () => {
      expect(hasConsentBeenGiven()).toBe(false);
    });

    it("returns true when consent accepted", () => {
      setCookieConsent("accepted");
      expect(hasConsentBeenGiven()).toBe(true);
    });

    it("returns true when consent declined", () => {
      setCookieConsent("declined");
      expect(hasConsentBeenGiven()).toBe(true);
    });

    it("returns false when status is pending", () => {
      localStorageMock.setItem(
        "cookie-consent",
        JSON.stringify({ status: "pending" })
      );
      expect(hasConsentBeenGiven()).toBe(false);
    });
  });
});
