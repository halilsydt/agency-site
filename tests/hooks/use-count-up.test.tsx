import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useCountUp } from "@/hooks/use-count-up";
import { useReveal } from "@/hooks/use-reveal";

function CountUpProbe() {
  const { ref, value } = useCountUp<HTMLSpanElement>({ to: 100, suffix: "+" });
  return <span ref={ref}>{value}</span>;
}

function RevealProbe() {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-testid="reveal" className={inView ? "in" : ""}>
      reveal content
    </div>
  );
}

describe("useCountUp", () => {
  it("reaches the final value (IntersectionObserver stub fires immediately)", async () => {
    render(<CountUpProbe />);
    await waitFor(
      () => {
        expect(screen.getByText("100+")).toBeInTheDocument();
      },
      { timeout: 2500 }
    );
  });
});

describe("useReveal", () => {
  it("adds the in class once the element is observed as intersecting", () => {
    render(<RevealProbe />);
    expect(screen.getByTestId("reveal")).toHaveClass("in");
  });
});
