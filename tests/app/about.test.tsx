import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutPage from "@/app/about/page";

describe("About Page", () => {
  it("renders the about hero with headline", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /about/i
    );
  });

  it("renders mission section", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { name: /mission/i })
    ).toBeInTheDocument();
  });

  it("renders approach section", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { name: /approach/i })
    ).toBeInTheDocument();
  });

  it("renders experience highlights", () => {
    render(<AboutPage />);
    expect(screen.getByText(/years experience/i)).toBeInTheDocument();
    expect(screen.getByText(/clients helped/i)).toBeInTheDocument();
  });

  it("renders team section", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { name: /founder/i })
    ).toBeInTheDocument();
  });

  it("renders CTA linking to contact", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("link", { name: /consultation/i })
    ).toHaveAttribute("href", "/contact");
  });

  it("renders main element", () => {
    render(<AboutPage />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
