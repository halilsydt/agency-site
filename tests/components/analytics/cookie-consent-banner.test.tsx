import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { CookieConsentProvider } from "@/components/analytics/cookie-consent-provider";
import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";

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

describe("CookieConsentBanner", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.stubEnv("NEXT_PUBLIC_COOKIE_CONSENT_ENABLED", "true");
  });

  it("renders banner when no consent given", async () => {
    render(
      <CookieConsentProvider>
        <div>Content</div>
      </CookieConsentProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/we use cookies/i)).toBeInTheDocument();
    });
  });

  it("hides banner when consent already accepted", async () => {
    localStorageMock.setItem(
      "cookie-consent",
      JSON.stringify({ status: "accepted" })
    );

    render(
      <CookieConsentProvider>
        <div>Content</div>
      </CookieConsentProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/we use cookies/i)).not.toBeInTheDocument();
    });
  });

  it("hides banner when consent already declined", async () => {
    localStorageMock.setItem(
      "cookie-consent",
      JSON.stringify({ status: "declined" })
    );

    render(
      <CookieConsentProvider>
        <div>Content</div>
      </CookieConsentProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/we use cookies/i)).not.toBeInTheDocument();
    });
  });

  it("clicking Accept saves consent and hides banner", async () => {
    const user = userEvent.setup();

    render(
      <CookieConsentProvider>
        <div>Content</div>
      </CookieConsentProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/we use cookies/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /accept/i }));

    await waitFor(() => {
      expect(screen.queryByText(/we use cookies/i)).not.toBeInTheDocument();
    });

    const stored = JSON.parse(localStorageMock.getItem("cookie-consent")!);
    expect(stored.status).toBe("accepted");
  });

  it("clicking Decline saves preference and hides banner", async () => {
    const user = userEvent.setup();

    render(
      <CookieConsentProvider>
        <div>Content</div>
      </CookieConsentProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/we use cookies/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /decline/i }));

    await waitFor(() => {
      expect(screen.queryByText(/we use cookies/i)).not.toBeInTheDocument();
    });

    const stored = JSON.parse(localStorageMock.getItem("cookie-consent")!);
    expect(stored.status).toBe("declined");
  });

  it("contains link to Privacy Policy", async () => {
    render(
      <CookieConsentProvider>
        <div>Content</div>
      </CookieConsentProvider>
    );

    await waitFor(() => {
      const link = screen.getByRole("link", { name: /privacy policy/i });
      expect(link).toHaveAttribute("href", "/privacy");
    });
  });

  it("has accessible region role with aria-live", async () => {
    render(
      <CookieConsentProvider>
        <div>Content</div>
      </CookieConsentProvider>
    );

    await waitFor(() => {
      const region = screen.getByRole("region", { name: /cookie consent/i });
      expect(region).toBeInTheDocument();
      expect(region).toHaveAttribute("aria-live", "polite");
    });
  });

  it("renders Accept and Decline buttons", async () => {
    render(
      <CookieConsentProvider>
        <div>Content</div>
      </CookieConsentProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /decline/i })).toBeInTheDocument();
    });
  });
});

describe("CookieConsentBanner standalone", () => {
  it("calls onAccept when Accept is clicked", async () => {
    const user = userEvent.setup();
    const onAccept = vi.fn();
    const onDecline = vi.fn();

    render(<CookieConsentBanner onAccept={onAccept} onDecline={onDecline} />);

    await user.click(screen.getByRole("button", { name: /accept/i }));

    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onDecline).not.toHaveBeenCalled();
  });

  it("calls onDecline when Decline is clicked", async () => {
    const user = userEvent.setup();
    const onAccept = vi.fn();
    const onDecline = vi.fn();

    render(<CookieConsentBanner onAccept={onAccept} onDecline={onDecline} />);

    await user.click(screen.getByRole("button", { name: /decline/i }));

    expect(onDecline).toHaveBeenCalledTimes(1);
    expect(onAccept).not.toHaveBeenCalled();
  });
});
