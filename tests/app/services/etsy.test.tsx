import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EtsyServicesPage from "@/app/services/etsy/page";

describe("Etsy Services Page", () => {
  it("renders ServiceHero with Etsy headline", () => {
    render(<EtsyServicesPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /etsy services/i })
    ).toBeInTheDocument();
  });

  it("renders ServiceHero subheadline", () => {
    render(<EtsyServicesPage />);
    expect(
      screen.getByText(/expert consulting and management services/i)
    ).toBeInTheDocument();
  });

  it("renders all 5 Etsy services", () => {
    render(<EtsyServicesPage />);
    expect(screen.getByText("Shop Setup & Configuration")).toBeInTheDocument();
    expect(screen.getByText("SEO & Search Optimization")).toBeInTheDocument();
    expect(screen.getByText("Etsy Marketing & Promotion")).toBeInTheDocument();
    expect(screen.getByText("Listing Optimization")).toBeInTheDocument();
    expect(screen.getByText("Shop Management & Growth")).toBeInTheDocument();
  });

  it("renders 5 service cards with icons", () => {
    render(<EtsyServicesPage />);
    const serviceIcons = screen.getAllByTestId("service-icon");
    expect(serviceIcons).toHaveLength(5);
  });

  it("renders CTA links in hero section pointing to contact", () => {
    render(<EtsyServicesPage />);
    const consultationLinks = screen.getAllByRole("link", {
      name: /book free consultation/i,
    });
    expect(consultationLinks.length).toBeGreaterThan(0);
    expect(consultationLinks[0]).toHaveAttribute("href", "/contact");
  });

  it("renders CTA links in hero section pointing to pricing", () => {
    render(<EtsyServicesPage />);
    const pricingLinks = screen.getAllByRole("link", {
      name: /view pricing/i,
    });
    expect(pricingLinks.length).toBeGreaterThan(0);
    expect(pricingLinks[0]).toHaveAttribute("href", "/pricing");
  });

  it("renders bottom CTA section", () => {
    render(<EtsyServicesPage />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /ready to grow your etsy shop/i,
      })
    ).toBeInTheDocument();
  });

  it("renders services list section headline", () => {
    render(<EtsyServicesPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: /our etsy services/i })
    ).toBeInTheDocument();
  });

  it("applies Etsy platform styling via ServiceHero", () => {
    const { container } = render(<EtsyServicesPage />);
    // Etsy platform uses accent color gradient (from-accent/10)
    const heroSection = container.querySelector("section");
    expect(heroSection).toHaveClass("from-accent/10");
  });
});
