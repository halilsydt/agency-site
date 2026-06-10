import type { HeroTitle } from "@/lib/translations";
import type { LegalSection } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";

/**
 * Props for the {@link LegalPage} component.
 */
export interface LegalPageProps {
  /** Eyebrow label above the hero headline (Atlas `.eyebrow`). */
  eyebrow: string;
  /** Atlas hero `h1` sentence with a green-emphasized `.mark` segment. */
  title: HeroTitle;
  /** Hero subheadline (lead paragraph). */
  subheadline: string;
  /** Optional green-soft `.callout` plain-language summary above the intro. */
  summary?: string;
  /** Label prefix for the `.upd` "last updated" line (e.g. "Last updated:"). */
  lastUpdatedLabel: string;
  /** ISO date string appended after the label (from the JSON content). */
  lastUpdated: string;
  /** Introduction paragraph rendered as the first `.legal p`. */
  introduction: string;
  /** Ordered legal sections (each an `h2` + paragraph `p`s). */
  sections: LegalSection[];
}

/**
 * Shared presentational component for the legal pages (Privacy Policy / Terms
 * of Service). Renders the Atlas left-aligned `.phero` interior hero (mirrors
 * {@link AboutHero} — green eyebrow, `h1` with a green `.mark`, lead paragraph,
 * radial-gradient glow `::before`) followed by the single-column Atlas `.legal`
 * typographic body (`atlas.css:366–376`): a `.upd` line, an optional green-soft
 * `.callout` summary, the introduction, and the `h2`/`p` section flow inside a
 * `max-w-[760px]` centered column. The body is wrapped in {@link Reveal} for the
 * Atlas reveal-on-scroll behavior.
 *
 * The body copy (intro, sections, lastUpdated) comes from the localized JSON
 * content loaders; the chrome (eyebrow, title, subheadline, summary,
 * lastUpdatedLabel) comes from `lib/translations.ts`.
 *
 * @param props - {@link LegalPageProps}.
 */
export function LegalPage({
  eyebrow,
  title,
  subheadline,
  summary,
  lastUpdatedLabel,
  lastUpdated,
  introduction,
  sections,
}: LegalPageProps): React.ReactElement {
  return (
    <main>
      {/* Hero — Atlas left `.phero` (mirrors AboutHero) */}
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

      {/* Body — Atlas `.legal` single-column typographic block */}
      <section className="pt-9">
        <div className="wrap">
          <Reveal className="mx-auto max-w-[760px] pt-12 pb-6">
            {/* .upd — last updated line */}
            <div className="mb-10 font-disp text-[13.5px] font-medium text-soft-2">
              {lastUpdatedLabel} {lastUpdated}
            </div>

            {/* .callout — green-soft plain-language summary */}
            {summary && (
              <div className="my-[10px] rounded-[16px] border border-[#CBE5D6] bg-green-soft px-[26px] py-[22px]">
                <p className="m-0 text-green-d">{summary}</p>
              </div>
            )}

            {/* Introduction */}
            <p className="mb-[14px] text-base text-soft">{introduction}</p>

            {/* Sections */}
            {sections.map((section, index) => (
              <div key={section.id}>
                <h2
                  className={`font-disp text-2xl font-bold tracking-[-.015em] ${
                    index === 0 ? "mt-0" : "mt-10"
                  } mb-3`}
                >
                  {section.title}
                </h2>
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-[14px] text-base text-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
