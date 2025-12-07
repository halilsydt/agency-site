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
    render(<StepCard {...defaultProps} icon="📅" />);
    expect(screen.getByText("📅")).toBeInTheDocument();
  });

  it("does not render icon when not provided", () => {
    render(<StepCard {...defaultProps} />);
    expect(screen.queryByText("📅")).not.toBeInTheDocument();
  });

  it("renders title as h3 heading", () => {
    render(<StepCard {...defaultProps} />);
    expect(
      screen.getByRole("heading", { level: 3 })
    ).toHaveTextContent("Book Consultation");
  });
});
