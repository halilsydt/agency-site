import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BookingSection } from "@/components/sections/booking-section";

// Mock CalendarEmbed to avoid Cal.com dependencies in tests
vi.mock("@/components/forms/calendar-embed", () => ({
  CalendarEmbed: () => <div data-testid="calendar-embed">Calendar Embed</div>,
}));

describe("BookingSection", () => {
  const defaultProps = {
    headline: "Book Your Free Consultation",
    subheadline: "Schedule a call with our team.",
  };

  it("renders headline as h2", () => {
    render(<BookingSection {...defaultProps} />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Book Your Free Consultation");
  });

  it("renders subheadline", () => {
    render(<BookingSection {...defaultProps} />);

    expect(
      screen.getByText("Schedule a call with our team.")
    ).toBeInTheDocument();
  });

  it("renders CalendarEmbed component", () => {
    render(<BookingSection {...defaultProps} />);

    expect(screen.getByTestId("calendar-embed")).toBeInTheDocument();
  });

  it("renders section element", () => {
    const { container } = render(<BookingSection {...defaultProps} />);

    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
