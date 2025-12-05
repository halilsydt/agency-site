import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

/**
 * Color swatch data for display.
 */
interface ColorSwatch {
  name: string;
  value: string;
  textColor: string;
}

/**
 * Primary color palette swatches.
 */
const primaryColors: ColorSwatch[] = [
  { name: "Primary 50", value: "#eff6ff", textColor: "text-neutral-900" },
  { name: "Primary 100", value: "#dbeafe", textColor: "text-neutral-900" },
  { name: "Primary 200", value: "#bfdbfe", textColor: "text-neutral-900" },
  { name: "Primary 300", value: "#93c5fd", textColor: "text-neutral-900" },
  { name: "Primary 400", value: "#60a5fa", textColor: "text-neutral-900" },
  { name: "Primary 500", value: "#3b82f6", textColor: "text-white" },
  { name: "Primary 600", value: "#2563eb", textColor: "text-white" },
  { name: "Primary 700", value: "#1d4ed8", textColor: "text-white" },
  { name: "Primary 800", value: "#1e40af", textColor: "text-white" },
  { name: "Primary 900", value: "#1e3a8a", textColor: "text-white" },
  { name: "Primary 950", value: "#172554", textColor: "text-white" },
];

/**
 * Accent color palette swatches.
 */
const accentColors: ColorSwatch[] = [
  { name: "Accent 50", value: "#fff7ed", textColor: "text-neutral-900" },
  { name: "Accent 100", value: "#ffedd5", textColor: "text-neutral-900" },
  { name: "Accent 200", value: "#fed7aa", textColor: "text-neutral-900" },
  { name: "Accent 300", value: "#fdba74", textColor: "text-neutral-900" },
  { name: "Accent 400", value: "#fb923c", textColor: "text-neutral-900" },
  { name: "Accent 500", value: "#f97316", textColor: "text-white" },
  { name: "Accent 600", value: "#ea580c", textColor: "text-white" },
  { name: "Accent 700", value: "#c2410c", textColor: "text-white" },
  { name: "Accent 800", value: "#9a3412", textColor: "text-white" },
  { name: "Accent 900", value: "#7c2d12", textColor: "text-white" },
  { name: "Accent 950", value: "#431407", textColor: "text-white" },
];

/**
 * Neutral color palette swatches.
 */
const neutralColors: ColorSwatch[] = [
  { name: "Neutral 50", value: "#f8fafc", textColor: "text-neutral-900" },
  { name: "Neutral 100", value: "#f1f5f9", textColor: "text-neutral-900" },
  { name: "Neutral 200", value: "#e2e8f0", textColor: "text-neutral-900" },
  { name: "Neutral 300", value: "#cbd5e1", textColor: "text-neutral-900" },
  { name: "Neutral 400", value: "#94a3b8", textColor: "text-neutral-900" },
  { name: "Neutral 500", value: "#64748b", textColor: "text-white" },
  { name: "Neutral 600", value: "#475569", textColor: "text-white" },
  { name: "Neutral 700", value: "#334155", textColor: "text-white" },
  { name: "Neutral 800", value: "#1e293b", textColor: "text-white" },
  { name: "Neutral 900", value: "#0f172a", textColor: "text-white" },
  { name: "Neutral 950", value: "#020617", textColor: "text-white" },
];

/**
 * Renders a color palette section.
 */
