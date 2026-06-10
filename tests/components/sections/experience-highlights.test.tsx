import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  ExperienceHighlights,
  parseStatValue,
} from "@/components/sections/experience-highlights";

const mockHighlights = [
  { id: "years", label: "Years Experience", value: "5+", icon: "calendar" },
  { id: "clients", label: "Clients Helped", value: "100+", icon: "users" },
  { id: "revenue", label: "Revenue Generated", value: "$1M+", icon: "trending-up" },
  { id: "platforms", label: "Platforms", value: "2", icon: "store" },
];

describe("ExperienceHighlights", () => {
  it("renders all highlight labels", () => {
    render(<ExperienceHighlights highlights={mockHighlights} />);
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
    expect(screen.getByText("Clients Helped")).toBeInTheDocument();
    expect(screen.getByText("Revenue Generated")).toBeInTheDocument();
    expect(screen.getByText("Platforms")).toBeInTheDocument();
  });

  it("renders within a section element", () => {
    const { container } = render(
      <ExperienceHighlights highlights={mockHighlights} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the ink show panel", () => {
    const { container } = render(
      <ExperienceHighlights highlights={mockHighlights} />
    );
    expect(container.querySelector(".bg-ink")).toBeInTheDocument();
  });

  it("renders the stats band with four stats", () => {
    const { container } = render(
      <ExperienceHighlights highlights={mockHighlights} />
    );
    const band = container.querySelector(".stats-band");
    expect(band).toBeInTheDocument();
    expect(band?.children).toHaveLength(4);
  });
});

describe("parseStatValue", () => {
  it("parses a plain integer", () => {
    expect(parseStatValue("2")).toEqual({ to: 2, prefix: "", suffix: "" });
  });

  it("parses a trailing suffix", () => {
    expect(parseStatValue("5+")).toEqual({ to: 5, prefix: "", suffix: "+" });
    expect(parseStatValue("100+")).toEqual({ to: 100, prefix: "", suffix: "+" });
  });

  it("parses a leading prefix with a unit suffix", () => {
    expect(parseStatValue("$1M+")).toEqual({ to: 1, prefix: "$", suffix: "M+" });
  });

  it("falls back to suffix-only when there is no number", () => {
    expect(parseStatValue("N/A")).toEqual({ to: 0, prefix: "", suffix: "N/A" });
  });
});
