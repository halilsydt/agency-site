import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { FAQCategoryFilter } from "@/components/sections/faq-category-filter";

describe("FAQCategoryFilter", () => {
  it("renders All button and category buttons", () => {
    render(
      <FAQCategoryFilter activeCategory="all" onCategoryChange={vi.fn()} />
    );

    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "General" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Amazon" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Etsy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pricing" })).toBeInTheDocument();
  });

  it("active category button has different styling", () => {
    render(
      <FAQCategoryFilter activeCategory="amazon" onCategoryChange={vi.fn()} />
    );

    const amazonButton = screen.getByRole("button", { name: "Amazon" });
    const allButton = screen.getByRole("button", { name: "All" });

    // Active button (default variant) has bg-primary, outline has border-primary
    expect(amazonButton.className).toContain("bg-primary");
    expect(allButton.className).toContain("border-primary");
  });

  it("calls onCategoryChange when button clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <FAQCategoryFilter activeCategory="all" onCategoryChange={handleChange} />
    );

    await user.click(screen.getByRole("button", { name: "Amazon" }));

    expect(handleChange).toHaveBeenCalledWith("amazon");
  });

  it("calls onCategoryChange with all when All button clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <FAQCategoryFilter
        activeCategory="amazon"
        onCategoryChange={handleChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "All" }));

    expect(handleChange).toHaveBeenCalledWith("all");
  });

  it("renders all 5 category options", () => {
    render(
      <FAQCategoryFilter activeCategory="all" onCategoryChange={vi.fn()} />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });
});
