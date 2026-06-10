"use client";

import { Reveal } from "@/components/ui/reveal";
import { useCountUp } from "@/hooks/use-count-up";
import type { ExperienceHighlight } from "@/lib/types";

/**
 * Props for the ExperienceHighlights component.
 */
export interface ExperienceHighlightsProps {
  /** Array of experience highlights to display */
  highlights: ExperienceHighlight[];
}

/** Parsed parts of a formatted stat value, ready for {@link useCountUp}. */
export interface ParsedStatValue {
  /** Numeric target the figure counts up to. */
  to: number;
  /** Leading non-numeric prefix (e.g. "$"). */
  prefix: string;
  /** Trailing non-numeric suffix (e.g. "+", "M+"). */
  suffix: string;
}

/**
 * Splits a pre-formatted stat string into the `{ to, prefix, suffix }` parts
 * `useCountUp` needs. The `ExperienceHighlight` data carries one formatted
 * string (e.g. `"$1M+"`, `"5+"`, `"2"`); this extracts the first numeric run as
 * the count target and keeps everything before it as the prefix and everything
 * after it as the suffix. Values with no digits fall back to `{ to: 0 }` with
 * the whole string as the suffix so the figure still renders unchanged.
 *
 * @param value - The formatted stat string (e.g. `"$1M+"`).
 * @returns The parsed {@link ParsedStatValue}.
 */
export function parseStatValue(value: string): ParsedStatValue {
  const match = value.match(/\d+(?:\.\d+)?/);
  if (!match || match.index === undefined) {
    return { to: 0, prefix: "", suffix: value };
  }
  return {
    to: Number(match[0]),
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + match[0].length),
  };
}

/** A single ink-band stat that counts up to its target when scrolled into view. */
function StatFigure({
  highlight,
}: {
  highlight: ExperienceHighlight;
}): React.ReactElement {
  const { to, prefix, suffix } = parseStatValue(highlight.value);
  const { ref, value } = useCountUp<HTMLDivElement>({ to, prefix, suffix });
  return (
    <div>
      <div
        ref={ref}
        className="font-disp text-[46px] font-bold leading-none tracking-[-.02em] tnum text-white"
      >
        {value}
      </div>
      <div className="mt-[10px] text-[13.5px] text-white/60">{highlight.label}</div>
    </div>
  );
}

/**
 * Atlas ink stats band (`.show` + `.stats-band`, About.html:71–83). An ink
 * showcase panel with an emerald radial-gradient overlay (mirrors the homepage
 * `results-gallery` band), holding four big white stats data-driven from the
 * `highlights` array. Each figure counts up from 0 when scrolled into view via
 * {@link useCountUp} — matching Atlas's `data-count` on these four stats
 * (About.html:76–79) and the homepage hero — and jumps straight to its final
 * value under `prefers-reduced-motion`.
 *
 * @param props - {@link ExperienceHighlightsProps}
 * @param props.highlights - Array of experience highlights to display
 */
export function ExperienceHighlights({
  highlights,
}: ExperienceHighlightsProps): React.ReactElement {
  return (
    <section className="py-[72px]">
      <div className="wrap">
        <Reveal className="relative overflow-hidden rounded-[32px] bg-ink px-14 py-12 text-white">
          {/* emerald radial overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 100% 0%,rgba(14,140,90,.42) 0%,rgba(14,140,90,.22) 28%,rgba(14,140,90,.08) 50%,rgba(21,32,27,0) 72%),radial-gradient(90% 80% at 88% -10%,rgba(111,211,164,.18) 0%,rgba(111,211,164,0) 55%)",
            }}
          />
          <div className="stats-band relative z-[1] grid grid-cols-2 gap-7 min-[821px]:grid-cols-4">
            {highlights.map((highlight) => (
              <StatFigure key={highlight.id} highlight={highlight} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
