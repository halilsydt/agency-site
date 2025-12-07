import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmailSignupForm } from "@/components/forms/email-signup-form";

// Mock ConvertKit API
vi.mock("@/lib/api/convertkit", () => ({
  subscribeToNewsletter: vi.fn(),
}));

import { subscribeToNewsletter } from "@/lib/api/convertkit";

describe("EmailSignupForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders email input and submit button", () => {
    render(<EmailSignupForm />);

    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("prevents submission for invalid email", async () => {
    const user = userEvent.setup();
    render(<EmailSignupForm />);

    await user.type(screen.getByPlaceholderText(/enter your email/i), "notanemail");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    // Form validation should prevent submission
    await waitFor(() => {
      expect(subscribeToNewsletter).not.toHaveBeenCalled();
    });
  });

  it("prevents submission for empty email", async () => {
    const user = userEvent.setup();
    render(<EmailSignupForm />);

    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    // Form validation should prevent submission
    await waitFor(() => {
      expect(subscribeToNewsletter).not.toHaveBeenCalled();
    });
  });

  it("displays success message after subscription", async () => {
    vi.mocked(subscribeToNewsletter).mockResolvedValue({ ok: true });

    const user = userEvent.setup();
    render(<EmailSignupForm />);

    await user.type(screen.getByPlaceholderText(/enter your email/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/thanks for subscribing/i)).toBeInTheDocument();
    });
  });

  it("displays error message on failure", async () => {
    vi.mocked(subscribeToNewsletter).mockResolvedValue({
      ok: false,
      error: "Subscription failed. Please try again.",
    });

    const user = userEvent.setup();
    render(<EmailSignupForm />);

    await user.type(screen.getByPlaceholderText(/enter your email/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/subscription failed/i)).toBeInTheDocument();
    });
  });

  it("button is disabled during submission", async () => {
    vi.mocked(subscribeToNewsletter).mockImplementation(
      () => new Promise(() => {})
    );

    const user = userEvent.setup();
    render(<EmailSignupForm />);

    await user.type(screen.getByPlaceholderText(/enter your email/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveTextContent(/subscribing/i);
  });

  it("compact mode renders inline layout", () => {
    render(<EmailSignupForm compact />);

    // In compact mode, input and button should be in a flex container
    const form = screen.getByPlaceholderText(/enter your email/i).closest("form");
    expect(form?.querySelector(".flex.gap-2")).toBeInTheDocument();
  });

  it("displays consent text", () => {
    render(<EmailSignupForm />);

    expect(screen.getByText(/we respect your privacy/i)).toBeInTheDocument();
  });
});
