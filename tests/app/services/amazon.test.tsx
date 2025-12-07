import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AmazonServicesPage from "@/app/services/amazon/page";

describe("Amazon Services Page", () => {
  it("renders ServiceHero with Amazon headline", () => {
    render(<AmazonServicesPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /amazon services/i })
    ).toBeInTheDocument();
  });

  it("renders ServiceHero subheadline", () => {
    render(<AmazonServicesPage />);
    expect(
      screen.getByText(/expert consulting and management services/i)
    ).toBeInTheDocument();
  });

  it("renders all 5 Amazon services", () => {
    render(<AmazonServicesPage />);
    expect(screen.getByText("Account Opening & Setup")).toBeInTheDocument();
    expect(screen.getByText("Product Listing Optimization")).toBeInTheDocument();
    expect(screen.getByText("Amazon Advertising (PPC)")).toBeInTheDocument();
    expect(screen.getByText("Store Optimization")).toBeInTheDocument();
    expect(
      screen.getByText("Troubleshooting & Account Health")
    ).toBeInTheDocument();
  });

  it("renders 5 service cards with icons", () => {
    render(<AmazonServicesPage />);
    const serviceIcons = screen.getAllByTestId("service-icon");
    expect(serviceIcons).toHaveLength(5);
  });

  it("renders CTA links in hero section pointing to contact", () => {
    render(<AmazonServicesPage />);
    const consultationLinks = screen.getAllByRole("link", {
      name: /book free consultation/i,
    });
    expect(consultationLinks.length).toBeGreaterThan(0);
    expect(consultationLinks[0]).toHaveAttribute("href", "/contact");
  });

  it("renders CTA links in hero section pointing to pricing", () => {
    render(<AmazonServicesPage />);
    const pricingLinks = screen.getAllByRole("link", {
      name: /view pricing/i,
    });
    expect(pricingLinks.length).toBeGreaterThan(0);
    expect(pricingLinks[0]).toHaveAttribute("href", "/pricing");
  });

  it("renders bottom CTA section", () => {
    render(<AmazonServicesPage />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /ready to grow your amazon business/i,
      })
    ).toBeInTheDocument();
  });

  it("renders services list section headline", () => {
    render(<AmazonServicesPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: /our amazon services/i })
    ).toBeInTheDocument();
  });
});
