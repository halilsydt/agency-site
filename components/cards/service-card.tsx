import {
  UserPlus,
  FileText,
  TrendingUp,
  Store,
  ShieldCheck,
  Search,
  Megaphone,
  Package,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/types";

/**
 * Props for the ServiceCard component.
 */
export interface ServiceCardProps {
  /** The service to display. */
  service: Service;
  /** Stagger step for the reveal animation (Atlas `data-d`). */
  delay?: 1 | 2 | 3;
  /**
   * Full-width treatment (Atlas `.sd.wide`): spans the whole grid row and lays
   * its feature bullets out in a 2-column grid. Used for the final Amazon card.
   */
  wide?: boolean;
}

/**
 * Icon mapping for service icons. Maps the `service.icon` string to a Lucide
 * component. Covers every icon used by the Amazon + Etsy content JSON; unknown
 * names fall back to a generic {@link Package} box.
 */
const iconMap: Record<string, LucideIcon> = {
  "user-plus": UserPlus,
  "file-text": FileText,
  "trending-up": TrendingUp,
  store: Store,
  "shield-check": ShieldCheck,
  search: Search,
  megaphone: Megaphone,
};

/** Check-mark bullet icon (Atlas `.sd li svg`). */
function CheckIcon(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      className="size-[18px] flex-none"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/**
 * A single Atlas service-detail card (`.sd`, atlas.css:183–199). Renders a
 * platform-colored icon tile, the service title, description, and a
 * check-bulleted feature list. The platform drives the accent: Amazon uses
 * green (`.sd.amz`), Etsy uses clay (`.sd.ets`). When {@link ServiceCardProps.wide}
 * is set the card spans the full grid width and lays its bullets out in two
 * columns (Atlas `.sd.wide`).
 *
 * @param props - {@link ServiceCardProps}
 */
export function ServiceCard({
  service,
  delay,
  wide = false,
}: ServiceCardProps): React.ReactElement {
  const IconComponent = iconMap[service.icon] || Package;
  const isAmazon = service.platform === "amazon";

  return (
    <Reveal
      pop
      delay={delay}
      as="div"
      className={cn(
        "rounded-[22px] border border-line bg-surface p-[34px] transition-all duration-300 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-[5px] hover:border-transparent hover:shadow-sh-md",
        wide && "min-[821px]:col-span-2"
      )}
    >
      {/* Icon tile */}
      <div
        data-testid="service-icon"
        className={cn(
          "mb-[22px] flex size-[52px] items-center justify-center rounded-[15px]",
          isAmazon ? "bg-green-soft text-green-d" : "bg-clay-soft text-clay"
        )}
      >
        <IconComponent className="size-[25px]" aria-hidden="true" />
      </div>
      <h3 className="font-disp text-[22px] font-bold tracking-[-.01em]">
        {service.title}
      </h3>
      <p className="mt-[11px] text-[15px] text-soft">{service.description}</p>
      <ul
        className={cn(
          "mt-[22px] gap-[11px]",
          wide
            ? "grid grid-cols-1 min-[821px]:grid-cols-2 min-[821px]:gap-x-7"
            : "flex flex-col"
        )}
      >
        {service.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-[10px] text-[14.5px] font-medium"
          >
            <span className={isAmazon ? "text-green" : "text-clay"}>
              <CheckIcon />
            </span>
            <span className="text-ink">{feature}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
