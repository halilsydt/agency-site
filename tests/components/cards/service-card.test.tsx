import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceCard } from "@/components/cards/service-card";
import type { Service } from "@/lib/types";

const mockService: Service = {
  id: "account-setup",
  platform: "amazon",
  title: "Account Opening & Setup",
  description:
    "Get your Amazon seller account configured correctly from day one.",
  icon: "user-plus",
  features: ["Account verification", "Initial settings", "Tax setup"],
};

describe("ServiceCard", () => {
  it("renders service title", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText("Account Opening & Setup")).toBeInTheDocument();
  });

  it("renders service description", () => {
    render(<ServiceCard service={mockService} />);
    expect(
      screen.getByText(/Amazon seller account configured/)
    ).toBeInTheDocument();
  });

  it("renders the icon tile", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByTestId("service-icon")).toBeInTheDocument();
  });

  it("renders the feature bullets", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText("Account verification")).toBeInTheDocument();
    expect(screen.getByText("Initial settings")).toBeInTheDocument();
    expect(screen.getByText("Tax setup")).toBeInTheDocument();
  });

  it("uses the Atlas .sd card surface (22px radius)", () => {
    const { container } = render(<ServiceCard service={mockService} />);
    const card = container.firstElementChild as HTMLElement;
    expect(card).toBeInTheDocument();
    expect(card.className).toContain("rounded-[22px]");
  });

  it("applies the green accent for Amazon services", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByTestId("service-icon").className).toContain(
      "bg-green-soft"
    );
  });

  it("applies the clay accent for Etsy services", () => {
    const etsyService: Service = {
      ...mockService,
      id: "shop-setup",
      platform: "etsy",
      title: "Shop Setup & Configuration",
      icon: "store",
    };
    render(<ServiceCard service={etsyService} />);
    expect(screen.getByTestId("service-icon").className).toContain(
      "bg-clay-soft"
    );
  });

  it("renders a different service correctly", () => {
    const ppcService: Service = {
      id: "ppc-advertising",
      platform: "amazon",
      title: "Amazon Advertising (PPC)",
      description:
        "Drive targeted traffic and increase sales with data-driven advertising campaigns.",
      icon: "trending-up",
      features: ["Campaign setup", "Optimization"],
    };

    render(<ServiceCard service={ppcService} />);
    expect(screen.getByText("Amazon Advertising (PPC)")).toBeInTheDocument();
    expect(screen.getByText(/data-driven advertising/)).toBeInTheDocument();
  });
});
