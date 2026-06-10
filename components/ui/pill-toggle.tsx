"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PillToggleOption {
  value: string;
  label: string;
  /**
   * Optional leading glyph (Atlas `.seg button svg`, 18×18). Rendered before
   * the label as decoration — it must be `aria-hidden` so the button's
   * accessible name stays the text label.
   */
  icon?: React.ReactNode;
}

interface PillToggleProps {
  options: PillToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PillToggle({
  options,
  value,
  onChange,
  className,
}: PillToggleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeButton = container.querySelector(
      `[data-value="${value}"]`
    ) as HTMLButtonElement;

    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className={cn(
        // Atlas .seg (atlas.css:260–263): surface bg, line border, 14px radius, 5px pad.
        "relative inline-flex gap-1 rounded-[14px] border border-line bg-surface p-[5px] shadow-sh-sm",
        className
      )}
    >
      {/* Sliding ink indicator (Atlas .seg button.active → bg-ink) */}
      <div
        className="absolute top-[5px] bottom-[5px] rounded-[10px] bg-ink transition-all duration-300 ease-out"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />

      {/* Option buttons */}
      {options.map((option) => (
        <button
          key={option.value}
          data-value={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            // Atlas .seg button: gap-8px between glyph + label.
            "relative z-10 flex items-center justify-center gap-2 rounded-[10px] px-[26px] py-[11px] font-disp text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-1",
            value === option.value
              ? "text-white"
              : "text-soft hover:text-ink"
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
