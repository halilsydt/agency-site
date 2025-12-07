import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { trackEvent } from "@/lib/api/plausible";

describe("trackEvent", () => {
  let mockPlausible: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockPlausible = vi.fn();
    window.plausible = mockPlausible;
  });

  afterEach(() => {
    delete window.plausible;
  });

  it("calls window.plausible with event name", () => {
    trackEvent("contact_form_submit");

    expect(mockPlausible).toHaveBeenCalledWith("contact_form_submit", undefined);
  });

  it("calls window.plausible with props when provided", () => {
    trackEvent("contact_form_submit", { platform: "amazon" });

    expect(mockPlausible).toHaveBeenCalledWith("contact_form_submit", {
      props: { platform: "amazon" },
    });
  });

  it("passes multiple props correctly", () => {
    trackEvent("contact_form_submit", { platform: "etsy", source: "homepage" });

    expect(mockPlausible).toHaveBeenCalledWith("contact_form_submit", {
      props: { platform: "etsy", source: "homepage" },
    });
  });

  it("is no-op when plausible not available", () => {
    delete window.plausible;

    // Should not throw
    expect(() => trackEvent("email_signup")).not.toThrow();
  });

  it("tracks email_signup event", () => {
    trackEvent("email_signup");

    expect(mockPlausible).toHaveBeenCalledWith("email_signup", undefined);
  });

  it("tracks booking_initiated event", () => {
    trackEvent("booking_initiated");

    expect(mockPlausible).toHaveBeenCalledWith("booking_initiated", undefined);
  });

  it("tracks pricing_page_view event", () => {
    trackEvent("pricing_page_view");

    expect(mockPlausible).toHaveBeenCalledWith("pricing_page_view", undefined);
  });
});
