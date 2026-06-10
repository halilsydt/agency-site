import {
  UserPlus,
  FileText,
  TrendingUp,
  Store,
  ShieldCheck,
  Package,
  type LucideIcon,
} from "lucide-react";
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
 * Maps icon names to Lucide React components.
 */
const iconMap: Record<string, LucideIcon> = {
  "user-plus": UserPlus,
  "file-text": FileText,
  "trending-up": TrendingUp,
  store: Store,
  "shield-check": ShieldCheck,
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
  const IconComponent = iconMap[service.icon] || Package;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        {/* Service Icon */}
        <div
          data-testid="service-icon"
          className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
        >
          <IconComponent className="w-6 h-6 text-primary" aria-hidden="true" />
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
