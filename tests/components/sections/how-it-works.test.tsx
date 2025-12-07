import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HowItWorks } from "@/components/sections/how-it-works";

describe("HowItWorks", () => {
  it("renders the section headline", () => {
    render(<HowItWorks headline="How It Works" />);
    expect(
      screen.getByRole("heading", { level: 2 })
    ).toHaveTextContent("How It Works");
  });

  it("renders all default step cards", () => {
    render(<HowItWorks headline="How It Works" />);
    expect(screen.getByText("Book Consultation")).toBeInTheDocument();
    expect(screen.getByText("Get Custom Strategy")).toBeInTheDocument();
    expect(screen.getByText("Implement & Grow")).toBeInTheDocument();
  });

  it("renders step numbers", () => {
    render(<HowItWorks headline="How It Works" />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<HowItWorks headline="How It Works" />);
    expect(screen.getByText(/free discovery call/i)).toBeInTheDocument();
    expect(screen.getByText(/tailored action plan/i)).toBeInTheDocument();
    expect(screen.getByText(/watch your business thrive/i)).toBeInTheDocument();
  });

  it("renders subheadline when provided", () => {
    render(
      <HowItWorks
        headline="How It Works"
        subheadline="Our simple process"
      />
    );
    expect(screen.getByText("Our simple process")).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    render(<HowItWorks headline="How It Works" />);
    expect(screen.queryByText("Our simple process")).not.toBeInTheDocument();
  });

  it("renders custom steps when provided", () => {
    const customSteps = [
      { stepNumber: 1, title: "Step One", description: "First step desc" },
      { stepNumber: 2, title: "Step Two", description: "Second step desc" },
    ];
    render(<HowItWorks headline="Process" steps={customSteps} />);
    expect(screen.getByText("Step One")).toBeInTheDocument();
    expect(screen.getByText("Step Two")).toBeInTheDocument();
    expect(screen.queryByText("Book Consultation")).not.toBeInTheDocument();
  });
});
