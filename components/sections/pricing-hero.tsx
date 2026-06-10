import { Reveal } from "@/components/ui/reveal";
import type { HeroTitle } from "@/lib/translations";

/**
 * Props for the PricingHero component.
 */
export interface PricingHeroProps {
  /** Eyebrow label above the headline (Atlas `.eyebrow.cc`). */
  eyebrow: string;
  /** Atlas hero `h1` sentence, with a green `.mark` segment. */
  title: HeroTitle;
  /** Supporting subheadline text. */
  subheadline: string;
}

/**
 * Atlas centered pricing hero (`.phero.cc`, atlas.css:148–156). A centered,
 * text-only column inside the `.wrap` container: a centered eyebrow, an `h1`
 * whose `.mark` phrase is green, and a lead paragraph. The bottom padding is
 * reduced because the platform toggle follows immediately.
 *
 * @param props - {@link PricingHeroProps}
 * @param props.eyebrow - Eyebrow label rendered above the headline
 * @param props.title - The `h1` sentence split around the green `.mark` word
 * @param props.subheadline - Supporting text below the headline
 *
 * @example
 * ```tsx
 * <PricingHero
 *   eyebrow="Pricing"
 *   title={{ pre: "Simple, ", mark: "transparent", post: " pricing." }}
 *   subheadline="No hidden fees…"
 * />
 * ```
 */
export function PricingHero({
  eyebrow,
  title,
  subheadline,
}: PricingHeroProps): React.ReactElement {
  return (
    <section className="pt-[76px] pb-[30px]">
      <div className="wrap">
        <Reveal className="text-center">
          <span className="eyebrow cc">{eyebrow}</span>
          <h1 className="mt-[18px] font-disp text-[clamp(40px,5.4vw,68px)] font-bold leading-[.99] tracking-[-.035em]">
            {title.pre}
            <span className="text-green">{title.mark}</span>
            {title.post}
          </h1>
          <p className="mx-auto mt-[22px] max-w-[42em] text-[19px] text-soft">
            {subheadline}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
