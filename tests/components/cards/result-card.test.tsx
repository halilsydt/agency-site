import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResultCard } from "@/components/cards/result-card";

const defaultProps = {
  imageSrc: "/images/results/amazon-year.png",
  imageAlt: "Test dashboard screenshot",
  metric: "Full year sales growth",
  platform: "amazon" as const,
};

describe("ResultCard", () => {
  it("renders the image with correct alt text", () => {
    render(<ResultCard {...defaultProps} />);
    expect(
      screen.getByRole("img", { name: "Test dashboard screenshot" })
    ).toBeInTheDocument();
  });

  it("renders the metric", () => {
    render(<ResultCard {...defaultProps} />);
    expect(screen.getByText(/Full year sales growth/i)).toBeInTheDocument();
  });

  it("renders the platform badge", () => {
    render(<ResultCard {...defaultProps} />);
    // Platform badge should be capitalized "amazon"
    expect(screen.getByText("amazon")).toBeInTheDocument();
  });

  it("renders the provided metric text", () => {
    render(<ResultCard {...defaultProps} metric="3x growth" />);
    expect(screen.getByText("3x growth")).toBeInTheDocument();
  });

  it("renders etsy platform badge correctly", () => {
    render(<ResultCard {...defaultProps} platform="etsy" />);
    expect(screen.getByText("etsy")).toBeInTheDocument();
  });
});
