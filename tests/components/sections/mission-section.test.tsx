import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MissionSection } from "@/components/sections/mission-section";

const defaultProps = {
  eyebrow: "Our Mission",
  headline: "We help sellers succeed through honest consulting.",
  text: "No hype, no empty promises — just real strategies that work.",
  viz: {
    revenueLabel: "Revenue generated for clients",
    pill: "▲ Growing",
    bigValue: "$1M+",
    clientsValue: "100+",
    clientsLabel: "Clients",
    yearsValue: "5+",
    yearsLabel: "Years",
    platformsValue: "2",
    platformsLabel: "Platforms",
  },
};

describe("MissionSection", () => {
  it("renders headline as h2", () => {
    render(<MissionSection {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "We help sellers succeed through honest consulting."
    );
  });

  it("renders the eyebrow", () => {
    render(<MissionSection {...defaultProps} />);
    expect(screen.getByText("Our Mission")).toBeInTheDocument();
  });

  it("renders mission text", () => {
    render(<MissionSection {...defaultProps} />);
    expect(
      screen.getByText(/No hype, no empty promises/)
    ).toBeInTheDocument();
  });

  it("renders the viz-card big value and pill", () => {
    render(<MissionSection {...defaultProps} />);
    expect(screen.getByText("$1M+")).toBeInTheDocument();
    expect(screen.getByText("▲ Growing")).toBeInTheDocument();
    expect(
      screen.getByText("Revenue generated for clients")
    ).toBeInTheDocument();
  });

  it("renders the three viz-card cells", () => {
    render(<MissionSection {...defaultProps} />);
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("Clients")).toBeInTheDocument();
    expect(screen.getByText("5+")).toBeInTheDocument();
    expect(screen.getByText("Years")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Platforms")).toBeInTheDocument();
  });

  it("renders within a section element", () => {
    const { container } = render(<MissionSection {...defaultProps} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
