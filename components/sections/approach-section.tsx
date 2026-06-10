import { Reveal } from "@/components/ui/reveal";

/**
 * Props for the ApproachSection component.
 */
export interface ApproachSectionProps {
  /** Clay eyebrow above the headline (Atlas `.eyebrow.clay`). */
  eyebrow: string;
  /** Section headline (Atlas `h2`). */
  headline: string;
  /** Introductory description text. */
  description: string;
  /** List of approach points. */
  points: string[];
  /** Glass-pill label inside the `.ph-img` photo placeholder. */
  photoLabel: string;
}

/** Decorative image-frame glyph for the `.ph-img` glass pill (Atlas `.pl svg`). */
function FrameIcon(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="size-[14px]"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

/** Green check glyph for each `.about-points` item (Atlas `li svg`). */
function CheckIcon(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      className="mt-[2px] size-5 flex-none text-green"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/**
 * Atlas Approach row (`.about-grid`, About.html:51–69) on `bg-bg-2`. The
 * alternated counterpart to the Mission row: a left `.ph-img` ink-gradient
 * photo placeholder (with a glassy glass-pill label) and a right text column
 * (clay eyebrow + h2 + lead + a green-check `.about-points` list).
 *
 * @param props - {@link ApproachSectionProps}
 */
export function ApproachSection({
  eyebrow,
  headline,
  description,
  points,
  photoLabel,
}: ApproachSectionProps): React.ReactElement {
  return (
    <section className="bg-bg-2">
      <div className="wrap grid grid-cols-1 items-center gap-[60px] min-[821px]:grid-cols-2">
        <Reveal
          pop
          className="relative flex min-h-[340px] items-end overflow-hidden rounded-[22px] bg-[linear-gradient(140deg,var(--ink),#2f4339)] p-6"
        >
          <span className="inline-flex items-center gap-[7px] rounded-full border border-white/[.22] bg-white/[.13] px-3 py-1.5 pl-[9px] text-[11.5px] font-medium text-white/[.82] backdrop-blur-[3px]">
            <FrameIcon />
            {photoLabel}
          </span>
        </Reveal>

        <Reveal delay={1}>
          <span className="eyebrow clay">{eyebrow}</span>
          <h2 className="mt-4 font-disp text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.05] tracking-[-.025em]">
            {headline}
          </h2>
          <p className="mt-4 text-[17px] text-soft">{description}</p>
          <ul className="mt-[26px] flex list-none flex-col gap-[14px]">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-[16px] font-medium"
              >
                <CheckIcon />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
