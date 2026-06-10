import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollProgress } from "@/components/layout/scroll-progress";

describe("ScrollProgress", () => {
  it("renders a fixed progressbar element", () => {
    render(<ScrollProgress />);
    const bar = screen.getByTestId("scroll-progress");
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveClass("fixed", "left-0", "top-0");
  });

  it("exposes progressbar role and aria values", () => {
    render(<ScrollProgress />);
    const bar = screen.getByRole("progressbar", { name: /page scroll progress/i });
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuenow");
  });

  it("renders the green→clay gradient styling", () => {
    render(<ScrollProgress />);
    const bar = screen.getByTestId("scroll-progress");
    expect(bar).toHaveClass("bg-gradient-to-r", "from-green", "to-clay");
  });
});
