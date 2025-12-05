import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container } from "@/components/layout/container";

describe("Container", () => {
  it("renders children correctly", () => {
    render(
      <Container>
        <p>Test content</p>
      </Container>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies default max-width class (xl)", () => {
    render(
      <Container>
        <p>Content</p>
      </Container>
    );
    const container = screen.getByText("Content").parentElement;
    expect(container).toHaveClass("max-w-7xl");
  });

  it("applies correct max-width for sm size", () => {
    render(
      <Container size="sm">
        <p>Small content</p>
      </Container>
    );
    const container = screen.getByText("Small content").parentElement;
    expect(container).toHaveClass("max-w-3xl");
  });

  it("applies correct max-width for md size", () => {
    render(
      <Container size="md">
        <p>Medium content</p>
      </Container>
    );
    const container = screen.getByText("Medium content").parentElement;
    expect(container).toHaveClass("max-w-5xl");
  });

  it("applies correct max-width for lg size", () => {
    render(
      <Container size="lg">
        <p>Large content</p>
      </Container>
    );
    const container = screen.getByText("Large content").parentElement;
    expect(container).toHaveClass("max-w-6xl");
  });

  it("applies correct max-width for full size", () => {
    render(
      <Container size="full">
        <p>Full width</p>
      </Container>
    );
    const container = screen.getByText("Full width").parentElement;
    expect(container).toHaveClass("max-w-full");
  });

  it("applies responsive padding classes", () => {
    render(
      <Container>
        <p>Padded content</p>
      </Container>
    );
    const container = screen.getByText("Padded content").parentElement;
    expect(container).toHaveClass("px-4");
    expect(container).toHaveClass("sm:px-6");
    expect(container).toHaveClass("lg:px-8");
  });

  it("centers content with mx-auto", () => {
    render(
      <Container>
        <p>Centered</p>
      </Container>
    );
    const container = screen.getByText("Centered").parentElement;
    expect(container).toHaveClass("mx-auto");
  });

  it("applies custom className", () => {
    render(
      <Container className="custom-class py-8">
        <p>Custom styled</p>
      </Container>
    );
    const container = screen.getByText("Custom styled").parentElement;
    expect(container).toHaveClass("custom-class");
    expect(container).toHaveClass("py-8");
  });
});
