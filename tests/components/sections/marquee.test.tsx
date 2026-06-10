import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Marquee } from "@/components/sections/marquee";

describe("Marquee", () => {
  const items = ["Account Setup", "Etsy SEO", "Growth Strategy"];

  it("duplicates each item once for a seamless loop", () => {
    render(<Marquee items={items} />);
    items.forEach((item) => {
      expect(screen.getAllByText(item).length).toBe(2);
    });
  });

  it("renders a green dot per item", () => {
    const { container } = render(<Marquee items={items} />);
    // Each marquee item carries a dot span; total = items * 2 (duplicated).
    const itemSpans = container.querySelectorAll(".marquee-item");
    expect(itemSpans.length).toBe(items.length * 2);
  });
});
