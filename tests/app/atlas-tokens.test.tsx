import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";

/**
 * Story 6.1 — Atlas Design Tokens & Typography Foundation.
 *
 * These are source-level smoke checks: rendering the full RootLayout in jsdom
 * is brittle (it owns <html>/<body> and next/font does not execute under
 * vitest), so we assert the token wiring directly in the source files. This
 * guards the foundation that later Epic 6 stories restyle against.
 */

const root = resolve(__dirname, "../..");
const layout = readFileSync(resolve(root, "app/layout.tsx"), "utf8");
const globals = readFileSync(resolve(root, "app/globals.css"), "utf8");
const tailwind = readFileSync(resolve(root, "tailwind.config.ts"), "utf8");

describe("Atlas fonts (AC 1, 2)", () => {
  it("loads Space Grotesk and Hanken Grotesk from next/font/google", () => {
    expect(layout).toContain("Space_Grotesk");
    expect(layout).toContain("Hanken_Grotesk");
  });

  it("no longer loads Nunito", () => {
    expect(layout).not.toContain("Nunito");
    expect(layout).not.toContain("--font-nunito");
  });

  it("exposes the display and sans font CSS variables", () => {
    expect(layout).toContain('variable: "--font-display"');
    expect(layout).toContain('variable: "--font-sans"');
  });

  it("applies both font variables on the body", () => {
    expect(layout).toContain("spaceGrotesk.variable");
    expect(layout).toContain("hankenGrotesk.variable");
  });

  it("wires the disp and sans families in tailwind config", () => {
    expect(tailwind).toContain("var(--font-display)");
    expect(tailwind).toContain("var(--font-sans)");
    expect(tailwind).toMatch(/disp:\s*\[/);
  });
});

describe("Atlas color tokens (AC 3, 5)", () => {
  const atlasVars = [
    "--bg",
    "--bg-2",
    "--surface",
    "--ink",
    "--ink-2",
    "--soft",
    "--soft-2",
    "--line",
    "--green",
    "--green-d",
    "--green-soft",
    "--clay",
    "--clay-soft",
  ];

  it("defines every Atlas raw color token in :root", () => {
    for (const v of atlasVars) {
      expect(globals).toContain(`${v}:`);
    }
  });

  it("uses warm paper as the body background and ink as foreground", () => {
    expect(globals).toContain("#f7f6f1");
    expect(globals).toContain("#15201b");
  });

  it("exposes Atlas color families to tailwind", () => {
    expect(tailwind).toContain("var(--green)");
    expect(tailwind).toContain("var(--clay)");
    expect(tailwind).toContain("var(--ink)");
    expect(tailwind).toContain("var(--line)");
  });
});

describe("Atlas shadows, container & radius (AC 4, 7)", () => {
  it("defines shadow tokens", () => {
    for (const v of ["--sh-sm", "--sh-md", "--sh-lg"]) {
      expect(globals).toContain(`${v}:`);
    }
  });

  it("defines the container max width token (1180px)", () => {
    expect(globals).toContain("--maxw: 1180px");
  });

  it("exposes shadows and wrap width to tailwind", () => {
    expect(tailwind).toContain("var(--sh-sm)");
    expect(tailwind).toContain("var(--sh-md)");
    expect(tailwind).toContain("var(--sh-lg)");
    expect(tailwind).toContain("var(--maxw)");
  });

  it("defines the .wrap container utility (1180px, 36px gutters)", () => {
    expect(globals).toMatch(/\.wrap\s*\{[\s\S]*max-width:\s*var\(--maxw\)/);
    expect(globals).toMatch(/\.wrap\s*\{[\s\S]*padding:\s*0 36px/);
  });

  it("defines the .disp and .tnum utilities", () => {
    expect(globals).toContain(".disp");
    expect(globals).toContain(".tnum");
    expect(globals).toContain("tabular-nums");
  });
});

describe("Atlas base typography (AC 5, 6)", () => {
  it("body uses Atlas line-height 1.6", () => {
    expect(globals).toMatch(/body\s*\{[\s\S]*line-height:\s*1\.6/);
  });

  it("headings default to the display font", () => {
    expect(globals).toMatch(/h1[\s\S]*font-disp/);
  });
});
