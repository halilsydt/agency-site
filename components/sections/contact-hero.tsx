import type { HeroTitle } from "@/lib/translations";

/**
 * Props for the ContactHero component.
 */
export interface ContactHeroProps {
  /** Eyebrow label above the headline (Atlas `.eyebrow`, e.g. "Contact"). */
  eyebrow: string;
  /** Atlas hero `h1` sentence, with a green-colored `.mark` segment. */
  title: HeroTitle;
  /** Supporting lead text below the headline. */
  subheadline: string;
}

/**
 * Atlas interior hero (`phero`, atlas.css:148–156) for the Contact page. A
 * left-aligned, text-only single column inside the `.wrap` container with a
 * soft radial-gradient glow `::before` (mirrors `service-hero.tsx:70`). Renders
 * a green eyebrow, an `h1` whose `.mark` phrase is green, and a lead paragraph.
 *
 * @param props - {@link ContactHeroProps}
 * @param props.eyebrow - Eyebrow label above the headline
 * @param props.title - Composed hero headline with a green `.mark` segment
 * @param props.subheadline - Supporting lead text below the headline
 *
 * @example
 * ```tsx
 * <ContactHero
 *   eyebrow="Contact"
 *   title={{ pre: "Let's talk about your ", mark: "growth", post: "." }}
 *   subheadline="Book a free consultation or send us a message."
 * />
 * ```
 */
export function ContactHero({
  eyebrow,
  title,
  subheadline,
}: ContactHeroProps): React.ReactElement {
  return (
    <section className="relative overflow-x-clip pt-[76px] pb-6 before:pointer-events-none before:absolute before:-top-[260px] before:left-1/2 before:h-[560px] before:w-[900px] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle,rgba(14,140,90,.10),rgba(194,104,60,.05)_45%,transparent_70%)] before:content-['']">
      <div className="wrap relative z-[1]">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-[18px] font-disp text-[clamp(40px,5.4vw,68px)] font-bold leading-[.99] tracking-[-.035em]">
          {title.pre}
          <span className="text-green">{title.mark}</span>
          {title.post}
        </h1>
        <p className="mt-[22px] max-w-[36em] text-[19px] text-soft">
          {subheadline}
        </p>
      </div>
    </section>
  );
}
