import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LogoMark } from "@/components/layout/logo-mark";

describe("LogoMark", () => {
  it("renders an SVG with the accessible name 'Scalenty'", () => {
    render(<LogoMark />);
    const svg = screen.getByRole("img", { name: "Scalenty" });
    expect(svg).toBeInTheDocument();
    expect(svg.tagName.toLowerCase()).toBe("svg");
  });

  it("keeps the Atlas artwork viewBox", () => {
    render(<LogoMark />);
    const svg = screen.getByRole("img", { name: "Scalenty" });
    expect(svg).toHaveAttribute("viewBox", "31 28 353 511");
  });

  it("uses the on-light colours by default (emerald arrow on ink)", () => {
    render(<LogoMark />);
    const svg = screen.getByRole("img", { name: "Scalenty" });
    const fills = Array.from(svg.querySelectorAll("path")).map((p) => p.getAttribute("fill"));
    expect(fills).toContain("#0E8C5A"); // arrow
    expect(fills).toContain("#15201B"); // S
  });

  it("uses the on-dark colours when onDark is set (mint arrow on off-white)", () => {
    render(<LogoMark onDark />);
    const svg = screen.getByRole("img", { name: "Scalenty" });
    const fills = Array.from(svg.querySelectorAll("path")).map((p) => p.getAttribute("fill"));
    expect(fills).toContain("#6FD3A4"); // arrow
    expect(fills).toContain("#FAF9F5"); // S
  });

  it("forwards className to the svg", () => {
    render(<LogoMark className="h-6 w-auto" />);
    const svg = screen.getByRole("img", { name: "Scalenty" });
    expect(svg).toHaveClass("h-6", "w-auto");
  });
});
