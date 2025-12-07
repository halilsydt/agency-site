import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResultCard } from "@/components/cards/result-card";

const defaultProps = {
  imageSrc: "/images/results/amazon-year.png",
  imageAlt: "Test dashboard screenshot",
  caption: "Seller: Full year sales growth",
  platform: "amazon" as const,
};

describe("ResultCard", () => {
  it("renders the image with correct alt text", () => {
    render(<ResultCard {...defaultProps} />);
    expect(
      screen.getByRole("img", { name: "Test dashboard screenshot" })
    ).toBeInTheDocument();
  });

  it("renders the caption", () => {
    render(<ResultCard {...defaultProps} />);
    expect(screen.getByText(/Full year sales growth/i)).toBeInTheDocument();
  });

  it("renders the platform badge", () => {
    render(<ResultCard {...defaultProps} />);
    // Platform badge should be capitalized "amazon"
    expect(screen.getByText("amazon")).toBeInTheDocument();
  });

  it("renders optional metric when provided", () => {
    render(<ResultCard {...defaultProps} metric="3x growth" />);
    expect(screen.getByText("3x growth")).toBeInTheDocument();
  });

  it("does not render metric when not provided", () => {
    render(<ResultCard {...defaultProps} />);
    expect(screen.queryByText("3x growth")).not.toBeInTheDocument();
  });

  it("renders etsy platform badge correctly", () => {
    render(<ResultCard {...defaultProps} platform="etsy" />);
    expect(screen.getByText("etsy")).toBeInTheDocument();
  });
});
