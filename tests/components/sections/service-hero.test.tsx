import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceHero } from "@/components/sections/service-hero";

const defaultProps = {
  headline: "Amazon Services",
  subheadline: "Expert consulting for Amazon sellers",
  platform: "amazon" as const,
};

describe("ServiceHero", () => {
  it("renders headline as h1", () => {
    render(<ServiceHero {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Amazon Services"
    );
  });

  it("renders subheadline", () => {
    render(<ServiceHero {...defaultProps} />);
    expect(screen.getByText(/Expert consulting/)).toBeInTheDocument();
  });

  it("renders CTA buttons with correct hrefs", () => {
    render(<ServiceHero {...defaultProps} />);
    expect(
      screen.getByRole("link", { name: /book.*consultation/i })
    ).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /view pricing/i })).toHaveAttribute(
      "href",
      "/pricing"
    );
  });

  it("renders illustration placeholder", () => {
    render(<ServiceHero {...defaultProps} />);
    expect(
      screen.getByTestId("service-hero-illustration")
    ).toBeInTheDocument();
  });

  it("renders placeholder text when no imageUrl provided", () => {
    render(<ServiceHero {...defaultProps} />);
    expect(screen.getByText("Illustration Placeholder")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    render(
      <ServiceHero
        {...defaultProps}
        imageUrl="/test-image.png"
        imageAlt="Test alt"
      />
    );
    const img = screen.getByRole("img", { name: "Test alt" });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("test-image.png");
  });

  it("applies platform-specific styling for amazon", () => {
    const { container } = render(<ServiceHero {...defaultProps} />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("from-primary");
  });

  it("applies platform-specific styling for etsy", () => {
    const { container } = render(
      <ServiceHero {...defaultProps} platform="etsy" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("from-accent");
  });
});
