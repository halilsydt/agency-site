import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { useCountUp } from "@/hooks/use-count-up";

/** Override matchMedia so the reduced-motion query reports `matches: true`. */
function mockReducedMotion(reduce: boolean): void {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? reduce : false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

function CountUpProbe() {
  const { ref, value } = useCountUp<HTMLSpanElement>({ to: 42, suffix: "+" });
  return <span ref={ref}>{value}</span>;
}

describe("reduced-motion behavior", () => {
  afterEach(() => {
    mockReducedMotion(false);
  });

  it("count-up jumps straight to the final value when reduced motion is preferred", () => {
    mockReducedMotion(true);
    render(<CountUpProbe />);
    // No animation: the final value is present synchronously on first render path.
    expect(screen.getByText("42+")).toBeInTheDocument();
  });
});
