import { Reveal } from "@/components/ui/reveal";
import { ServiceCard } from "@/components/cards/service-card";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/types";

/**
 * Props for the ServiceListSection component.
 */
export interface ServiceListSectionProps {
  /** Eyebrow label above the headline (Atlas `.eyebrow` / `.eyebrow.clay`). */
  eyebrow: string;
  /** Section headline (Atlas `.sec-head h2`). */
  headline: string;
  /** Optional supporting paragraph. */
  subheadline?: string;
  /** Array of services to display as `.sd` cards. */
  services: Service[];
  /** Platform accent — green for Amazon, clay for Etsy. */
  platform: "amazon" | "etsy";
  /**
   * Optional `service.id` to render as the full-width Atlas `.sd.wide` card
   * (spans the grid, 2-column bullets). Amazon passes "troubleshooting"; Etsy
   * passes nothing.
   */
  wideServiceId?: string;
}

/**
 * Atlas service-detail section (`svc-detail`, atlas.css:183–199). A left-aligned
 * section head (eyebrow + headline + supporting copy) over a two-column grid of
 * {@link ServiceCard} `.sd` cards that collapses to one column below 820px. The
 * platform drives the accent color, and {@link ServiceListSectionProps.wideServiceId}
 * opts one card into the full-width `.sd.wide` treatment.
 *
 * @param props - {@link ServiceListSectionProps}
 */
export function ServiceListSection({
  eyebrow,
  headline,
  subheadline,
  services,
  platform,
  wideServiceId,
}: ServiceListSectionProps): React.ReactElement {
  return (
    <section className="pt-10 pb-[92px]">
      <div className="wrap">
        {/* Section head */}
        <Reveal className="mb-12 max-w-[680px]">
          <span className={cn("eyebrow", platform === "etsy" && "clay")}>
            {eyebrow}
          </span>
          <h2 className="mt-5 font-disp text-[clamp(34px,4.4vw,52px)] font-bold leading-[1.02] tracking-[-.03em]">
            {headline}
          </h2>
          {subheadline && (
            <p className="mt-[18px] text-[18px] text-soft">{subheadline}</p>
          )}
        </Reveal>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-6 min-[821px]:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              delay={index % 2 === 1 ? 1 : undefined}
              wide={service.id === wideServiceId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
