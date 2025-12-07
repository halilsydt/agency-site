import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServicesOverview } from "@/components/sections/services-overview";

describe("ServicesOverview", () => {
  it("renders the section headline", () => {
    render(<ServicesOverview headline="Services for Amazon & Etsy Sellers" />);
    expect(
      screen.getByRole("heading", { level: 2 })
    ).toHaveTextContent("Services for Amazon & Etsy Sellers");
  });

  it("renders Amazon platform card", () => {
    render(<ServicesOverview headline="Services" />);
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
  });

  it("renders Etsy platform card", () => {
    render(<ServicesOverview headline="Services" />);
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
  });

  it("renders CTA links with correct hrefs", () => {
    render(<ServicesOverview headline="Services" />);
    expect(
      screen.getByRole("link", { name: /explore amazon/i })
    ).toHaveAttribute("href", "/services/amazon");
    expect(
      screen.getByRole("link", { name: /explore etsy/i })
    ).toHaveAttribute("href", "/services/etsy");
  });

  it("renders subheadline when provided", () => {
    render(
      <ServicesOverview
        headline="Services"
        subheadline="Choose your marketplace"
      />
    );
    expect(screen.getByText("Choose your marketplace")).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    render(<ServicesOverview headline="Services" />);
    expect(
      screen.queryByText("Choose your marketplace")
    ).not.toBeInTheDocument();
  });
});
