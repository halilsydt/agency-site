import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResultsGallery } from "@/components/sections/results-gallery";

describe("ResultsGallery", () => {
  it("renders the section headline", () => {
    render(<ResultsGallery headline="Real Results from Real Clients" />);
    expect(
      screen.getByRole("heading", { level: 2 })
    ).toHaveTextContent("Real Results from Real Clients");
  });

  it("renders all result cards with captions", () => {
    render(<ResultsGallery headline="Real Results from Real Clients" />);
    expect(screen.getByText(/Full year sales growth/i)).toBeInTheDocument();
    expect(screen.getByText(/5 years of consistent growth/i)).toBeInTheDocument();
    expect(screen.getByText(/Strong yearly performance/i)).toBeInTheDocument();
    expect(screen.getByText(/Rapid growth since launch/i)).toBeInTheDocument();
  });

  it("renders images with proper alt text", () => {
    render(<ResultsGallery headline="Real Results from Real Clients" />);
    expect(
      screen.getByRole("img", { name: /Amazon seller dashboard showing yearly/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /all-time sales from 2020/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Etsy shop dashboard showing yearly/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /New Etsy shop growth from May/i })
    ).toBeInTheDocument();
  });

  it("renders optional subheadline when provided", () => {
    render(
      <ResultsGallery
        headline="Real Results"
        subheadline="See what we've achieved for our clients"
      />
    );
    expect(
      screen.getByText(/See what we've achieved for our clients/i)
    ).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    render(<ResultsGallery headline="Real Results" />);
    expect(
      screen.queryByText(/See what we've achieved/i)
    ).not.toBeInTheDocument();
  });

  it("renders platform badges for all results", () => {
    render(<ResultsGallery headline="Real Results from Real Clients" />);
    // There is 1 Amazon badge and 3 Etsy badges
    const amazonBadges = screen.getAllByText("amazon");
    const etsyBadges = screen.getAllByText("etsy");
    expect(amazonBadges.length).toBe(1);
    expect(etsyBadges.length).toBe(3);
  });

  it("renders custom results when provided", () => {
    const customResults = [
      {
        id: "custom-1",
        imageSrc: "/images/custom.svg",
        imageAlt: "Custom result",
        caption: "Custom caption",
        platform: "amazon" as const,
      },
    ];
    render(
      <ResultsGallery headline="Custom Results" results={customResults} />
    );
    expect(screen.getByText("Custom caption")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Custom result" })
    ).toBeInTheDocument();
  });
});
