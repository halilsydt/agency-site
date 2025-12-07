import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NewsletterSignupSection } from "@/components/sections/newsletter-signup-section";

// Mock EmailSignupForm
vi.mock("@/components/forms/email-signup-form", () => ({
  EmailSignupForm: () => (
    <div data-testid="email-signup-form">Email Signup Form</div>
  ),
}));

describe("NewsletterSignupSection", () => {
  const defaultProps = {
    headline: "Stay Updated",
    subheadline: "Get tips delivered to your inbox.",
  };

  it("renders headline as h2", () => {
    render(<NewsletterSignupSection {...defaultProps} />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Stay Updated");
  });

  it("renders subheadline", () => {
    render(<NewsletterSignupSection {...defaultProps} />);

    expect(
      screen.getByText("Get tips delivered to your inbox.")
    ).toBeInTheDocument();
  });

  it("renders EmailSignupForm", () => {
    render(<NewsletterSignupSection {...defaultProps} />);

    expect(screen.getByTestId("email-signup-form")).toBeInTheDocument();
  });
});
