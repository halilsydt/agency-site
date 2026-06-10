import { Reveal } from "@/components/ui/reveal";

/**
 * Mission `.viz-card` metric data (Atlas About.html:30–47).
 */
export interface MissionVizData {
  /** Card header label. */
  revenueLabel: string;
  /** Green growth pill text (includes the ▲ glyph). */
  pill: string;
  /** Big headline value (e.g. "$1M+"). */
  bigValue: string;
  /** First cell value (rendered green). */
  clientsValue: string;
  /** First cell label. */
  clientsLabel: string;
  /** Second cell value. */
  yearsValue: string;
  /** Second cell label. */
  yearsLabel: string;
  /** Third cell value. */
  platformsValue: string;
  /** Third cell label. */
  platformsLabel: string;
}

/**
 * Props for the MissionSection component.
 */
export interface MissionSectionProps {
  /** Green eyebrow above the headline (Atlas `.eyebrow`). */
  eyebrow: string;
  /** Section headline (Atlas `h2` — the "no hype" sentence). */
  headline: string;
  /** Mission body paragraph. */
  text: string;
  /** Right-column emerald metric `.viz-card` data. */
  viz: MissionVizData;
}

/**
 * Atlas Mission row (`.about-grid`, About.html:22–49). A two-column layout
 * collapsing at 820px: a left text column (eyebrow + h2 + lead) and a right
 * emerald metric `.viz-card` mirroring the homepage hero card (label + green
 * pill, a big value, a decorative emerald sparkline, and a 3-cell `.viz-grid`).
 * The card is static (`<Reveal pop>` only — no draw-on-load animation).
 *
 * @param props - {@link MissionSectionProps}
 */
export function MissionSection({
  eyebrow,
  headline,
  text,
  viz,
}: MissionSectionProps): React.ReactElement {
  return (
    <section className="pt-10">
      <div className="wrap grid grid-cols-1 items-center gap-[60px] min-[821px]:grid-cols-2">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-4 font-disp text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.05] tracking-[-.025em]">
            {headline}
          </h2>
          <p className="mt-[18px] text-[17px] text-soft">{text}</p>
        </Reveal>

        <Reveal pop delay={1}>
          <div className="rounded-[22px] border border-line bg-surface p-[26px] shadow-sh-lg">
            <div className="mb-1 flex items-start justify-between">
              <div>
                <div className="text-[13px] text-soft">{viz.revenueLabel}</div>
                <div className="mt-[6px] font-disp text-[46px] font-bold leading-none tracking-[-.02em] tnum">
                  {viz.bigValue}
                </div>
              </div>
              <span className="inline-flex items-center gap-[5px] rounded-full bg-green-soft px-[11px] py-[5px] font-disp text-[13px] font-semibold text-green-d">
                {viz.pill}
              </span>
            </div>
            <svg
              viewBox="0 0 440 120"
              preserveAspectRatio="none"
              className="mt-3 h-[110px] w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="aboutViz" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0E8C5A" stopOpacity=".28" />
                  <stop offset="1" stopColor="#0E8C5A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,104 L60,96 L120,100 L180,78 L240,82 L300,54 L360,44 L420,26 L440,16 L440,120 L0,120 Z"
                fill="url(#aboutViz)"
              />
              <path
                d="M0,104 L60,96 L120,100 L180,78 L240,82 L300,54 L360,44 L420,26 L440,16"
                fill="none"
                stroke="#0E8C5A"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-[18px] grid grid-cols-3 gap-[11px]">
              <div className="rounded-[13px] border border-line bg-bg p-[14px]">
                <div className="font-disp text-[21px] font-bold text-green">
                  {viz.clientsValue}
                </div>
                <div className="mt-[3px] text-[12px] text-soft-2">
                  {viz.clientsLabel}
                </div>
              </div>
              <div className="rounded-[13px] border border-line bg-bg p-[14px]">
                <div className="font-disp text-[21px] font-bold">
                  {viz.yearsValue}
                </div>
                <div className="mt-[3px] text-[12px] text-soft-2">
                  {viz.yearsLabel}
                </div>
              </div>
              <div className="rounded-[13px] border border-line bg-bg p-[14px]">
                <div className="font-disp text-[21px] font-bold">
                  {viz.platformsValue}
                </div>
                <div className="mt-[3px] text-[12px] text-soft-2">
                  {viz.platformsLabel}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
