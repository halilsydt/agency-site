import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ContactInfo } from "@/components/sections/contact-info";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render ContactInfo with LanguageProvider wrapper
 */
function renderContactInfo(props: {
  email: string;
  phone?: string;
  address?: string;
}) {
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

  it("renders heading", () => {
    renderContactInfo({ email: "test@example.com" });
    expect(
      screen.getByRole("heading", { name: /reach us directly/i })
    ).toBeInTheDocument();
  });

  it("renders phone when provided", () => {
    renderContactInfo({ email: "test@example.com", phone: "555-1234" });
    expect(screen.getByText(/555-1234/)).toBeInTheDocument();
  });

  it("renders address when provided", () => {
    renderContactInfo({ email: "test@example.com", address: "123 Main St" });
    expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
  });

  it("does not render phone when not provided", () => {
    renderContactInfo({ email: "test@example.com" });
    expect(screen.queryByText(/phone/i)).not.toBeInTheDocument();
  });
});
