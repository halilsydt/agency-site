import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StepCard } from "@/components/cards/step-card";

const defaultProps = {
  stepNumber: 1,
  title: "Book Consultation",
  description: "Schedule a free discovery call.",
};

describe("StepCard", () => {
  it("renders the step number", () => {
    render(<StepCard {...defaultProps} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders the step title", () => {
    render(<StepCard {...defaultProps} />);
    expect(screen.getByText("Book Consultation")).toBeInTheDocument();
  });

  it("renders the step description", () => {
    render(<StepCard {...defaultProps} />);
    expect(screen.getByText(/free discovery call/i)).toBeInTheDocument();
  });

  it("renders optional icon when provided", () => {
    const { container } = render(
      <StepCard {...defaultProps} icon="calendar-check" />
    );
    // Icon now renders as a Lucide SVG (aria-hidden) rather than an emoji
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("does not render icon when not provided", () => {
    const { container } = render(<StepCard {...defaultProps} />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("renders title as h3 heading", () => {
    render(<StepCard {...defaultProps} />);
    expect(
      screen.getByRole("heading", { level: 3 })
    ).toHaveTextContent("Book Consultation");
  });
});