function ColorPalette({
  title,
  colors,
}: {
  title: string;
  colors: ColorSwatch[];
}): React.ReactElement {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
        {colors.map((color) => (
          <div key={color.name} className="space-y-1">
            <div
              className={`flex h-16 items-end rounded-lg p-2 ${color.textColor}`}
              style={{ backgroundColor: color.value }}
            >
              <span className="text-xs font-medium">{color.value}</span>
            </div>
            <p className="text-xs text-neutral-600">{color.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Style Guide page for developer reference.
 * Displays the design system tokens including colors, typography, buttons, spacing, and border radius.
 * This page is intended for development reference only.
 */
export default function StyleGuidePage(): React.ReactElement {
  return (
    <main className="py-12">
      <Container>
        <div className="space-y-16">
          {/* Header */}
          <header className="space-y-4">
            <h1 className="text-4xl font-bold">Style Guide</h1>
            <p className="text-lg text-neutral-600">
              Design system reference for developers. This page documents our
              brand tokens and components.
            </p>
            <div className="rounded-lg border border-accent-300 bg-accent-50 p-4">
              <p className="text-sm text-accent-800">
                <strong>Note:</strong> This page is for development reference
                only and may be hidden in production.
              </p>
            </div>
          </header>

          {/* Colors */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold">Colors</h2>
            <ColorPalette title="Primary (Blue)" colors={primaryColors} />
            <ColorPalette title="Accent (Orange)" colors={accentColors} />
            <ColorPalette title="Neutral (Slate)" colors={neutralColors} />
          </section>

          {/* Typography */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Typography</h2>
            <p className="text-neutral-600">
              Font: <strong>Nunito</strong> (rounded sans-serif)
            </p>

            <div className="space-y-4 rounded-lg border border-neutral-200 p-6">
              <h1 className="text-5xl">Heading 1 - text-5xl</h1>
              <h2 className="text-4xl">Heading 2 - text-4xl</h2>
              <h3 className="text-3xl">Heading 3 - text-3xl</h3>
              <h4 className="text-2xl">Heading 4 - text-2xl</h4>
              <h5 className="text-xl">Heading 5 - text-xl</h5>
              <h6 className="text-lg">Heading 6 - text-lg</h6>
              <p className="text-base">Body text - text-base (16px)</p>
              <p className="text-sm">Small text - text-sm (14px)</p>
              <p className="text-xs">Extra small - text-xs (12px)</p>
            </div>
          </section>

          {/* Buttons */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Buttons</h2>

            <div className="space-y-8">
              {/* Variants */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Primary (Default)</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="accent">Accent</Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <span>+</span>
                  </Button>
                </div>
              </div>

              {/* States */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Links */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Links</h2>
            <div className="space-y-4">
              <p>
                Default link style:{" "}
                <a href="#links">This is a default link</a>
              </p>
              <p>
                Navigation link:{" "}
                <a href="#links" className="nav-link">
                  This is a nav link
                </a>
              </p>
            </div>
          </section>

          {/* Spacing */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Spacing</h2>
            <p className="text-neutral-600">
              Using Tailwind default spacing scale (4px base unit).
            </p>

            <div className="space-y-4">
              {[1, 2, 4, 6, 8, 12, 16].map((space) => (
                <div key={space} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-neutral-600">
                    space-{space}
                  </span>
                  <div
                    className="bg-primary-500"
                    style={{
                      width: `${space * 4}px`,
                      height: "24px",
                    }}
                  />
                  <span className="text-sm text-neutral-500">
                    {space * 4}px
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Border Radius */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Border Radius</h2>
            <div className="flex flex-wrap gap-6">
              <div className="space-y-2 text-center">
                <div className="h-20 w-20 rounded bg-primary-500" />
                <p className="text-sm text-neutral-600">rounded (0.5rem)</p>
              </div>
              <div className="space-y-2 text-center">
                <div className="h-20 w-20 rounded-lg bg-primary-500" />
                <p className="text-sm text-neutral-600">rounded-lg (0.75rem)</p>
              </div>
              <div className="space-y-2 text-center">
                <div className="h-20 w-20 rounded-xl bg-primary-500" />
                <p className="text-sm text-neutral-600">rounded-xl (1rem)</p>
              </div>
              <div className="space-y-2 text-center">
                <div className="h-20 w-20 rounded-2xl bg-primary-500" />
                <p className="text-sm text-neutral-600">rounded-2xl (1.5rem)</p>
              </div>
              <div className="space-y-2 text-center">
                <div className="h-20 w-20 rounded-full bg-primary-500" />
                <p className="text-sm text-neutral-600">rounded-full</p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
