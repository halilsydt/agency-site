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

  it("renders icon placeholder", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByTestId("service-icon")).toBeInTheDocument();
  });

  it("applies correct styling with card structure", () => {
    const { container } = render(<ServiceCard service={mockService} />);
    const card = container.querySelector('[class*="rounded-xl"]');
    expect(card).toBeInTheDocument();
  });

  it("renders different service correctly", () => {
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
