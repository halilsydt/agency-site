import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceListSection } from "@/components/sections/service-list";
import type { Service } from "@/lib/types";

const mockServices: Service[] = [
  {
    id: "account-setup",
    platform: "amazon",
    title: "Account Opening & Setup",
    description: "Get your Amazon seller account configured correctly.",
    icon: "user-plus",
    features: ["Account verification"],
  },
  {
    id: "listing-optimization",
    platform: "amazon",
    title: "Product Listing Optimization",
    description: "Maximize visibility and conversions.",
    icon: "file-text",
    features: ["Keyword research"],
  },
  {
    id: "ppc-advertising",
    platform: "amazon",
    title: "Amazon Advertising (PPC)",
    description: "Drive targeted traffic with data-driven campaigns.",
    icon: "trending-up",
    features: ["Campaign setup"],
  },
];

const baseProps = {
  eyebrow: "Our Amazon services",
  headline: "Our Amazon Services",
  platform: "amazon" as const,
};

describe("ServiceListSection", () => {
  it("renders section headline", () => {
    render(<ServiceListSection {...baseProps} services={mockServices} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /our amazon services/i })
    ).toBeInTheDocument();
  });

  it("renders subheadline when provided", () => {
    render(
      <ServiceListSection
        {...baseProps}
        subheadline="Everything you need to succeed"
        services={mockServices}
      />
    );
    expect(screen.getByText(/everything you need/i)).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    render(<ServiceListSection {...baseProps} services={mockServices} />);
    expect(
      screen.queryByText(/everything you need/i)
    ).not.toBeInTheDocument();
  });

  it("renders all services in grid", () => {
    render(<ServiceListSection {...baseProps} services={mockServices} />);
    expect(screen.getByText("Account Opening & Setup")).toBeInTheDocument();
    expect(screen.getByText("Product Listing Optimization")).toBeInTheDocument();
    expect(screen.getByText("Amazon Advertising (PPC)")).toBeInTheDocument();
  });

  it("renders correct number of service cards", () => {
    render(<ServiceListSection {...baseProps} services={mockServices} />);
    const serviceIcons = screen.getAllByTestId("service-icon");
    expect(serviceIcons).toHaveLength(3);
  });

  it("renders the feature bullets for each service", () => {
    render(<ServiceListSection {...baseProps} services={mockServices} />);
    expect(screen.getByText("Account verification")).toBeInTheDocument();
    expect(screen.getByText("Keyword research")).toBeInTheDocument();
  });

  it("renders empty grid when no services provided", () => {
    render(
      <ServiceListSection {...baseProps} headline="Our Services" services={[]} />
    );
    expect(screen.queryByTestId("service-icon")).not.toBeInTheDocument();
  });
});
