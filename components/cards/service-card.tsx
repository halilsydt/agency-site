import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Service } from "@/lib/types";

/**
 * Props for the ServiceCard component.
 */
export interface ServiceCardProps {
  /** The service to display */
  service: Service;
}

/**
 * Icon mapping for service icons.
 * Maps icon names to emoji representations.
 */
const iconMap: Record<string, string> = {
  "user-plus": "👤",
  "file-text": "📄",
  "trending-up": "📈",
  store: "🏪",
  "shield-check": "🛡️",
};

/**
 * Displays a service offering in a card format.
 * Used on platform service pages (Amazon and Etsy) to showcase individual services.
 *
 * @param props - Component props
 * @param props.service - The service data to display
 *
 * @example
 * ```tsx
 * <ServiceCard service={amazonServices[0]} />
 * ```
 */
export function ServiceCard({ service }: ServiceCardProps): React.ReactElement {
  const iconEmoji = iconMap[service.icon] || "📦";

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        {/* Service Icon */}
        <div
          data-testid="service-icon"
          className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
        >
          <span className="text-2xl">{iconEmoji}</span>
        </div>
        <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-base leading-relaxed">
          {service.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
