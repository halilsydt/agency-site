import { Container } from "@/components/layout/container";
import { ResultCard } from "@/components/cards/result-card";

/**
 * A single result proof item showing client success.
 */
export interface ResultProof {
  /** Unique identifier */
  id: string;
  /** Path to the screenshot image */
  imageSrc: string;
  /** Alt text for the image (accessibility) */
  imageAlt: string;
  /** Brief caption describing the result */
  caption: string;
  /** Platform where result was achieved */
  platform: "amazon" | "etsy";
  /** Key metric or highlight (optional, for emphasis) */
  metric?: string;
}

/**
 * Props for the ResultsGallery component.
 */
export interface ResultsGalleryProps {
  /** Section headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
  /** Array of result proofs to display (defaults to 4 real client results) */
  results?: ResultProof[];
}

/**
 * Default results showcasing real client success stories.
 */
const defaultResults: ResultProof[] = [
  {
    id: "result-1",
    imageSrc: "/images/results/amazon-year.png",
    imageAlt: "Amazon seller dashboard showing yearly sales performance",
    caption: "Amazon seller: Full year sales growth",
    platform: "amazon",
    metric: "2025 Annual Results",
  },
  {
    id: "result-2",
    imageSrc: "/images/results/etsy-alltime.png",
    imageAlt: "Etsy shop analytics showing all-time sales from 2020 to 2025",
    caption: "Etsy shop: 5 years of consistent growth",
    platform: "etsy",
    metric: "2020-2025 Growth",
  },
  {
    id: "result-3",
    imageSrc: "/images/results/etsy-year.png",
    imageAlt: "Etsy shop dashboard showing yearly sales performance",
    caption: "Etsy shop: Strong yearly performance",
    platform: "etsy",
    metric: "2025 Annual Results",
  },
  {
    id: "result-4",
    imageSrc: "/images/results/etsy-new.png",
    imageAlt: "New Etsy shop growth from May showing rapid sales increase",
    caption: "New Etsy shop: Rapid growth since launch",
    platform: "etsy",
    metric: "May-Dec 2025 Growth",
  },
];

/**
 * Homepage "Results/Proof" section displaying anonymized client success stories.
 * Features a 2x2 grid of result cards with dashboard screenshots, captions,
 * and platform indicators to build trust with potential clients.
 * Responsive layout: 1 column mobile, 2 columns tablet and desktop.
 *
 * @param props - Component props
 * @param props.headline - Section headline displayed as h2
 * @param props.subheadline - Optional supporting text below headline
 * @param props.results - Array of result proofs to display. Defaults to 4 real client results.
 *
 * @example
 * ```tsx
 * <ResultsGallery
 *   headline="Real Results from Real Clients"
 *   subheadline="See what we've achieved for sellers like you"
 * />
 * ```
 */
export function ResultsGallery({
  headline,
  subheadline,
  results = defaultResults,
}: ResultsGalleryProps): React.ReactElement {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {headline}
          </h2>
          {subheadline && (
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {subheadline}
            </p>
          )}
        </div>

        {/* Results Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {results.map((result) => (
            <ResultCard
              key={result.id}
              imageSrc={result.imageSrc}
              imageAlt={result.imageAlt}
              caption={result.caption}
              platform={result.platform}
              metric={result.metric}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
