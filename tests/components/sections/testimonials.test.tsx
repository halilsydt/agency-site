import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestimonialsSection } from "@/components/sections/testimonials";

describe("TestimonialsSection", () => {
  it("renders the section headline", () => {
    render(<TestimonialsSection headline="What Our Clients Say" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "What Our Clients Say"
    );
  });

  it("renders all testimonial cards", () => {
    render(<TestimonialsSection headline="What Our Clients Say" />);
    expect(
      screen.getByText(/transformed our Amazon business/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/optimize our Etsy shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Amazon PPC saved us/i)).toBeInTheDocument();
    expect(screen.getByText(/ranking in search results/i)).toBeInTheDocument();
  });

  it("renders client names", () => {
    render(<TestimonialsSection headline="What Our Clients Say" />);
    expect(screen.getByText(/Sarah M\./i)).toBeInTheDocument();
    expect(screen.getByText(/Michael R\./i)).toBeInTheDocument();
    expect(screen.getByText(/Jennifer L\./i)).toBeInTheDocument();
    expect(screen.getByText(/David K\./i)).toBeInTheDocument();
  });

  it("renders optional subheadline when provided", () => {
    render(
      <TestimonialsSection
        headline="What Our Clients Say"
        subheadline="Real feedback from real sellers"
      />
    );
    expect(
      screen.getByText(/Real feedback from real sellers/i)
    ).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    render(<TestimonialsSection headline="What Our Clients Say" />);
    expect(
      screen.queryByText(/Real feedback from real sellers/i)
    ).not.toBeInTheDocument();
  });

  it("renders platform badges for all testimonials", () => {
    render(<TestimonialsSection headline="What Our Clients Say" />);
    // There are 2 Amazon badges and 2 Etsy badges
    const amazonBadges = screen.getAllByText("amazon");
    const etsyBadges = screen.getAllByText("etsy");
    expect(amazonBadges.length).toBe(2);
    expect(etsyBadges.length).toBe(2);
  });

  it("renders custom testimonials when provided", () => {
    const customTestimonials = [
      {
        id: "custom-1",
        quote: "Custom testimonial quote.",
        clientName: "Custom Name",
        businessType: "Custom Business",
        platform: "etsy" as const,
      },
    ];
    render(
      <TestimonialsSection
        headline="Custom Headline"
        testimonials={customTestimonials}
      />
    );
    expect(screen.getByText(/Custom testimonial quote/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Business/i)).toBeInTheDocument();
  });
});
