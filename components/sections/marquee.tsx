"use client";

/**
 * Props for the {@link Marquee} component.
 */
export interface MarqueeProps {
  /** Service-name items to scroll. Rendered twice for a seamless loop. */
  items: string[];
}

/**
 * Atlas infinite horizontal marquee strip (atlas.css:123–129). A masked,
 * bordered band whose inline-flex track scrolls left forever (`animate-marquee`
 * → `scrollx` keyframe), pausing on hover. The item list is duplicated once so
 * the `translateX(-50%)` loop is seamless.
 *
 * Each item shows a small green dot. Under `prefers-reduced-motion` the scroll
 * animation is disabled (static row) via the reduced-motion guard in
 * `globals.css`.
 *
 * @param props - {@link MarqueeProps}
 */
export function Marquee({ items }: MarqueeProps): React.ReactElement {
  // Duplicate the list once so the -50% translate lands on an identical frame.
  const loop = [...items, ...items];

  return (
    <div
      className="marquee group mt-10 overflow-hidden whitespace-nowrap border-y border-line bg-surface py-[22px] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      aria-label="Services"
    >
      <div className="marquee-track inline-flex items-center animate-marquee group-hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="marquee-item inline-flex items-center gap-[13px] px-[30px] font-disp text-[17px] font-semibold text-ink-2"
            aria-hidden={i >= items.length ? true : undefined}
          >
            <span className="size-[6px] rounded-full bg-green" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
