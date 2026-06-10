import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ContactInfo } from "@/components/sections/contact-info";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render ContactInfo with LanguageProvider wrapper
 */
function renderContactInfo(props: { email: string }) {
  return render(
    <LanguageProvider>
      <ContactInfo {...props} />
    </LanguageProvider>
  );
}

describe("ContactInfo", () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    localStorageMock = {};
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
    });

    Object.defineProperty(navigator, "language", {
      get: () => "en-US",
      configurable: true,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders email with mailto link", () => {
    renderContactInfo({ email: "test@example.com" });
    const emailLink = screen.getByRole("link", { name: /test@example\.com/i });
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders the four .ci row labels", () => {
    renderContactInfo({ email: "test@example.com" });
    expect(
      screen.getByRole("heading", { name: /email/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /phone/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /working remotely/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /response time/i })
    ).toBeInTheDocument();
  });

  it("renders the static contact-info body copy", () => {
    renderContactInfo({ email: "test@example.com" });
    expect(
      screen.getByText(/available on request/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sellers worldwide/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/within one business day/i)
    ).toBeInTheDocument();
  });

  it("does not render the legacy 'reach us directly' heading", () => {
    renderContactInfo({ email: "test@example.com" });
    expect(
      screen.queryByRole("heading", { name: /reach us directly/i })
    ).not.toBeInTheDocument();
  });
});
