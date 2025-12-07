import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestimonialCard } from "@/components/cards/testimonial-card";

const defaultProps = {
  quote: "This is a great testimonial quote.",
  clientName: "John D.",
  businessType: "Amazon Seller",
  platform: "amazon" as const,
};

describe("TestimonialCard", () => {
  it("renders the quote text", () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText(/great testimonial quote/i)).toBeInTheDocument();
  });

  it("renders the client name", () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText(/John D\./i)).toBeInTheDocument();
  });

  it("renders the business type", () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText(/Amazon Seller/i)).toBeInTheDocument();
  });

  it("renders the platform indicator", () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText("amazon")).toBeInTheDocument();
  });

  it("renders etsy platform correctly", () => {
    render(
      <TestimonialCard
        {...defaultProps}
        platform="etsy"
        businessType="Etsy Shop Owner"
      />
    );
    expect(screen.getByText("etsy")).toBeInTheDocument();
    expect(screen.getByText(/Etsy Shop Owner/i)).toBeInTheDocument();
  });

  it("uses blockquote element for accessibility", () => {
    render(<TestimonialCard {...defaultProps} />);
    const blockquote = document.querySelector("blockquote");
    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveTextContent(/great testimonial quote/i);
  });
});
