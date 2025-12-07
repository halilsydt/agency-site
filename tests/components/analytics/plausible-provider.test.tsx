import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PlausibleProvider } from "@/components/analytics/plausible-provider";

// Mock next/script to verify it's called with correct props
vi.mock("next/script", () => ({
  default: vi.fn(({ "data-domain": domain, src, defer, strategy }) => {
    if (domain) {
      return (
        <script
          data-testid="plausible-script"
          data-domain={domain}
          src={src}
          data-defer={defer ? "true" : "false"}
          data-strategy={strategy}
        />
      );
    }
    return null;
  }),
}));

describe("PlausibleProvider", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("renders script tag with correct domain when configured", () => {
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN = "example.com";

    render(
      <PlausibleProvider>
        <div>Child content</div>
      </PlausibleProvider>
    );

    const script = screen.getByTestId("plausible-script");
    expect(script).toBeInTheDocument();
    expect(script).toHaveAttribute("data-domain", "example.com");
    expect(script).toHaveAttribute("src", "https://plausible.io/js/script.js");
    expect(script).toHaveAttribute("data-defer", "true");
    expect(script).toHaveAttribute("data-strategy", "afterInteractive");
  });

  it("renders children without script when domain not configured", () => {
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN = "";

    render(
      <PlausibleProvider>
        <div data-testid="child">Child content</div>
      </PlausibleProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.queryByTestId("plausible-script")).not.toBeInTheDocument();
  });

  it("renders children without script when domain is undefined", () => {
    delete process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

    render(
      <PlausibleProvider>
        <div data-testid="child">Child content</div>
      </PlausibleProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.queryByTestId("plausible-script")).not.toBeInTheDocument();
  });

  it("renders children content", () => {
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN = "example.com";

    render(
      <PlausibleProvider>
        <div>Test child content</div>
      </PlausibleProvider>
    );

    expect(screen.getByText("Test child content")).toBeInTheDocument();
  });
});
