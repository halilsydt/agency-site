/**
 * Chart geometry helpers for the homepage results showcase, ported from the
 * Atlas vanilla `home.js` `chart()` function (home.js:29–41).
 *
 * The chart is a fixed `560×230` viewBox. Each series value maps to an `{x,y}`
 * point; from those we build the line `M/L` path and a closed area path.
 */

/** Chart viewBox dimensions + padding (Atlas constants). */
export const CHART = { W: 560, H: 230, PX: 8, PT: 18, PB: 18 } as const;

/** A computed chart point. */
export interface ChartPoint {
  /** X coordinate in viewBox space. */
  x: number;
  /** Y coordinate in viewBox space. */
  y: number;
  /** Raw series value. */
  v: number;
  /** X-axis label for this point. */
  label: string;
}

/** Computed chart geometry for a dataset. */
export interface ChartGeometry {
  /** Mapped points. */
  points: ChartPoint[];
  /** Line path (`M…L…`). */
  linePath: string;
  /** Closed area path. */
  areaPath: string;
  /** Horizontal grid-line Y positions. */
  gridY: number[];
}

/**
 * Computes the line + area geometry for a series, matching Atlas `chart()`.
 *
 * @param series - Numeric values to plot.
 * @param labels - X-axis labels (parallel to `series`).
 * @returns The points, line path, area path, and grid-line positions.
 */
export function computeChart(series: number[], labels: string[]): ChartGeometry {
  const { W, H, PX, PT, PB } = CHART;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const span = max - min || 1;
  const iH = H - PT - PB;
  const iW = W - PX * 2;

  const points: ChartPoint[] = series.map((v, i) => ({
    x: PX + (i / (series.length - 1)) * iW,
    y: PT + iH - ((v - min) / span) * iH * 0.88 - iH * 0.06,
    v,
    label: labels[i],
  }));

  const linePath = points
    .map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath =
    `M${points[0].x},${H - PB} ` +
    points.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") +
    ` L${points[points.length - 1].x},${H - PB} Z`;

  const gridY = [0.25, 0.5, 0.75].map((f) => PT + iH * f);

  return { points, linePath, areaPath, gridY };
}
