"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";
import { CHART, computeChart, type ChartPoint } from "@/lib/results-chart";
import { cn } from "@/lib/utils";

/**
 * Props for the ResultsGallery (Atlas results showcase) component.
 */
export interface ResultsGalleryProps {
  /** Section headline text (overrides the i18n showcase headline if provided). */
  headline: string;
  /** Optional subheadline text (unused in the Atlas showcase; kept for API parity). */
  subheadline?: string;
}

/**
 * Homepage Atlas "results showcase" (atlas.css:201–226, home.js:12–62). An ink
 * panel with an emerald radial overlay containing a tabbed set of client
 * datasets. Selecting a tab swaps the left info column (period, title,
 * description, three stats) and re-draws the right SVG line+area chart.
 *
 * The chart line animates its `stroke-dashoffset` on each switch; an
 * interactive hover dot + tooltip snaps to the nearest data point on
 * mouse/touch move. Under `prefers-reduced-motion` the line is shown drawn
 * immediately and tab switching still works.
 *
 * Replaces the former 4-card `ResultCard` grid. All human-readable copy is
 * routed through i18n; numeric series live in the translations data.
 *
 * @param props - {@link ResultsGalleryProps}
 */
export function ResultsGallery({
  headline,
}: ResultsGalleryProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);
  const reducedMotion = useReducedMotion();

  const { eyebrow, headline: showcaseHeadline, datasets } = t.homeShowcase;
  const [active, setActive] = useState(0);
  const [drawn, setDrawn] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  const dataset = datasets[active];
  const { points, linePath, areaPath, gridY } = computeChart(
    dataset.series,
    dataset.labels
  );

  // Trigger the draw-on-switch animation: reset to undrawn, then (next frame)
  // set drawn so the dashoffset transition runs. Reduced-motion shows it drawn.
  useEffect(() => {
    if (reducedMotion) {
      setDrawn(true);
      return;
    }
    setDrawn(false);
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setDrawn(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [active, reducedMotion]);

  /** Snap the hover dot + tooltip to the nearest data point. */
  function handleMove(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): void {
    const box = boxRef.current;
    const dot = dotRef.current;
    const tip = tipRef.current;
    if (!box || !dot || !tip) return;

    const rect = box.getBoundingClientRect();
    if (rect.width === 0) return; // jsdom / hidden box — bail safely

    const clientX =
      "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
    const cx = ((clientX - rect.left) / rect.width) * CHART.W;

    let nearest: ChartPoint = points[0];
    for (const p of points) {
      if (Math.abs(p.x - cx) < Math.abs(nearest.x - cx)) nearest = p;
    }

    const lx = (nearest.x / CHART.W) * 100;
    const ly = (nearest.y / CHART.H) * 100;
    dot.style.left = `${lx}%`;
    dot.style.top = `${ly}%`;
    dot.style.opacity = "1";
    tip.style.left = `${lx}%`;
    tip.style.top = `${ly}%`;
    tip.style.opacity = "1";
    tip.textContent = `${nearest.label} · ${dataset.prefix}${nearest.v}${dataset.suffix}`;
  }

  /** Hide the hover dot + tooltip. */
  function handleLeave(): void {
    if (dotRef.current) dotRef.current.style.opacity = "0";
    if (tipRef.current) tipRef.current.style.opacity = "0";
  }

  return (
    <section className="py-[92px]">
      <div className="wrap">
        <Reveal
          as="div"
          className="relative overflow-hidden rounded-[32px] bg-ink p-14 text-white max-[820px]:p-[34px]"
        >
          {/* emerald radial overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 100% 0%,rgba(14,140,90,.42) 0%,rgba(14,140,90,.22) 28%,rgba(14,140,90,.08) 50%,rgba(21,32,27,0) 72%),radial-gradient(90% 80% at 88% -10%,rgba(111,211,164,.18) 0%,rgba(111,211,164,0) 55%)",
            }}
          />

          {/* head + tabs */}
          <div className="relative mb-9 flex flex-wrap items-end justify-between gap-[30px]">
            <div>
              <span className="inline-flex items-center gap-[9px] font-disp text-[12.5px] font-semibold uppercase tracking-[.16em] text-[#6FD3A4] before:h-[2px] before:w-6 before:rounded-[2px] before:bg-[#6FD3A4] before:content-['']">
                {eyebrow}
              </span>
              <h2 className="mt-[18px] font-disp text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.04] tracking-[-.025em]">
                {headline || showcaseHeadline}
              </h2>
            </div>
            <div role="tablist" aria-label={showcaseHeadline} className="relative flex flex-wrap gap-[10px]">
              {datasets.map((d, i) => (
                <button
                  key={d.tab}
                  type="button"
                  role="tab"
                  id={`results-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="results-panel"
                  onClick={() => setActive(i)}
                  className={cn(
                    "cursor-pointer whitespace-nowrap rounded-[11px] border px-[17px] py-[11px] font-disp text-[14px] font-semibold transition-all duration-200",
                    i === active
                      ? "border-green bg-green text-white"
                      : "border-white/[.14] bg-white/[.06] text-white/70 hover:bg-white/[.12]"
                  )}
                >
                  {d.tab}
                </button>
              ))}
            </div>
          </div>

          {/* body */}
          <div
            id="results-panel"
            role="tabpanel"
            aria-labelledby={`results-tab-${active}`}
            className="relative grid grid-cols-1 items-center gap-11 min-[821px]:grid-cols-[1fr_1.3fr]"
          >
            {/* info */}
            <div>
              <div className="font-disp text-[12.5px] font-semibold uppercase tracking-[.14em] text-[#6FD3A4]">
                {dataset.per}
              </div>
              <h3 className="mb-3 mt-3 font-disp text-[28px] font-bold leading-[1.1] tracking-[-.02em]">
                {dataset.title}
              </h3>
              <p className="max-w-[30em] text-[15.5px] text-white/[.66]">{dataset.desc}</p>
              <div className="mt-[30px] flex gap-[30px]">
                {dataset.stats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      className={cn(
                        "font-disp text-[30px] font-bold leading-none tnum",
                        stat.highlight && "text-[#6FD3A4]"
                      )}
                    >
                      {stat.value}
                    </div>
                    <div className="mt-[6px] text-[12px] text-white/55">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* chart */}
            <div className="rounded-[18px] border border-white/[.12] bg-white/[.04] p-[22px]">
              <div
                ref={boxRef}
                className="relative h-[230px]"
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                onTouchMove={handleMove}
              >
                <svg
                  viewBox={`0 0 ${CHART.W} ${CHART.H}`}
                  preserveAspectRatio="none"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#6FD3A4" stopOpacity=".3" />
                      <stop offset="1" stopColor="#6FD3A4" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {gridY.map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y.toFixed(1)}
                      x2={CHART.W}
                      y2={y.toFixed(1)}
                      stroke="rgba(255,255,255,.08)"
                    />
                  ))}
                  <path d={areaPath} fill="url(#rg)" />
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#6FD3A4"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    vectorEffect="non-scaling-stroke"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: drawn || reducedMotion ? 0 : 1,
                      transition: reducedMotion
                        ? "none"
                        : "stroke-dashoffset 1.3s cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                </svg>
                {/* hover dot */}
                <div
                  ref={dotRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-ink bg-[#6FD3A4] opacity-0 [transition:opacity_120ms]"
                />
                {/* tooltip */}
                <div
                  ref={tipRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute z-[5] -translate-x-1/2 -translate-y-[135%] whitespace-nowrap rounded-[9px] bg-white px-[10px] py-[6px] font-disp text-[12.5px] font-semibold text-ink opacity-0 [transition:opacity_120ms]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
